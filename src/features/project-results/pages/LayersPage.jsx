import React, { useState, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import UnifiedBaseMap from '../components/Layers/UnifiedBaseMap';
import useResultStore from '../../../stores/useResultStore';

function LayersPage() {
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  
  // Get Global State
  const layers = useResultStore(state => state.layers);
  const setSelectedFeature = useResultStore(state => state.setSelectedFeature);

  // --- COLOR HELPERS (Kept logic, just helper functions) ---
  const getDefaultColor = useCallback((layer) => {
    const colors = {
      powerLines: '#e31a1c', roads: '#1f78b4', railways: '#33a02c', airports: '#6a3d9a',
      cities: '#ff7f00', waterAreas: '#b2df8a', fault: '#a6cee3', protectedAreas: '#fb9a99', landuse: '#fdbf6f'
    };
    return colors[layer] || '#808080';
  }, []);

  const getGhiColor = useCallback((value) => {
    if (!value) return '#808080';
    const val = parseInt(value, 10);
    if (val < 1100) return '#2c7bb6';
    if (val < 1400) return '#00a6ca';
    if (val < 1700) return '#00ccbc';
    if (val < 2000) return '#90eb9d';
    if (val < 2300) return '#ffff8c';
    if (val < 2600) return '#f29e2e';
    if (val <= 3000) return '#d7191c';
    return '#d7191c'; 
  }, []);

  const getGridCodeColor = useCallback((gridcode, layer) => {
    const techColors = { 3: '#DC143C', 4: '#FF8C00', 5: '#FFD700', 6: '#9932CC', 7: '#228B22', 8: '#0000FF', 9: '#00FFFF' };
    const demColors = { 1: '#FF0000', 2: '#FF4500', 3: '#FF8C00', 4: '#FFD700', 5: '#FFFF00', 6: '#ADFF2F', 7: '#32CD32', 8: '#00FFFF', 9: '#0000FF' };
    if (layer === 'technical') return techColors[gridcode] || '#808080';
    if (layer === 'dem') return demColors[gridcode] || '#808080';
    return '#808080';
  }, []);

  const getLanduseColor = useCallback((type) => {
    const colors = { agri: '#228B22', bagh: '#DAA520', bareland: '#8B4513' };
    return colors[type] || '#808080';
  }, []);

  // --- STYLE FUNCTION (Passed to Map) ---
  const getStyleByLayer = useCallback((currentLayer, isSelected, properties = {}) => {
    const defaultColor = getDefaultColor(currentLayer);
    const selectedColor = '#850085ff';
    let color = isSelected ? selectedColor : defaultColor;

    if (currentLayer === 'landuse') {
      const type = properties.lable_talf || 'unknown';
      const landuseColor = getLanduseColor(type);
      color = isSelected ? selectedColor : landuseColor;
      return { fillColor: color, color: 'black', weight: isSelected ? 4 : 2, fillOpacity: isSelected ? 0.9 : 0.5 };
    }
    if (['powerLines', 'roads', 'waterAreas', 'fault'].includes(currentLayer)) {
      let weight = isSelected ? 6 : 3;
      let dashArray = null;
      if (currentLayer === 'roads') weight = isSelected ? 5 : 2;
      if (currentLayer === 'waterAreas') { dashArray = isSelected ? null : '10, 5'; weight = isSelected ? 4 : 2; }
      if (currentLayer === 'fault') { dashArray = isSelected ? null : '5, 10'; weight = isSelected ? 5 : 3; }
      return { color, weight, opacity: 0.8, dashArray };
    }
    if (currentLayer === 'railways') {
      return { color, weight: isSelected ? 5 : 3, opacity: 0.8, dashArray: isSelected ? null : '3, 6' };
    }
    if (['airports', 'cities'].includes(currentLayer)) {
      let radius = isSelected ? 10 : 6;
      if (currentLayer === 'airports') radius = isSelected ? 12 : 8;
      return { fillColor: color, color: 'black', radius, fillOpacity: 0.7, weight: isSelected ? 3 : 1 };
    }
    if (currentLayer === 'protectedAreas') {
      return { fillColor: color, color: 'darkgreen', weight: isSelected ? 4 : 2, fillOpacity: isSelected ? 0.9 : 0.4 };
    }
    if (['technical', 'dem'].includes(currentLayer)) {
      const gridcode = properties.gridcode;
      const gridColor = getGridCodeColor(gridcode, currentLayer);
      color = isSelected ? selectedColor : gridColor;
      let fillOpacity = isSelected ? 0.9 : 0.3;
      if (currentLayer === 'dem') fillOpacity = isSelected ? 0.9 : 0.5;
      return { fillColor: color, color: color, weight: isSelected ? 4 : 2, fillOpacity };
    }
    if (currentLayer === 'ghi') {
      const contour = properties.Contour;
      const ghiColor = getGhiColor(contour);
      color = isSelected ? selectedColor : ghiColor;
      return { color: color, weight: isSelected ? 5 : 3, opacity: 1 };
    }
    return { color, weight: 3 };
  }, [getDefaultColor, getLanduseColor, getGridCodeColor, getGhiColor]);

  // --- INTERACTION FUNCTION (Passed to Map) ---
  const onEachFeature = useCallback((feature, layer, currentLayer) => {
    // 1. Assign ID if missing for selection logic
    if (!feature.id) {
       feature.id = Math.random().toString(36).substr(2, 9);
    }

    // 2. Bind Popups (Translated)
    const props = feature.properties || {};
    
    // Map internal keys to Farsi labels
    const layerNames = {
        powerLines: 'خطوط برق',
        roads: 'جاده‌ها',
        railways: 'راه‌آهن',
        cities: 'شهر/آبادی',
        airports: 'فرودگاه',
        waterAreas: 'منابع آبی',
        fault: 'گسل',
        protectedAreas: 'منطقه حفاظت‌شده',
        landuse: 'کاربری اراضی',
        technical: 'فنی',
        dem: 'ارتفاع',
        ghi: 'تابش'
    };

    let popupContent = `<div style="text-align: right; font-family: 'Yekan Bakh', sans-serif;">
        <b>لایه:</b> ${layerNames[currentLayer] || currentLayer}`;
    
    if (currentLayer === 'technical' || currentLayer === 'dem') {
      popupContent += `<br><b>کد شبکه:</b> ${props.gridcode || 'نامشخص'}`;
    } else if (currentLayer === 'ghi') {
      popupContent += `<br><b>مقدار تابش:</b> ${props.Contour || 'نامشخص'}`;
    } else if (props.name || props.Name) {
      popupContent += `<br><b>نام:</b> ${props.name || props.Name}`;
    }
    popupContent += `</div>`;
    
    layer.bindPopup(popupContent);

    // 3. Click Handler -> Updates Store
    layer.on('click', () => {
      setSelectedFeature({ layer: currentLayer, id: feature.id });
    });
  }, [setSelectedFeature]);

  // --- LEGEND RENDERING ---
  const renderLegend = () => (
    <div className="mt-2.5" dir="rtl">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {layers.powerLines && ( <div className="flex items-center gap-2"> <div className="w-5 h-1 bg-[#e31a1c]"></div> <span className="text-xs">خطوط برق</span> </div> )}
          {layers.roads && ( <div className="flex items-center gap-2"> <div className="w-5 h-1 bg-[#1f78b4]"></div> <span className="text-xs">جاده‌ها</span> </div> )}
          {layers.railways && ( <div className="flex items-center gap-2"> <div className="w-5 h-1 border-t-2 border-dashed border-[#33a02c]"></div> <span className="text-xs">راه‌آهن</span> </div> )}
          {layers.cities && ( <div className="flex items-center gap-2"> <div className="w-3 h-3 rounded-full bg-[#ff7f00] border border-black"></div> <span className="text-xs">شهرها</span> </div> )}
          {layers.airports && ( <div className="flex items-center gap-2"> <div className="w-3 h-3 rounded-full bg-[#6a3d9a] border border-black"></div> <span className="text-xs">فرودگاه‌ها</span> </div> )}
          {layers.waterAreas && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-[#b2df8a] opacity-80"></div> <span className="text-xs">منابع آبی</span> </div> )}
          {layers.fault && ( <div className="flex items-center gap-2"> <div className="w-5 h-1 bg-[#a6cee3] border-dashed border-t"></div> <span className="text-xs">گسل‌ها</span> </div> )}
          {layers.protectedAreas && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-[#fb9a99] opacity-80 border border-green-800"></div> <span className="text-xs">حفاظت‌شده</span> </div> )}
          {layers.ghi && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-gradient-to-r from-blue-400 via-green-400 to-red-500"></div> <span className="text-xs">تابش (GHI)</span> </div> )}
          {layers.landuse && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-[#fdbf6f]"></div> <span className="text-xs">کاربری اراضی</span> </div> )}
          {layers.dem && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-gradient-to-r from-red-500 to-yellow-300"></div> <span className="text-xs">ارتفاع (DEM)</span> </div> )}
          {layers.technical && ( <div className="flex items-center gap-2"> <div className="w-5 h-2 bg-purple-400"></div> <span className="text-xs">فنی</span> </div> )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full relative">
      <UnifiedBaseMap 
        styleFn={getStyleByLayer}
        onEachFeatureFn={onEachFeature}
      />
      
      {/* Legend Container */}
      {/* Positioned at bottom-right physically, which is visually logical for the map controls area */}
      <div className="absolute bottom-6 right-6 z-[1000] w-[300px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 overflow-hidden max-h-[40vh] flex flex-col">
          <button 
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="w-full px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
              <span className="text-sm font-semibold text-gray-700">راهنمای نقشه</span>
              <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLegendOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLegendOpen && (
              <div className="p-4 overflow-y-auto">
                  {renderLegend()}
              </div>
          )}
      </div>
    </div>
  );
}

export default LayersPage;
