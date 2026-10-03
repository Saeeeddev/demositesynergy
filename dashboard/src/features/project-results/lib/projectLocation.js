const insideIran = (lat, lon) => lat >= 24 && lat <= 40 && lon >= 44 && lon <= 64;

export function getProjectLocation(projectData, projectId) {
  const points = projectData?.coordinates?.points;
  if (Array.isArray(points) && points.length >= 3) {
    const ring = points.map((point) => [Number(point.lon), Number(point.lat)]);
    if (ring.every(([lon, lat]) => Number.isFinite(lon) && Number.isFinite(lat) && insideIran(lat, lon))) {
      if (ring[0][0] !== ring.at(-1)[0] || ring[0][1] !== ring.at(-1)[1]) ring.push(ring[0]);
      return { type: 'FeatureCollection', features: [{
        type: 'Feature', id: `${projectId}-boundary`,
        properties: { name: 'محدوده پروژه' },
        geometry: { type: 'Polygon', coordinates: [ring] },
      }] };
    }
  }

  const text = projectData?.basicInfo?.coordinates;
  const match = typeof text === 'string' && text.match(/([\d.]+)\s*°?\s*([NS])\s*,\s*([\d.]+)\s*°?\s*([EW])/i);
  if (match) {
    const lat = Number(match[1]) * (match[2].toUpperCase() === 'S' ? -1 : 1);
    const lon = Number(match[3]) * (match[4].toUpperCase() === 'W' ? -1 : 1);
    if (insideIran(lat, lon)) return { type: 'FeatureCollection', features: [{
      type: 'Feature', id: `${projectId}-point`,
      properties: { name: 'موقعیت پروژه' },
      geometry: { type: 'Point', coordinates: [lon, lat] },
    }] };
  }
  return null;
}
