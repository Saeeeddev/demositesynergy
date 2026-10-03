import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix for missing Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// leaflet-draw 1.0.4 assigns to an undeclared `type` in readableArea.
// Vite runs the package as a strict module, so drawing a polygon throws.
L.GeometryUtil.readableArea = (area, metric = true, precision = {}) => {
  const units = typeof metric === 'string' ? [metric] : Array.isArray(metric) ? metric : ['ha', 'm'];
  if (metric) {
    if (area >= 1e6 && units.includes('km')) return `${L.GeometryUtil.formattedNumber(area / 1e6, precision.km ?? 2)} km²`;
    if (area >= 1e4 && units.includes('ha')) return `${L.GeometryUtil.formattedNumber(area / 1e4, precision.ha ?? 2)} ha`;
    return `${L.GeometryUtil.formattedNumber(area, precision.m ?? 0)} m²`;
  }
  const yards = area / 0.836127;
  if (yards >= 3097600) return `${L.GeometryUtil.formattedNumber(yards / 3097600, precision.mi ?? 2)} mi²`;
  if (yards >= 4840) return `${L.GeometryUtil.formattedNumber(yards / 4840, precision.ac ?? 2)} acres`;
  return `${L.GeometryUtil.formattedNumber(yards, precision.yd ?? 0)} yd²`;
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// --- FIX START: Leaflet 1.8+ / 1.9+ Compatibility Patch for Leaflet.Draw ---
// This prevents the drawing from freezing (often after a few points) due to touch event conflicts.
if (L.Draw && L.Draw.Polyline) {
    const originalOnTouch = L.Draw.Polyline.prototype._onTouch;
    L.Draw.Polyline.prototype._onTouch = function(e) {
        if (e.originalEvent.pointerType !== 'mouse') {
            return originalOnTouch.call(this, e);
        }
    };
}
// --- FIX END ---

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
  
  // Flatten deep nested arrays if necessary
  while (coordinates.length > 0 && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
      coordinates = coordinates[0];
  }

  // Sanity check
  if (!coordinates || coordinates.some(c => isNaN(c[0]) || isNaN(c[1]))) {
      console.error("Invalid coordinates detected");
      return null;
  }

  // Formatting points
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
  const callbacks = useRef({ onCreated, onError });
  useEffect(() => { callbacks.current = { onCreated, onError }; }, [onCreated, onError]);
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

    // Initialize Draw Control (Polygon)
    drawControl.current = new L.Draw.Polygon(map, {
      allowIntersection: false, // Keep false to prevent invalid shapes, assume patch fixes freezing
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
        callbacks.current.onError?.(`مساحت انتخاب شده (${area.toFixed(0)} km²) بیش از حد مجاز است.`);
        // Remove layer immediately if invalid
        return; 
      }

      // Clear previous and add new
      drawnItems.current.clearLayers();
      boundaryLayer.current.clearLayers();
      
      drawnItems.current.addLayer(layer);
      
      const customJson = formatLayerToJson(layer);
      if (customJson) callbacks.current.onCreated?.(customJson);
    });

    map.on(L.Draw.Event.DELETED, () => {
        callbacks.current.onCreated?.(null);
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
        if (!mapInstance.current || !drawControl.current) {
            console.warn("Map not ready for drawing yet.");
            return;
        }
        
        drawnItems.current.clearLayers();
        boundaryLayer.current.clearLayers();
        
        drawControl.current.enable();
    },
    deleteSelection: () => {
        if (drawnItems.current) drawnItems.current.clearLayers();
        if (boundaryLayer.current) boundaryLayer.current.clearLayers();
        if (drawControl.current) drawControl.current.disable();
    },
    flyToLocation: (lat, lon, zoom) => {
        if (mapInstance.current) {
            mapInstance.current.flyTo([lat, lon], zoom, { duration: 1.5 });
        }
    },
    loadCountyBoundary: (geojsonFeature) => {
        if (!mapInstance.current) return null;
        
        boundaryLayer.current.clearLayers();
        drawnItems.current.clearLayers(); 

        const countyLayer = L.geoJSON(geojsonFeature, {
            style: { color: '#10b981', weight: 2, fillOpacity: 0.2 },
            interactive: false
        });
        
        boundaryLayer.current.addLayer(countyLayer);
        mapInstance.current.fitBounds(countyLayer.getBounds(), { padding: [20, 20] });

        let formattedData = null;
        countyLayer.eachLayer((layer) => {
             if (!formattedData && layer instanceof L.Polygon) {
                 formattedData = formatLayerToJson(layer);
             }
        });
        
        return formattedData;
    }
  }));

  return <div ref={mapContainerRef} className="w-full h-full z-0 outline-none bg-gray-100" />;
});

export default LeafletMap;
