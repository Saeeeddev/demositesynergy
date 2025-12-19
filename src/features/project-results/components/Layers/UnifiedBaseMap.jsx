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

// --- Map Resizer Hook ---
// This component listens for resize events and forces Leaflet to update
const MapResizer = () => {
  const map = useMap();
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    // Observe the map container div
    resizeObserver.observe(map.getContainer());
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
};

// --- Async Layer Component ---
const AsyncLayer = ({ layerKey, styleCallback, onEachFeatureCallback, pointToLayerCallback }) => {
  const map = useMap();
  const isVisible = useResultStore(state => state.layers[layerKey]);
  const selectedFeature = useResultStore(state => state.selectedFeature);
  const { data } = useMapLayer(layerKey, isVisible);
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (isVisible && data && !geoJsonLayerRef.current) {
      geoJsonLayerRef.current = L.geoJSON(data, {
        style: (feature) => {
          const isSelected = selectedFeature?.layer === layerKey && selectedFeature?.id === feature.id; 
          return styleCallback ? styleCallback(layerKey, isSelected, feature.properties) : {};
        },
        onEachFeature: (feature, layer) => {
          if (onEachFeatureCallback) onEachFeatureCallback(feature, layer, layerKey);
        },
        pointToLayer: pointToLayerCallback
      });
      geoJsonLayerRef.current.addTo(map);
    } else if (!isVisible && geoJsonLayerRef.current) {
      geoJsonLayerRef.current.remove();
      geoJsonLayerRef.current = null;
    }
    return () => {
      if (geoJsonLayerRef.current) {
        geoJsonLayerRef.current.remove();
        geoJsonLayerRef.current = null;
      }
    };
  }, [isVisible, data, map, layerKey, onEachFeatureCallback, pointToLayerCallback, styleCallback, selectedFeature]);

  useEffect(() => {
    if (geoJsonLayerRef.current && styleCallback) {
      geoJsonLayerRef.current.eachLayer((layer) => {
        const feature = layer.feature;
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

  const pointToLayerFn = (feature, latlng) => {
    return L.circleMarker(latlng);
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-gray-100 z-0 overflow-hidden border-gray-200">
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
        
        {/* Helper to auto-resize map when sidebar toggles */}
        <MapResizer />

        {/* Layers */}
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
        <AsyncLayer layerKey="allocatedLand" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="selectedLocation" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />

      </MapContainer>
    </div>
  );
};

export default UnifiedBaseMap;
