import React, { useState, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import UnifiedBaseMap from '../components/Layers/UnifiedBaseMap';
import useResultStore from '../../../stores/useResultStore';

function LayersPage() {
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  
  // 1. Get Project Data from Context (Validated by Layout)
  const { projectId, projectData } = useOutletContext();
  
  // Global State
  const layers = useResultStore(state => state.layers);
  const setSelectedFeature = useResultStore(state => state.setSelectedFeature);

  // --- DYNAMIC AREA GENERATOR ---
  // Convert Project Coordinates to GeoJSON for the map
  const customSelectedArea = useMemo(() => {
    if (!projectData) return null;

    let coords = null;

    // SCENARIO A: Data from Wizard (coordinates object with points array)
    if (projectData.coordinates && projectData.coordinates.points) {
        const points = projectData.coordinates.points;
        // Convert [{lat, lon}] to [[lon, lat]] for GeoJSON
        coords = [points.map(p => [p.lon, p.lat])];
    }
    // SCENARIO B: Legacy DB format (basicInfo string)
    else if (projectData.basicInfo?.coordinates) {
       // Mock fallback for demo if string parsing isn't implemented
       // In a real app, parse "34.05 N, 118.24 W"
       // We'll create a dummy box near Yazd/Kerman for visualization
       const lat = 31.0; 
       const lon = 56.0;
       const r = 0.05; 
       coords = [[
         [lon-r, lat-r],
         [lon+r, lat-r],
         [lon+r, lat+r],
         [lon-r, lat+r],
         [lon-r, lat-r]
       ]];
    }

    if (!coords) return null;

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: `proj-${projectId}-boundary`,
          properties: { name: projectData.name || "محدوده پروژه" },
          geometry: {
            type: "Polygon",
            coordinates: coords
          }
        }
      ]
    };
  }, [projectData, projectId]);


  // --- COLOR & STYLE LOGIC ---
  const getDefaultColor = useCallback((layer) => {
    const colors = {
      powerLines: '#e31a1c', roads: '#fb923c', railways: '#33a02c', airports: '#6a3d9a',
      cities: '#f59e0b', waterAreas: '#3b82f6', fault: '#be123c', protectedAreas: '#10b981', 
      landuse: '#fdbf6f', allocatedLand: '#10b981', slope: '#8B4513'
    };
    return colors[layer] || '#808080';
  }, []);

  const getStyleByLayer = useCallback((currentLayer, isSelected, properties = {}) => {
    const defaultColor = getDefaultColor(currentLayer);
    const selectedColor = '#850085ff';
    let color = isSelected ? selectedColor : defaultColor;

    if (currentLayer === 'selectedLocation') {
        return { 
          fillColor: 'transparent', 
          color: '#2563eb', // Bright Blue Outline
          weight: 4, 
          dashArray: '5, 5' 
        };
    }
    
    return { color: color, weight: isSelected ? 4 : 2, opacity: 0.8 };
  }, [getDefaultColor]);

  const onEachFeature = useCallback((feature, layer, currentLayer) => {
    layer.on('click', () => {
       if (feature.id) setSelectedFeature({ layer: currentLayer, id: feature.id });
    });
    // Add simple tooltip
    if (feature.properties && feature.properties.name) {
        layer.bindTooltip(feature.properties.name);
    }
  }, [setSelectedFeature]);

  // --- RENDER ---
  return (
    <div className="w-full h-full relative">
      <UnifiedBaseMap 
        styleFn={getStyleByLayer}
        onEachFeatureFn={onEachFeature}
        customData={customSelectedArea} // Passing Dynamic Boundary
        projectId={projectId}           // Passing ID for secure fetching
      />
      
      {/* Legend Container */}
      <div className="absolute bottom-6 right-6 z-[1000] w-[280px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 overflow-hidden max-h-[40vh] flex flex-col transition-all" dir="rtl">
          <button 
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="w-full px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
              <span className="text-sm font-semibold text-gray-700">راهنمای نقشه</span>
              <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLegendOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLegendOpen && (
              <div className="p-4 overflow-y-auto space-y-3">
                   {/* Dynamic Legend Items */}
                   <div className="flex items-center gap-3">
                       <div className="w-6 h-0 border-t-2 border-dashed border-blue-600"></div>
                       <span className="text-xs text-gray-600">محدوده پروژه</span>
                   </div>
                   
                   {layers.powerLines && (
                       <div className="flex items-center gap-3">
                           <div className="w-6 h-1 bg-red-600 rounded"></div>
                           <span className="text-xs text-gray-600">خطوط انتقال</span>
                       </div>
                   )}
                   {layers.roads && (
                       <div className="flex items-center gap-3">
                           <div className="w-6 h-1 bg-orange-400 rounded"></div>
                           <span className="text-xs text-gray-600">جاده‌ها</span>
                       </div>
                   )}
                   {layers.cities && (
                       <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                           <span className="text-xs text-gray-600">شهرها</span>
                       </div>
                   )}
                   
                   {/* Add more as needed based on active layers */}
              </div>
          )}
      </div>
    </div>
  );
}

export default LayersPage;
