import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet-draw';

// --- Helper Functions (kept internal to this component) ---
const MAX_AREA_SQ_KM = 52000;

function getLayerAreaSqKm(layer) {
  if (layer instanceof L.Polygon) {
    const latLngs = layer.getLatLngs()[0];
    const areaSqMeters = L.GeometryUtil.geodesicArea(latLngs);
    return areaSqMeters / 1000000;
  }
  return 0;
}

function formatLayerToJson(layer) {
  const geoJSON = layer.toGeoJSON();
  let coordinates = geoJSON.geometry.coordinates[0].map(coord => ({ lat: coord[1], lon: coord[0] }));
  if (coordinates.length > 0) coordinates.pop(); // Remove the closing point Leaflet adds
  return {
    coordinates: { type: "polygon", points: coordinates },
    properties: { areaSqKm: parseFloat(getLayerAreaSqKm(layer).toFixed(2)) },
  };
}

// --- The Map Component ---
const LeafletMap = forwardRef(({ initialData, onDrawComplete, onEditComplete, onError }, ref) => {
  const mapContainerRef = useRef(null);

  // Refs to hold Leaflet instances
  const mapInstanceRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const boundaryLayerRef = useRef(null);
  const drawControlHandlerRef = useRef(null);
  const editControlHandlerRef = useRef(null);

  // --- 1. Initialize Map on First Render ---
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return; // Only init once

    const iranBounds = L.latLngBounds([[24.5, 44], [39.8, 63.4]]);
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      maxBounds: iranBounds,
      minZoom: 5,
    }).fitBounds(iranBounds);

    mapInstanceRef.current = map;

    // Add panes and layers
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 399;
    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}').addTo(map);
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { pane: 'labels' }).addTo(map);

    // Initialize Feature Groups
    drawnItemsRef.current = new L.FeatureGroup().addTo(map);
    boundaryLayerRef.current = new L.FeatureGroup().addTo(map);

    // Initialize Draw/Edit Controls
    drawControlHandlerRef.current = new L.Draw.Polygon(map, { shapeOptions: { color: '#0ea5e9' } });
    editControlHandlerRef.current = new L.EditToolbar.Edit(map, { featureGroup: drawnItemsRef.current });

    // --- Event Listeners ---
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      const area = getLayerAreaSqKm(layer);
      if (area > MAX_AREA_SQ_KM) {
        onError?.(`Area too large! (${area.toLocaleString()} km²). Limit is ${MAX_AREA_SQ_KM.toLocaleString()} km².`);
        return;
      }
      drawnItemsRef.current.clearLayers();
      drawnItemsRef.current.addLayer(layer);
      onDrawComplete?.(formatLayerToJson(layer));
    });

    map.on(L.Draw.Event.EDITED, (event) => {
      const layer = event.layers.getLayers()[0];
      if (layer) onEditComplete?.(formatLayerToJson(layer));
    });

    // Invalidate size after a short delay to ensure proper rendering in flex layouts
    setTimeout(() => map.invalidateSize(), 250);

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once

  // --- 2. Sync Map Layers with `initialData` Prop ---
  useEffect(() => {
    if (!mapInstanceRef.current || !drawnItemsRef.current || !boundaryLayerRef.current) return;
    
    drawnItemsRef.current.clearLayers();
    boundaryLayerRef.current.clearLayers();

    if (!initialData?.data?.coordinates?.points) return;
    
    const latLngs = initialData.data.coordinates.points.map(p => [p.lat, p.lon]);
    if (latLngs.length === 0) return;
    
    let layer;
    if (initialData.type === 'county') {
      layer = L.polygon(latLngs, { color: '#0ea5e9', weight: 2, fillOpacity: 0.2, interactive: false });
      boundaryLayerRef.current.addLayer(layer);
    } else { // drawn_area
      layer = L.polygon(latLngs, { color: '#0ea5e9' });
      drawnItemsRef.current.addLayer(layer);
    }
    
    if (layer.getBounds().isValid()) {
      mapInstanceRef.current.fitBounds(layer.getBounds());
    }

  }, [initialData]); // Rerun whenever the initialData prop changes

  // --- 3. Expose Imperative Methods to Parent using a Ref ---
  useImperativeHandle(ref, () => ({
    startDrawing: () => drawControlHandlerRef.current?.enable(),
    startEditing: () => editControlHandlerRef.current?.enable(),
    stopEditing: () => editControlHandlerRef.current?.save() && editControlHandlerRef.current.disable(),
    cancelEditing: () => editControlHandlerRef.current?.revertLayers() && editControlHandlerRef.current.disable(),
    deleteSelection: () => {
      drawnItemsRef.current?.clearLayers();
      boundaryLayerRef.current?.clearLayers();
    },
    flyTo: (lat, lon, zoom) => mapInstanceRef.current?.flyTo([lat, lon], zoom),
    loadCountyBoundary: (geojsonFeature) => {
        if (!boundaryLayerRef.current || !mapInstanceRef.current) return;
        boundaryLayerRef.current.clearLayers();
        const countyLayer = L.geoJSON(geojsonFeature, {
            style: { color: '#0ea5e9', weight: 2, opacity: 1, fillColor: '#0ea5e9', fillOpacity: 0.2 },
            interactive: false
        }).addTo(boundaryLayerRef.current);
        if (countyLayer.getBounds().isValid()) {
            mapInstanceRef.current.fitBounds(countyLayer.getBounds());
        }
    }
  }));

  return <div ref={mapContainerRef} className="w-full h-full bg-gray-200" />;
});

export default LeafletMap;