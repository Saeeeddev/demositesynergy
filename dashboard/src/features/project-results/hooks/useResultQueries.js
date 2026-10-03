import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/localData';

// --- 1. Dynamic Financial Data Hook ---
export const useFinancialData = (projectId) => {
  return useQuery({
    queryKey: ['financials', projectId],
    queryFn: async () => {
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
       try {
         const { data } = await api.get(`/projectResults/${projectId}`);
         if (!data) throw new Error("No data returned");
         return data;
       } catch {
         // Transform 404s into explicit errors
         throw new Error("Project not found");
       }
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    retry: 1, // Don't retry endlessly on 404
  });
};

// Map layers use bundled GeoJSON files.
export const useMapLayer = (layerKey, isVisible, projectId) => {
  
  return useQuery({
    queryKey: ['map-layer', projectId, layerKey],
    queryFn: async () => {
      try {
        const layerEndpoints = {
            ghi: '/data/Contour_ghi44_FeaturesToJSON.json',
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
            dem: '/data/extract_dem_wgs_reclass_poly_jsonextract_dem_wgs_reclass_poly.json',
            allocatedLand: '/data/alo.json', 
            slope: '/data/Contour_slope1_FeaturesToJSO.json',
        };
        
        if (!layerEndpoints[layerKey]) return null;
        
        const response = await fetch(`${import.meta.env.BASE_URL}${layerEndpoints[layerKey].slice(1)}`);
        if (!response.ok) throw new Error(`Layer request failed: ${response.status}`);
        const geoJson = await response.json();
        if (geoJson?.type !== 'FeatureCollection' || !Array.isArray(geoJson.features)) {
          throw new Error(`Invalid GeoJSON layer: ${layerKey}`);
        }
        return {
          type: 'FeatureCollection',
          features: geoJson.features
            .filter((feature) => feature?.type === 'Feature' && feature.geometry?.type && feature.geometry.coordinates)
            .map((feature, index) => ({ ...feature, id: feature.id ?? index, properties: feature.properties ?? {} })),
        };

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
