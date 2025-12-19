import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Helper for fetching static data from public folder
// We use a raw axios instance here to fetch relative paths (e.g., /data/...)
// rather than the configured api instance which points to /api/
const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

// --- 1. Financial Data Hook ---
export const useFinancialData = () => {
  return useQuery({
    queryKey: ['financials'],
    queryFn: () => fetchData('/data/financial-data.json'), 
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
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

// --- 3. Map Layers Hook (The Performance Saver) ---
// This hook ONLY fetches if the 'enabled' param is true.
// If the user never clicks "Power Lines", we never download the file.
export const useMapLayer = (layerKey, isVisible) => {
  
  // Map internal store keys to API endpoints/filenames in public/data
  const layerEndpoints = {
    powerLines: '/data/power_lines_wgs1984_Features.json',
    ghi: '/data/Contour_ghi44_FeaturesToJSON.json',
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
    // Note: 'allocatedLand' and 'selectedLocation' usually come from dynamic state
    // rather than static files, so they are excluded here or would need specific endpoints.
  };

  const endpoint = layerEndpoints[layerKey];

  return useQuery({
    queryKey: ['map-layer', layerKey],
    queryFn: () => fetchData(endpoint),
    // ONLY fetch if visible and we have a defined endpoint
    enabled: !!isVisible && !!endpoint, 
    staleTime: Infinity, // Keep in memory forever once fetched (v5)
    gcTime: Infinity,    // Never garbage collect these large files (v5)
    refetchOnWindowFocus: false,
  });
};