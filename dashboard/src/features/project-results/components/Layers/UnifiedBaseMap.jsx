import { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const iranBounds = [[24, 44], [40, 64]];

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export default function UnifiedBaseMap({ center }) {
  const mapCenter = center || [32.4279, 53.688];
  return <div className="absolute inset-0 overflow-hidden bg-gray-100">
    <MapContainer
      key={mapCenter.join(',')}
      center={mapCenter}
      zoom={center ? 8 : 6}
      minZoom={5}
      maxBounds={iranBounds}
      maxBoundsViscosity={1}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
      <MapResizer />
    </MapContainer>
  </div>;
}
