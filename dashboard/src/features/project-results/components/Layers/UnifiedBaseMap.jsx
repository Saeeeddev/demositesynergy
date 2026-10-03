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
const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(map.getContainer());
    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);
  return null;
};

// --- Async Layer Component ---
// Now accepts projectId to fetch specific/secure layers
const AsyncLayer = ({ layerKey, styleCallback, onEachFeatureCallback, pointToLayerCallback, customData, projectId }) => {
  const map = useMap();
  const isVisible = useResultStore(state => state.layers[layerKey]);
  const selectedFeature = useResultStore(state => state.selectedFeature);
  
  // Pass projectId to the hook so it can fetch specific data if needed
  // Only fetch from API if no customData is provided
  const { data: apiData } = useMapLayer(layerKey, isVisible && !customData, projectId);
  
  // Use customData if available (e.g. for the project boundary), otherwise use API data
  const data = customData || apiData;
  
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

      // Fly to the custom area when it loads (e.g. Project Boundary)
      if (customData) {
        const bounds = geoJsonLayerRef.current.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }

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
  }, [isVisible, data, map, layerKey, onEachFeatureCallback, pointToLayerCallback, styleCallback, selectedFeature, customData]);

  // Handle Style Updates (Selection)
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
const UnifiedBaseMap = ({ styleFn, onEachFeatureFn, customData, projectId }) => {
  const mapRef = useRef();

  const pointToLayerFn = (feature, latlng) => {
    return L.circleMarker(latlng);
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-gray-100 z-0 overflow-hidden border-gray-200">
      <MapContainer 
        ref={mapRef} 
        center={[32.4279, 53.6880]} // Default Center
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
        
        <MapResizer />

        {/* 1. Project Boundary Layer (Custom Data) */}
        <AsyncLayer 
          layerKey="selectedLocation" 
          customData={customData} 
          styleCallback={styleFn} 
          onEachFeatureCallback={onEachFeatureFn} 
          projectId={projectId}
        />

        {/* 2. Dynamic Layers (Pass projectId for secure/custom fetching) */}
        <AsyncLayer layerKey="roads" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="railways" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="airports" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} projectId={projectId} />
        <AsyncLayer layerKey="cities" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} projectId={projectId} />
        <AsyncLayer layerKey="waterAreas" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="technical" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="allocatedLand" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="powerLines" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="ghi" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="fault" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />
        <AsyncLayer layerKey="slope" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} projectId={projectId} />

      </MapContainer>
    </div>
  );
};

export default UnifiedBaseMap;
