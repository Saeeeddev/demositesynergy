import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../../lib/axios';

// --- HELPER: Fetch Real GHI from Open-Meteo ---
const fetchGhiFromOpenMeteo = async () => {
  // 1. Define the Grid based on your specific Polygon coordinates
  // In a real app, pass coordinates as arguments to this function
  const minLat = 29.48;
  const maxLat = 31.01;
  const minLon = 57.49;
  const maxLon = 59.00;
  
  // Resolution: 0.1 degrees (approx 11km)
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
  
  const results = Array.isArray(data) ? data : [data];

  // 3. Convert to GeoJSON Polygons
  const features = results.map((item, index) => {
    const lat = points[index].lat;
    const lon = points[index].lon;

    const dailySums = item.daily.shortwave_radiation_sum || [];
    const totalMJ = dailySums.reduce((acc, val) => acc + (val || 0), 0);
    const totalKWh = Math.round(totalMJ * 0.277778);

    const r = step / 2; 
    return {
      type: "Feature",
      id: `ghi-${index}`,
      properties: {
        Contour: totalKWh,
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

// --- 1. Dynamic Financial Data Hook ---
export const useFinancialData = (projectId) => {
  return useQuery({
    queryKey: ['financials', projectId],
    queryFn: async () => {
      // In Real World: GET /api/projects/{id}/financials
      const { data } = await api.get(`/projectResults/${projectId}`);
      // Check if data actually contains financial info
      if (!data || !data.kpi) {
         throw new Error("Financial data not found for this project");
      }
      return data;
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
};

// --- 2. Dynamic Project Overview Hook ---
export const useProjectData = (projectId) => {
  return useQuery({
    queryKey: ['project-overview', projectId],
    queryFn: async () => {
       // In Real World: GET /api/projects/{id} or /api/projects/{id}/results
       // For db.json we query the specific entry
       try {
         const { data } = await api.get(`/projectResults/${projectId}`);
         if (!data) throw new Error("No data returned");
         return data;
       } catch (err) {
         // Transform 404s into explicit errors
         throw new Error("Project not found");
       }
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    retry: 1, // Don't retry endlessly on 404
  });
};

// --- 3. Map Layers Hook (Secure & Dynamic) ---
// We now pass projectId to allow fetching project-specific layers
export const useMapLayer = (layerKey, isVisible, projectId) => {
  
  return useQuery({
    queryKey: ['map-layer', projectId, layerKey],
    queryFn: async () => {
      if (layerKey === 'ghi') {
        return fetchGhiFromOpenMeteo();
      }

      // --- REAL WORLD ARCHITECTURE NOTE ---
      // Instead of reading from /public/data (which is insecure),
      // the URL should be: `/api/projects/${projectId}/layers/${layerKey}`.
      // The backend would verify the user owns the project, then stream the GeoJSON.
      
      // For this demo (since we don't have a real GeoServer), we use a fallback logic:
      // 1. Try to fetch specific project layer (Mock path)
      // 2. Fallback to public folder if that fails (for demo purposes only)

      try {
        // Uncomment this in real backend integration:
        // const { data } = await api.get(`/projects/${projectId}/layers/${layerKey}`);
        // return data;
        
        // --- PUBLIC FOLDER FALLBACK (For Demo) ---
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
        };
        
        if (!layerEndpoints[layerKey]) return null;
        
        const { data } = await axios.get(layerEndpoints[layerKey]);
        return data;

      } catch (error) {
        console.error(`Failed to load layer ${layerKey}`, error);
        return null;
      }
    },
    enabled: !!isVisible && !!projectId, 
    staleTime: Infinity, 
    gcTime: Infinity,    
    refetchOnWindowFocus: false,
  });
};
