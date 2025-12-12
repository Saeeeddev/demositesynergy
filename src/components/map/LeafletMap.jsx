import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Ensure specific icons are loaded for Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
  
  if (!geoJSON.geometry || !geoJSON.geometry.coordinates) return null;

  let coordinates = geoJSON.geometry.coordinates[0];
  
  // Handle nested arrays
  while (coordinates.length > 0 && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0];
  }

  // Close the polygon loop if necessary
  if (coordinates.length > 1) {
    const firstPoint = coordinates[0];
    const lastPoint = coordinates[coordinates.length - 1];
    if (firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]) {
      coordinates = coordinates.slice(0, -1);
    }
  }

  const formattedPoints = coordinates.map(coord => ({
    lat: coord[1],
    lon: coord[0]
  }));

  const areaSqKm = getLayerAreaSqKm(layer);

  return {
    coordinates: {
      type: "polygon",
      points: formattedPoints
    },
    properties: {
      areaSqKm: parseFloat(areaSqKm.toFixed(2))
    }
  };
}

const LeafletMap = forwardRef(({ initialData, onCreated, onError }, ref) => {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const drawnItems = useRef(null);
  const boundaryLayer = useRef(null);
  const drawControl = useRef(null);

  // --- Initialize Map ---
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance.current) return;

    const iranBounds = L.latLngBounds([[24.5, 44], [39.8, 63.4]]);
    
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      maxBounds: iranBounds,
      minZoom: 5,
    }).fitBounds(iranBounds);

    mapInstance.current = map;

    setTimeout(() => { map.invalidateSize(); }, 250);

    // Layers
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 399;
    map.getPane('labels').style.pointerEvents = 'none';

    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { attribution: '© Google Satellite' }).addTo(map);
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { attribution: '© Google Hybrid', pane: 'labels' }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Feature Groups
    drawnItems.current = new L.FeatureGroup().addTo(map);
    boundaryLayer.current = new L.FeatureGroup().addTo(map);

    // Draw Controls (Polygon Only, No Edit Toolbar)
    drawControl.current = new L.Draw.Polygon(map, {
      allowIntersection: false,
      showArea: false,
      shapeOptions: { color: '#0ea5e9', clickable: true },
      drawError: { color: '#e11d48', message: '<strong>Error:</strong> Shape edges cannot cross!' }
    });

    // Events
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      const area = getLayerAreaSqKm(layer);

      if (area > MAX_AREA_SQ_KM) {
        map.removeLayer(layer);
        if (onError) onError(`Area too large! (${area.toFixed(0)} km²). Limit is ${MAX_AREA_SQ_KM.toLocaleString()}.`);
        return;
      }

      drawnItems.current.clearLayers();
      drawnItems.current.addLayer(layer);
      
      const customJson = formatLayerToJson(layer);
      if (onCreated && customJson) onCreated(customJson);
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // --- Sync Data ---
  useEffect(() => {
    if (!mapInstance.current) return;
    
    // Safety check
    if (!initialData || !initialData.data || !initialData.data.coordinates?.points) {
        if (initialData === null && drawnItems.current) {
             drawnItems.current.clearLayers();
             boundaryLayer.current.clearLayers();
        }
        return;
    }

    const points = initialData.data.coordinates.points;
    const latLngs = points.map(p => [p.lat, p.lon]);
    
    if (latLngs.length === 0) return;

    if (drawnItems.current) drawnItems.current.clearLayers();
    if (boundaryLayer.current) boundaryLayer.current.clearLayers();

    if (initialData.type === 'drawn_area') {
        const poly = L.polygon(latLngs, { color: '#0ea5e9' });
        drawnItems.current.addLayer(poly);
        // We don't force fitBounds here to keep the user's view stable
    } else if (initialData.type === 'county') {
        const poly = L.polygon(latLngs, {
            color: '#0ea5e9', weight: 2, opacity: 1, fillColor: '#0ea5e9', fillOpacity: 0.2, interactive: false
        });
        boundaryLayer.current.addLayer(poly);
        mapInstance.current.fitBounds(poly.getBounds(), { padding: [20, 20] });
    }
  }, [initialData]);

  // --- Imperative Handle ---
  useImperativeHandle(ref, () => ({
    startDrawing: () => {
        // Ensure clean state before drawing
        if (drawnItems.current) drawnItems.current.clearLayers();
        if (boundaryLayer.current) boundaryLayer.current.clearLayers();
        if (drawControl.current) drawControl.current.enable();
    },
    
    deleteSelection: () => {
        if (drawnItems.current) drawnItems.current.clearLayers();
        if (boundaryLayer.current) boundaryLayer.current.clearLayers();
        // Also disable draw control just in case it was pending
        if (drawControl.current) drawControl.current.disable(); 
    },
    
    flyToLocation: (lat, lon, zoom) => {
        if (mapInstance.current) mapInstance.current.flyTo([lat, lon], zoom);
    },
    
    loadCountyBoundary: (geojsonFeature) => {
        if (!boundaryLayer.current || !mapInstance.current) return;
        boundaryLayer.current.clearLayers();
        drawnItems.current.clearLayers(); 
        
        const countyLayer = L.geoJSON(geojsonFeature, {
            style: { color: '#0ea5e9', weight: 2, opacity: 1, fillColor: '#0ea5e9', fillOpacity: 0.2 },
            interactive: false
        });
        
        boundaryLayer.current.addLayer(countyLayer);
        if (countyLayer.getBounds().isValid()) mapInstance.current.fitBounds(countyLayer.getBounds());
        
        if (countyLayer.getLayers().length > 0) {
             return formatLayerToJson(countyLayer.getLayers()[0]);
        }
        return null;
    }
  }));

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
});

export default LeafletMap;