import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet-draw';

// Ensure specific icons are loaded for Leaflet in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

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
  let coordinates = geoJSON.geometry.coordinates[0];
  
  // Flatten if nested too deep (GeoJSON Polygon standard)
  if (coordinates.length > 0 && Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0]; 
  }

  // Convert to simple lat/lon object array
  const formattedPoints = coordinates.map(coord => ({ lat: coord[1], lon: coord[0] }));
  
  // Remove closing point if duplicate
  if (formattedPoints.length > 1) {
      const first = formattedPoints[0];
      const last = formattedPoints[formattedPoints.length - 1];
      if (first.lat === last.lat && first.lon === last.lon) {
          formattedPoints.pop();
      }
  }

  return {
    coordinates: { type: "polygon", points: formattedPoints },
    properties: { areaSqKm: parseFloat(getLayerAreaSqKm(layer).toFixed(2)) },
  };
}

const LeafletMap = forwardRef(({ initialData, onDrawComplete, onEditComplete, onError }, ref) => {
  const mapContainerRef = useRef(null);
  
  // Instance Refs
  const mapInstance = useRef(null);
  const drawnItems = useRef(null);     // Editable layers (Draw mode)
  const boundaryLayer = useRef(null);  // Read-only layers (Admin mode)
  const drawControl = useRef(null);
  const editControl = useRef(null);

  // --- Initialization ---
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance.current) return;

    const iranBounds = L.latLngBounds([[24.5, 44], [39.8, 63.4]]);
    
    // Create Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      maxBounds: iranBounds,
      minZoom: 5,
    }).fitBounds(iranBounds);

    mapInstance.current = map;

    // Layers (Satellite + Hybrid)
    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 19 }).addTo(map);
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 399;
    map.getPane('labels').style.pointerEvents = 'none';
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { pane: 'labels' }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Feature Groups
    drawnItems.current = new L.FeatureGroup().addTo(map);
    boundaryLayer.current = new L.FeatureGroup().addTo(map);

    // Draw Controls
    drawControl.current = new L.Draw.Polygon(map, {
      allowIntersection: false,
      showArea: false,
      shapeOptions: { color: '#0ea5e9', clickable: true }, // primary-blue
      drawError: { color: '#ef4444', message: '<strong>Error:</strong> Shapes cannot intersect!' } // rose-500
    });

    editControl.current = new L.EditToolbar.Edit(map, {
      featureGroup: drawnItems.current,
    });

    // --- Events ---
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      const area = getLayerAreaSqKm(layer);

      if (area > MAX_AREA_SQ_KM) {
        if (onError) onError(`Area too large! (${area.toFixed(0)} km²). Limit is ${MAX_AREA_SQ_KM.toLocaleString()}.`);
        return; // Don't add layer
      }

      // Enforce single shape rule
      drawnItems.current.clearLayers(); 
      drawnItems.current.addLayer(layer);
      
      if (onDrawComplete) onDrawComplete(formatLayerToJson(layer));
    });

    map.on(L.Draw.Event.EDITED, (event) => {
      const layers = event.layers;
      // We assume single layer for project
      layers.eachLayer(layer => {
         const json = formatLayerToJson(layer);
         // Check size again on edit
         if (json.properties.areaSqKm > MAX_AREA_SQ_KM) {
             if (onError) onError(`Edited area is too large.`);
         }
         if (onEditComplete) onEditComplete(json);
      });
    });

    // Invalidate size fix for layout shifts
    setTimeout(() => { map.invalidateSize(); }, 300);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []); // Only runs once

  // --- Sync Initial Data (e.g., Back button navigation) ---
  useEffect(() => {
    if (!mapInstance.current || !initialData) return;

    // Determine type based on provided structure or guess
    const points = initialData.data?.coordinates?.points;
    if (!points || points.length === 0) return;

    const latLngs = points.map(p => [p.lat, p.lon]);
    
    // Clear everything first
    drawnItems.current.clearLayers();
    boundaryLayer.current.clearLayers();

    let layer;
    
    if (initialData.type === 'county') {
        // Read-only blue fill
        layer = L.polygon(latLngs, { color: '#0ea5e9', weight: 2, fillOpacity: 0.2, interactive: false });
        boundaryLayer.current.addLayer(layer);
    } else {
        // Editable line
        layer = L.polygon(latLngs, { color: '#0ea5e9' });
        drawnItems.current.addLayer(layer);
    }

    if (layer) {
        mapInstance.current.fitBounds(layer.getBounds(), { padding: [50, 50] });
    }

  }, [initialData]);

  // --- Exposed Methods ---
  useImperativeHandle(ref, () => ({
    startDrawing: () => {
      drawnItems.current.clearLayers();
      boundaryLayer.current.clearLayers();
      drawControl.current.enable();
    },
    
    startEditing: () => {
      if (drawnItems.current.getLayers().length > 0) {
        editControl.current.enable();
      }
    },
    
    stopEditing: () => {
      editControl.current.save();
      editControl.current.disable();
    },
    
    cancelEditing: () => {
      editControl.current.revertLayers();
      editControl.current.disable();
    },
    
    clearLayers: () => {
      drawnItems.current.clearLayers();
      boundaryLayer.current.clearLayers();
    },

    loadBoundary: (geoJsonFeature) => {
        drawnItems.current.clearLayers();
        boundaryLayer.current.clearLayers();
        
        const layer = L.geoJSON(geoJsonFeature, {
            style: { color: '#0ea5e9', weight: 2, opacity: 1, fillColor: '#0ea5e9', fillOpacity: 0.2 },
            interactive: false
        });
        
        boundaryLayer.current.addLayer(layer);
        if (mapInstance.current) {
            mapInstance.current.fitBounds(layer.getBounds(), { padding: [20, 20] });
        }
        return formatLayerToJson(layer.getLayers()[0]); // Return normalized data for storage
    }
  }));

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
});

export default LeafletMap;