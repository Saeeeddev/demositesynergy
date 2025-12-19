import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useResultStore from '../../../../stores/useResultStore';
import { useMapLayer } from '../../hooks/useResultQueries';

// --- Iran Bounds ---
const iranBounds = [
  [24.00, 44.00], 
  [40.00, 64.00] 
];

// --- Async Layer Component (The Performance Fix) ---
// This component manages its own data fetching and Leaflet lifecycle
const AsyncLayer = ({ layerKey, styleCallback, onEachFeatureCallback, pointToLayerCallback }) => {
  const map = useMap();
  const isVisible = useResultStore(state => state.layers[layerKey]);
  const selectedFeature = useResultStore(state => state.selectedFeature);

  // Fetch data only if visible (Batch 2 Hook)
  const { data } = useMapLayer(layerKey, isVisible);
  
  // Ref to hold the Leaflet layer instance
  const geoJsonLayerRef = useRef(null);

  // 1. Mount/Unmount Layer based on visibility and data availability
  useEffect(() => {
    if (isVisible && data && !geoJsonLayerRef.current) {
      // Initialize Leaflet GeoJSON layer
      geoJsonLayerRef.current = L.geoJSON(data, {
        // Pass style function
        style: (feature) => {
          // Check if selected logic is handled here or via effect below
          // We pass isSelected to the callback if needed immediately
          const isSelected = selectedFeature?.layer === layerKey && selectedFeature?.id === feature.id; 
          return styleCallback ? styleCallback(layerKey, isSelected, feature.properties) : {};
        },
        // Pass interaction logic
        onEachFeature: (feature, layer) => {
          if (onEachFeatureCallback) onEachFeatureCallback(feature, layer, layerKey);
        },
        // Pass point rendering logic (circles for cities/airports)
        pointToLayer: pointToLayerCallback
      });

      geoJsonLayerRef.current.addTo(map);
    } else if (!isVisible && geoJsonLayerRef.current) {
      // Cleanup
      geoJsonLayerRef.current.remove();
      geoJsonLayerRef.current = null;
    }

    // Cleanup on unmount
    return () => {
      if (geoJsonLayerRef.current) {
        geoJsonLayerRef.current.remove();
        geoJsonLayerRef.current = null;
      }
    };
  }, [isVisible, data, map, layerKey, onEachFeatureCallback, pointToLayerCallback, styleCallback, selectedFeature]);

  // 2. React to Selection Changes (Re-style without removing layer)
  useEffect(() => {
    if (geoJsonLayerRef.current && styleCallback) {
      geoJsonLayerRef.current.eachLayer((layer) => {
        const feature = layer.feature;
        // Check if this specific feature is selected
        const isSelected = selectedFeature?.layer === layerKey && selectedFeature?.id === feature.id;
        
        const newStyle = styleCallback(layerKey, isSelected, feature.properties);
        if (layer.setStyle) layer.setStyle(newStyle);
      });
    }
  }, [selectedFeature, styleCallback, layerKey]);

  return null; 
};

// --- Main Map Component ---
const UnifiedBaseMap = ({ styleFn, onEachFeatureFn }) => {
  const mapRef = useRef();

  // Point to Layer Helper (for Cities/Airports)
  const pointToLayerFn = (feature, latlng) => {
    return L.circleMarker(latlng);
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-gray-100 z-0 overflow-hidden rounded-xl border border-gray-200">
      <MapContainer 
        ref={mapRef} 
        center={[32.4279, 53.6880]} 
        zoom={6} 
        minZoom={5} 
        maxBounds={iranBounds} 
        maxBoundsViscosity={1.0} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer 
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
          attribution='&copy; <a href="http://www.esri.com/">Esri</a>' 
        />
        
        {/* Render Async Layers - They handle their own fetching */}
        <AsyncLayer layerKey="powerLines" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="ghi" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="roads" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="railways" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="airports" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} />
        <AsyncLayer layerKey="cities" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} />
        <AsyncLayer layerKey="waterAreas" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="fault" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="protectedAreas" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="landuse" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="technical" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="dem" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        
        {/* Simple Layers (Can stay or be async too) */}
        <AsyncLayer layerKey="allocatedLand" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="selectedLocation" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />

      </MapContainer>
    </div>
  );
};

export default UnifiedBaseMap;