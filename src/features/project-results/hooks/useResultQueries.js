import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Helper for fetching static data
const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

// --- HELPER: Fetch Real GHI from Open-Meteo ---
const fetchGhiFromOpenMeteo = async () => {
  // 1. Define the Grid based on your specific Polygon coordinates
  const minLat = 29.48;
  const maxLat = 31.01;
  const minLon = 57.49;
  const maxLon = 59.00;
  
  // Resolution: 0.1 degrees (approx 11km) for better detail
  const step = 0.1; 
  
  const points = [];
  for (let lat = minLat; lat <= maxLat; lat += step) {
    for (let lon = minLon; lon <= maxLon; lon += step) {
      points.push({ lat, lon });
    }
  }

  // 2. Prepare API Request (Bulk)
  const lats = points.map(p => p.lat).join(',');
  const lons = points.map(p => p.lon).join(',');

  // Fetch 2023 Daily Totals
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lats}&longitude=${lons}&start_date=2023-01-01&end_date=2023-12-31&daily=shortwave_radiation_sum&timezone=auto`;

  const { data } = await axios.get(url);
  
  // Ensure results are an array
  const results = Array.isArray(data) ? data : [data];

  // 3. Convert to GeoJSON Polygons
  const features = results.map((item, index) => {
    const lat = points[index].lat;
    const lon = points[index].lon;

    // Sum daily MJ/m² values
    const dailySums = item.daily.shortwave_radiation_sum || [];
    const totalMJ = dailySums.reduce((acc, val) => acc + (val || 0), 0);
    
    // Convert MJ/m² to kWh/m² (1 MJ = 0.277778 kWh)
    const totalKWh = Math.round(totalMJ * 0.277778);

    // Create Polygon (Square cell centered on point)
    const r = step / 2; 
    return {
      type: "Feature",
      id: `ghi-${index}`,
      properties: {
        Contour: totalKWh, // This key matches your getGhiColor function
        name: `Annual GHI: ${totalKWh} kWh/m²`
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [lon - r, lat - r],
          [lon + r, lat - r],
          [lon + r, lat + r],
          [lon - r, lat + r],
          [lon - r, lat - r]
        ]]
      }
    };
  });

  return {
    type: "FeatureCollection",
    features: features
  };
};

// --- 1. Financial Data Hook ---
export const useFinancialData = () => {
  return useQuery({
    queryKey: ['financials'],
    queryFn: () => fetchData('/data/financial-data.json'), 
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
};

// --- 2. Project Overview Hook ---
export const useProjectData = () => {
  return useQuery({
    queryKey: ['project-overview'],
    queryFn: () => fetchData('/data/project-overview.json'), 
    staleTime: 5 * 60 * 1000,
  });
};

// --- 3. Map Layers Hook ---
export const useMapLayer = (layerKey, isVisible) => {
  
  const layerEndpoints = {
    powerLines: '/data/power_lines_wgs1984_Features.json',
    roads: '/data/roads_wgs1984_FeaturesToJSON.json',
    railways: '/data/railways_wgs1984_FeaturesToJ.json',
    airports: '/data/airports_wgs1984_FeaturesToJ.json',
    cities: '/data/villages_wgs1984_FeaturesToJ.json',
    waterAreas: '/data/river_wgs1984_FeaturesToJSON.json',
    fault: '/data/fault_wgs1984_FeaturesToJSON.json',
    protectedAreas: '/data/protectarea_wgs1984_Features.json',
    landuse: '/data/landuse_wgs1984_Clip_Feature.json',
    technical: '/data/technical_wgs1984_FeaturesTo.json',
    dem: '/data/extract_dem_wgs_reclass_poly.json',
    allocatedLand: '/data/alo.json', 
    slope: '/data/Contour_slope1_FeaturesToJSO.json',
    // We handle 'ghi' dynamically now
    ghi: null 
  };

  return useQuery({
    queryKey: ['map-layer', layerKey],
    queryFn: () => {
      // SPECIAL CASE: Fetch GHI from Open-Meteo
      if (layerKey === 'ghi') {
        return fetchGhiFromOpenMeteo();
      }
      // Standard Static Files
      return fetchData(layerEndpoints[layerKey]);
    },
    enabled: !!isVisible && (!!layerEndpoints[layerKey] || layerKey === 'ghi'), 
    staleTime: Infinity, 
    gcTime: Infinity,    
    refetchOnWindowFocus: false,
  });
};