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

// --- 1. DEFINE YOUR CUSTOM COORDINATES HERE ---
const customSelectedArea = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "selected-custom-area",
      properties: { name: "User Selected Area" },
      geometry: {
        type: "Polygon",
        // GeoJSON requires a triple nested array for Polygons: [ [ [Lng, Lat], ... ] ]
        coordinates: [[
          [57.492461124538814, 29.485908067784209],
  [59.00024186714296, 29.485908067784209],
  [59.00024186714296, 31.014421494245155],
  [57.492461124538814, 31.014421494245155],
  [57.492461124538814, 29.485908067784209]
        ]]
      }
    }
  ]
};


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

// --- 2. UPDATE ASYNC LAYER TO ACCEPT 'customData' ---
const AsyncLayer = ({ layerKey, styleCallback, onEachFeatureCallback, pointToLayerCallback, customData }) => {
  const map = useMap();
  const isVisible = useResultStore(state => state.layers[layerKey]);
  const selectedFeature = useResultStore(state => state.selectedFeature);
  
  // Only fetch if no customData is provided
  const { data: apiData } = useMapLayer(layerKey, isVisible && !customData);
  
  // Use customData if available, otherwise use API data
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

      // Optional: Fly to the custom area when it loads
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
        center={[30.5, 57.5]} // Centered roughly near your coordinates
        zoom={8} 
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

        {/* --- 3. PASS THE CUSTOM DATA TO THE LAYER --- */}
        <AsyncLayer 
          layerKey="selectedLocation" 
          customData={customSelectedArea} 
          styleCallback={styleFn} 
          onEachFeatureCallback={onEachFeatureFn} 
        />

        {/* Other Active Layers */}
        <AsyncLayer layerKey="roads" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="railways" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="airports" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} />
        <AsyncLayer layerKey="cities" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} pointToLayerCallback={pointToLayerFn} />
        <AsyncLayer layerKey="waterAreas" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="technical" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="allocatedLand" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        
        <AsyncLayer layerKey="powerLines" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="ghi" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="fault" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />
        <AsyncLayer layerKey="slope" styleCallback={styleFn} onEachFeatureCallback={onEachFeatureFn} />

      </MapContainer>
    </div>
  );
};

export default UnifiedBaseMap;