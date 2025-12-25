import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix for missing Leaflet marker icons
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
    try {
        const latLngs = layer.getLatLngs()[0];
        const areaSqMeters = L.GeometryUtil.geodesicArea(latLngs);
        return areaSqMeters / 1000000;
    } catch (e) {
        console.warn("Could not calculate area", e);
        return 0;
    }
  }
  return 0;
}

// Convert Leaflet Layer to Custom JSON Format
function formatLayerToJson(layer) {
  const geoJSON = layer.toGeoJSON();
  
  if (!geoJSON.geometry || !geoJSON.geometry.coordinates) return null;

  let coordinates = geoJSON.geometry.coordinates[0];
  
  // Flatten deep nested arrays if necessary (handling MultiPolygon vs Polygon edge cases)
  while (coordinates.length > 0 && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0];
  }

  // Sanity check: ensure valid numbers
  if (!coordinates || coordinates.some(c => isNaN(c[0]) || isNaN(c[1]))) {
      console.error("Invalid coordinates detected");
      return null;
  }

  // Close the polygon loop for formatting logic if needed, but keeping points unique is usually better
  if (coordinates.length > 1) {
    const firstPoint = coordinates[0];
    const lastPoint = coordinates[coordinates.length - 1];
    // Compare approximate values
    if (Math.abs(firstPoint[0] - lastPoint[0]) < 1e-9 && Math.abs(firstPoint[1] - lastPoint[1]) < 1e-9) {
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

    // Center map roughly on Iran
    const iranBounds = L.latLngBounds([[24.5, 44], [39.8, 63.4]]);
    const defaultCenter = [32.4279, 53.6880];
    
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
      maxBounds: iranBounds,
      minZoom: 5,
    });

    mapInstance.current = map;

    // Allow CSS animations to finish resizing container before invalidating
    setTimeout(() => { map.invalidateSize(); }, 250);

    // Add Tile Layers
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 399;
    map.getPane('labels').style.pointerEvents = 'none';

    L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { 
        attribution: '© Google Satellite',
        maxZoom: 20
    }).addTo(map);
    
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { 
        attribution: '© Google Hybrid', 
        pane: 'labels',
        maxZoom: 20 
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Feature Groups for storing drawn items
    drawnItems.current = new L.FeatureGroup().addTo(map);
    boundaryLayer.current = new L.FeatureGroup().addTo(map);

    // Initialize Draw Control
    drawControl.current = new L.Draw.Polygon(map, {
      allowIntersection: false,
      showArea: true,
      shapeOptions: { 
          color: '#0ea5e9', 
          clickable: true,
          fillOpacity: 0.3 
      },
      drawError: { color: '#e11d48', message: '<strong>خطا:</strong> اضلاع نباید متقاطع باشند' }
    });

    // Handle Creation Event
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      const area = getLayerAreaSqKm(layer);

      if (area > MAX_AREA_SQ_KM) {
        // Prevent adding large layers
        if (onError) onError(`مساحت انتخاب شده (${area.toFixed(0)} km²) بیش از حد مجاز است.`);
        return; // Do not add layer
      }

      // Clear previous and add new
      drawnItems.current.clearLayers();
      boundaryLayer.current.clearLayers();
      
      drawnItems.current.addLayer(layer);
      
      const customJson = formatLayerToJson(layer);
      if (onCreated && customJson) onCreated(customJson);
    });

    // Handle Delete Event (Toolbar not used but good for programmatic deletes)
    map.on(L.Draw.Event.DELETED, () => {
        if(onCreated) onCreated(null);
    });

    return () => {
      if(mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // --- Load Initial Data ---
  useEffect(() => {
    if (!mapInstance.current) return;
    
    // Case: User reset data -> clear map
    if (!initialData || !initialData.data) {
        if(drawnItems.current) drawnItems.current.clearLayers();
        if(boundaryLayer.current) boundaryLayer.current.clearLayers();
        return;
    }

    // Case: Data exists
    const points = initialData.data.coordinates?.points;
    if (points && points.length > 0) {
        const latLngs = points.map(p => [p.lat, p.lon]);
        
        // Prevent re-drawing if map state matches data to save unnecessary render cycles
        // (Simple check length)
        
        drawnItems.current.clearLayers();
        boundaryLayer.current.clearLayers();

        const isDrawn = (initialData.type === 'drawn_area');

        // If drawn mode, use DrawnItems group (editable context), otherwise BoundaryLayer (static context)
        const targetGroup = isDrawn ? drawnItems.current : boundaryLayer.current;
        const color = isDrawn ? '#0ea5e9' : '#10b981';

        const poly = L.polygon(latLngs, {
            color: color, 
            weight: 2, 
            opacity: 1, 
            fillColor: color, 
            fillOpacity: 0.2, 
            interactive: false 
        });

        targetGroup.addLayer(poly);
        
        // Fly to bounds smoothly
        if (latLngs.length > 1) {
             const bounds = poly.getBounds();
             if (bounds.isValid()) {
                mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
             }
        }
    }

  }, [initialData]);

  // --- Expose Methods via Ref ---
  useImperativeHandle(ref, () => ({
    startDrawing: () => {
        if (!drawControl.current) return;
        drawnItems.current.clearLayers();
        boundaryLayer.current.clearLayers();
        drawControl.current.enable();
    },
    deleteSelection: () => {
        drawnItems.current.clearLayers();
        boundaryLayer.current.clearLayers();
        if (drawControl.current) drawControl.current.disable();
    },
    flyToLocation: (lat, lon, zoom) => {
        if (mapInstance.current) {
            mapInstance.current.flyTo([lat, lon], zoom, { duration: 1.5 });
        }
    },
    loadCountyBoundary: (geojsonFeature) => {
        if (!mapInstance.current) return null;
        
        // Reset layers
        boundaryLayer.current.clearLayers();
        drawnItems.current.clearLayers(); 

        const countyLayer = L.geoJSON(geojsonFeature, {
            style: { color: '#10b981', weight: 2, fillOpacity: 0.2 },
            interactive: false
        });
        
        boundaryLayer.current.addLayer(countyLayer);
        mapInstance.current.fitBounds(countyLayer.getBounds(), { padding: [20, 20] });

        // Convert first polygon found to our JSON format
        // Nominatim GeoJSON is often MultiPolygon, simple parser handles it if L.geoJSON flattened it to layers
        let formattedData = null;
        countyLayer.eachLayer((layer) => {
             // Take the first valid polygon
             if (!formattedData && layer instanceof L.Polygon) {
                 formattedData = formatLayerToJson(layer);
             }
        });
        
        return formattedData;
    }
  }));

  return <div ref={mapContainerRef} className="w-full h-full z-0 outline-none" />;
});

export default LeafletMap;