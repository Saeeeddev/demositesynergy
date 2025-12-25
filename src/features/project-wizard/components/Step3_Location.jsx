import React, { useRef, useState, useEffect } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import LeafletMap from '../../../components/map/LeafletMap';
import countyList from '../../../assets/data/countyList.json'; 
import { 
  PencilSquareIcon, 
  GlobeAmericasIcon, 
  CheckIcon, 
  MapPinIcon, 
  InformationCircleIcon, 
  ChevronDownIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Helper UI Component
const SidebarSelectionCard = ({ active, onClick, icon: Icon, title }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 w-full text-center
      ${active 
        ? 'bg-primary-blue/5 border-primary-blue ring-1 ring-primary-blue/20 shadow-sm' 
        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }
    `}
  >
    <Icon className={`h-5 w-5 mb-1.5 ${active ? 'text-primary-blue' : 'text-gray-500'}`} />
    <span className={`text-xs font-bold ${active ? 'text-gray-900' : 'text-gray-700'}`}>{title}</span>
  </button>
);

const ErrorToast = ({ message, onClose }) => {
    if(!message) return null;
    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[2000] animate-[fade-in-down_0.3s_ease-out]">
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
                <div className="text-right">
                    <h4 className="font-bold text-sm">خطا در عملیات</h4>
                    <p className="text-xs">{message}</p>
                </div>
                <button onClick={onClose} className="ms-2 text-red-400 hover:text-red-700">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const Step3_Location = () => {
  const mapRef = useRef(null);
  
  const { 
    projectDetails, 
    locationData, 
    handleScaleSelection, 
    updateProjectDetails, 
    saveLocation,
    updateLocationData 
  } = useWizardStore();

  const [provinces] = useState(() => Object.keys(countyList));
  const [counties, setCounties] = useState([]);
  const [mapError, setMapError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDrawMode = projectDetails.scale === 'draw';
  const isCountyMode = projectDetails.scale === 'county';
  
  // Safe limits matches LeafletMap config
  const MAX_AREA_SQ_KM = 52000;

  // -- Effects --

  // Auto-start drawing only if needed
  useEffect(() => {
      if (isDrawMode && !locationData) {
          const timer = setTimeout(() => {
              mapRef.current?.startDrawing();
          }, 300); // Slight delay ensures map is mounted
          return () => clearTimeout(timer);
      }
  }, [isDrawMode, locationData]);

  // Update counties based on province
  useEffect(() => {
    if (projectDetails.province) {
      setCounties(countyList[projectDetails.province]?.map(c => c.county) || []);
    } else {
      setCounties([]);
    }
  }, [projectDetails.province]);

  // Fetch Administrative Boundary
  useEffect(() => {
    if (isCountyMode && projectDetails.county && projectDetails.province) {
        if (locationData?.name === `${projectDetails.county}, ${projectDetails.province}`) return;

        const fetchBoundary = async () => {
            setIsLoading(true);
            setMapError(null);
            
            try {
                // Nominatim query
                const searchName = encodeURIComponent(projectDetails.county);
                const searchProvince = encodeURIComponent(projectDetails.province);
                const url = `https://nominatim.openstreetmap.org/search?county=${searchName}&state=${searchProvince}&country=Iran&format=json&polygon_geojson=1&limit=1`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error("Network error");
                
                const data = await response.json();
                
                if (data && data.length > 0 && data[0].geojson) {
                    const geoJson = data[0].geojson;
                    
                    // Call Map Method
                    const formattedData = mapRef.current?.loadCountyBoundary(geoJson);
                    
                    if (formattedData) {
                        updateLocationData({
                            name: `${projectDetails.county}, ${projectDetails.province}`,
                            type: 'county',
                            data: formattedData
                        });
                    } else {
                        // Sometimes geojson is multipolygon or point which might fail parser
                        throw new Error("ساختار هندسی نامعتبر دریافت شد.");
                    }
                } else {
                    throw new Error("مرزی برای این شهرستان یافت نشد.");
                }
            } catch (err) {
                setMapError("دریافت مرز ناموفق بود. اتصال اینترنت را بررسی کنید یا از رسم دستی استفاده نمایید.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoundary();
    }
  }, [projectDetails.county, projectDetails.province, isCountyMode]);


  // -- Handlers --

  const handleMapCreated = (customJson) => {
    // This fires when User finishes a polygon
    if (!customJson) return; 
    
    updateLocationData({
        name: 'ناحیه رسم شده',
        type: 'drawn_area',
        data: customJson
    });
    setMapError(null);
  };

  const handleMapError = (msg) => {
    setMapError(msg);
    setTimeout(() => setMapError(null), 5000);
  };

  const handleMethodChange = (mode) => {
    handleScaleSelection(mode);
    updateLocationData(null); // Clear previous selection
    mapRef.current?.deleteSelection();
  };

  const handleReset = () => {
    mapRef.current?.deleteSelection();
    updateLocationData(null);
    setMapError(null);
    if(isDrawMode) {
        setTimeout(() => mapRef.current?.startDrawing(), 100);
    }
  };

  const handleGeocodeSearch = async () => {
    if (!searchQuery || isLoading) return;
    setIsLoading(true);
    setMapError(null);

    try {
        // Simple search logic
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=ir`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            mapRef.current?.flyToLocation(parseFloat(lat), parseFloat(lon), 12);
        } else {
            setMapError("مکان مورد نظر یافت نشد.");
        }
    } catch {
        setMapError("خطا در جستجو.");
    } finally {
        setIsLoading(false);
    }
  };

  const areaSize = locationData?.data?.properties?.areaSqKm || 0;
  const isTooLarge = isDrawMode && areaSize > MAX_AREA_SQ_KM;

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full relative h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* SIDEBAR CONFIGURATION (Right) */}
      <aside className="w-full lg:w-80 bg-gray-50 border-b lg:border-b-0 lg:border-e border-gray-200 flex-shrink-0 flex flex-col order-1 lg:order-1 z-10">
        
        <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                 <MapPinIcon className="h-5 w-5 text-primary-blue" />
                 انتخاب محدوده
            </h3>
            <div className="grid grid-cols-2 gap-3">
                <SidebarSelectionCard 
                    active={isDrawMode} 
                    onClick={() => handleMethodChange('draw')}
                    icon={PencilSquareIcon}
                    title="رسم دستی"
                />
                <SidebarSelectionCard 
                    active={isCountyMode} 
                    onClick={() => handleMethodChange('county')}
                    icon={GlobeAmericasIcon}
                    title="انتخاب از لیست"
                />
            </div>
        </div>

        <div className="p-4 flex-grow overflow-y-auto space-y-4">
            
            {/* County Selectors */}
            {isCountyMode && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex gap-3 text-xs text-blue-800 leading-relaxed text-justify">
                         <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
                         <span>انتخاب از تقسیمات کشوری برای تحلیل‌های کلان مناسب است.</span>
                    </div>

                    <div className="space-y-3">
                        <div>
                             <label className="text-xs font-bold text-gray-500 mb-1 block">استان</label>
                             <div className="relative">
                                 <select 
                                     value={projectDetails.province}
                                     onChange={(e) => {
                                         updateProjectDetails(e); // name="province" assumed implicit in native select or handled by store logic
                                         updateProjectDetails({ target: { name: 'county', value: '' }}); // Reset county
                                     }}
                                     name="province"
                                     className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                                 >
                                    <option value="">انتخاب کنید...</option>
                                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                 </select>
                                 <ChevronDownIcon className="absolute left-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                             </div>
                        </div>

                        <div>
                             <label className="text-xs font-bold text-gray-500 mb-1 block">شهرستان</label>
                             <div className="relative">
                                 <select 
                                     value={projectDetails.county}
                                     onChange={updateProjectDetails}
                                     name="county"
                                     disabled={!projectDetails.province}
                                     className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                 >
                                    <option value="">انتخاب کنید...</option>
                                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                                 <ChevronDownIcon className="absolute left-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Draw Mode Help */}
            {isDrawMode && !locationData && (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 mt-8 opacity-70">
                     <PencilSquareIcon className="w-12 h-12 mb-2" />
                     <p className="text-sm">روی نقشه ناحیه را ترسیم کنید.</p>
                 </div>
            )}
        </div>
        
        {/* Bottom Actions */}
        {locationData && (
            <div className="bg-white border-t border-gray-200 p-4 mt-auto">
                 <div className={`p-3 rounded-lg border mb-3 flex justify-between items-center ${isTooLarge ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                     <div>
                         <p className="text-xs font-bold text-gray-500 mb-0.5">ناحیه انتخاب شده</p>
                         <p className="text-sm font-semibold text-gray-800 truncate w-32">{locationData.name}</p>
                     </div>
                     <div className="text-left">
                         <span className={`text-sm font-mono font-bold ${isTooLarge ? 'text-red-600' : 'text-primary-blue'}`}>
                             {areaSize.toLocaleString()}
                         </span>
                         <span className="text-xs text-gray-400 block">km²</span>
                     </div>
                 </div>

                 <div className="flex gap-2">
                     <button onClick={handleReset} className="p-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
                         <TrashIcon className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => saveLocation(locationData)}
                        disabled={isTooLarge}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-sm font-bold text-white transition-all shadow-sm ${
                            isTooLarge 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200'
                        }`}
                     >
                         <CheckIcon className="w-5 h-5" />
                         تایید نهایی
                     </button>
                 </div>
            </div>
        )}

      </aside>

      {/* MAP AREA (Left) */}
      <div className="flex-1 relative order-2 lg:order-2 bg-gray-100 min-h-[400px]">
         <LeafletMap 
             ref={mapRef}
             initialData={locationData}
             onCreated={handleMapCreated}
             onError={handleMapError}
         />
         
         {/* Overlays */}
         {mapError && <ErrorToast message={mapError} onClose={() => setMapError(null)} />}
         
         {isLoading && (
             <div className="absolute inset-0 z-[1100] bg-white/50 backdrop-blur-sm flex items-center justify-center">
                 <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
                     <span className="text-xs font-bold text-gray-600">در حال پردازش...</span>
                 </div>
             </div>
         )}

         {/* Draw Search Bar */}
         {isDrawMode && (
             <div className="absolute bottom-5 left-5 right-5 lg:left-10 lg:right-auto lg:w-80 z-[1000]">
                 <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg flex p-1 border border-gray-200/50">
                     <input 
                        className="flex-1 bg-transparent border-none text-xs px-3 py-1.5 outline-none placeholder:text-gray-400 text-right" 
                        placeholder="جستجوی مکان..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGeocodeSearch()}
                     />
                     <button 
                        onClick={handleGeocodeSearch}
                        className="bg-primary-blue text-white rounded-md p-1.5 hover:bg-primary-blue/90"
                     >
                        <MagnifyingGlassIcon className="w-4 h-4" />
                     </button>
                 </div>
             </div>
         )}
      </div>

    </div>
  );
};

export default Step3_Location;
