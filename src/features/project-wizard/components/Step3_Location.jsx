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
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[2000] animate-bounce-in">
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
                <div>
                <h4 className="font-bold text-sm">عملیات ناموفق</h4>
                <p className="text-xs">{message}</p>
                </div>
                <button onClick={onClose} className="ms-2 text-red-400 hover:text-red-700">
                <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const LoadingOverlay = ({ message }) => (
    <div className="absolute inset-0 z-[1500] bg-gray-600 bg-opacity-50 flex flex-col items-center justify-center text-white">
        <svg className="animate-spin h-8 w-8 text-white mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm font-semibold">{message}</p>
    </div>
);

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
  const [loadingBoundary, setLoadingBoundary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const isDrawMode = projectDetails.scale === 'draw';
  const isCountyMode = projectDetails.scale === 'county';
  const MAX_AREA_SQ_KM = 52000;
  
  // -- Effects --

  // 1. AUTO-START DRAWING
  useEffect(() => {
      if (isDrawMode && !locationData) {
          const timer = setTimeout(() => {
              mapRef.current?.startDrawing();
          }, 200);
          return () => clearTimeout(timer);
      }
  }, [isDrawMode, locationData]);

  // 2. Update counties dropdown
  useEffect(() => {
    if (projectDetails.province) {
      setCounties(countyList[projectDetails.province]?.map(c => c.county) || []);
    } else {
      setCounties([]);
    }
  }, [projectDetails.province]);

  // 3. Handle County Selection
  useEffect(() => {
    if (isCountyMode && projectDetails.county && projectDetails.province) {
        if (locationData?.name === `${projectDetails.county}, ${projectDetails.province}`) return;

        const fetchBoundary = async () => {
            setLoadingBoundary(true);
            setMapError(null);
            
            let fallbackOsmId = null;
            if (countyList[projectDetails.province]) {
                const found = countyList[projectDetails.province].find(c => c.county === projectDetails.county);
                if (found) fallbackOsmId = found.osm_id;
            }

            try {
                const searchName = encodeURIComponent(projectDetails.county);
                const searchProvince = encodeURIComponent(projectDetails.province);
                const nameUrl = `https://nominatim.openstreetmap.org/search?county=${searchName}&state=${searchProvince}&country=Iran&format=json&polygon_geojson=1&limit=1`;
                
                let response = await fetch(nameUrl);
                let data = await response.json();
                let feature = null;

                if (response.ok && data && data.length > 0 && data[0].geojson) {
                    feature = data[0].geojson;
                } else if (fallbackOsmId) {
                    const idUrl = `https://nominatim.openstreetmap.org/lookup?osm_ids=R${fallbackOsmId}&polygon_geojson=1&format=json`;
                    const idRes = await fetch(idUrl);
                    const idData = await idRes.json();
                    if (idRes.ok && idData && idData.length > 0 && idData[0].geojson) {
                        feature = idData[0].geojson;
                    }
                }

                if (feature) {
                    const formattedData = mapRef.current?.loadCountyBoundary(feature);
                    const newLoc = {
                        name: `${projectDetails.county}, ${projectDetails.province}`,
                        type: 'county',
                        data: { ...formattedData, properties: { ...formattedData.properties, osm_id: fallbackOsmId } }
                    };
                    updateLocationData(newLoc);
                } else {
                    throw new Error(`داده‌های مرزی برای "${projectDetails.county}" یافت نشد.`);
                }

            } catch (err) {
                console.error(err);
                setMapError("دریافت مرزها ناموفق بود. لطفاً از حالت رسم دستی استفاده کنید.");
            } finally {
                setLoadingBoundary(false);
            }
        };

        fetchBoundary();
    }
  }, [projectDetails.county, projectDetails.province, isCountyMode]);

  // -- Handlers --

  const handleMapCreated = (customJson) => {
    const newData = { name: 'ناحیه سفارشی', type: 'drawn_area', data: customJson };
    updateLocationData(newData);
    setMapError(null);
  };

  const handleMapError = (msg) => {
    setMapError(msg);
    setTimeout(() => setMapError(null), 5000);
  };

  const handleMethodChange = (mode) => {
    handleScaleSelection(mode);
    updateLocationData(null);
    setMapError(null);
    mapRef.current?.deleteSelection();
    
    if (mode === 'draw') {
        setTimeout(() => mapRef.current?.startDrawing(), 100);
    }
  };

  const handleReset = () => {
    mapRef.current?.deleteSelection();
    updateLocationData(null);
    setMapError(null);
  };

  const handleSearch = async () => {
    if (!searchQuery || isSearching) return;
    setIsSearching(true);
    setMapError(null);

    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=ir`;
        const response = await fetch(url);
        
        if(!response.ok) throw new Error("سرویس در دسترس نیست");
        
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            mapRef.current?.flyToLocation(parseFloat(lat), parseFloat(lon), 13);
            setSearchQuery('');
        } else {
            setMapError(`مکان "${searchQuery}" در ایران یافت نشد.`);
        }
    } catch (error) {
        setMapError("جستجو ناموفق بود. لطفا دوباره تلاش کنید.");
    } finally {
        setIsSearching(false);
    }
  };

  const areaSize = locationData?.data?.properties?.areaSqKm || 0;
  const isAreaTooLarge = isDrawMode && areaSize > MAX_AREA_SQ_KM;

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full relative h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 2. Side Panel (Right in RTL, so visually first in RTL layout) 
         We place it FIRST in DOM so flex-row (no reverse) keeps it at start (Right) in RTL.
         Wait, standard Flex row in RTL: First child is Right.
         So placing Sidebar first in DOM makes it appear on the Right side.
      */}
      <aside className="w-full lg:w-80 bg-gray-50 border-t lg:border-t-0 lg:border-e border-gray-200 flex-shrink-0 flex flex-col p-0 order-2 lg:order-1">
        
        {/* Method Selection */}
        <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
                <MapPinIcon className="h-5 w-5 text-primary-blue" />
                <h3 className="text-sm font-semibold text-gray-900">روش انتخاب</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <SidebarSelectionCard 
                    active={isDrawMode} 
                    onClick={() => handleMethodChange('draw')}
                    icon={PencilSquareIcon}
                    title="رسم ناحیه"
                />
                <SidebarSelectionCard 
                    active={isCountyMode} 
                    onClick={() => handleMethodChange('county')}
                    icon={GlobeAmericasIcon}
                    title="تقسیمات کشوری"
                />
            </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-grow">
            
            {/* Administrative Controls */}
            {isCountyMode && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
                        <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed text-justify">
                            مرزهای اداری از پایگاه داده‌های عمومی دریافت می‌شوند. برای دقت بیشتر در تعیین زمین، از حالت <strong>رسم ناحیه</strong> استفاده کنید.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 ms-1 uppercase tracking-wide">استان</label>
                            <div className="relative">
                                <select 
                                    name="province" 
                                    value={projectDetails.province} 
                                    onChange={(e) => {
                                        updateProjectDetails(e);
                                        const event = { target: { name: 'county', value: '' } };
                                        updateProjectDetails(event);
                                    }} 
                                    className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                                >
                                    <option value="">انتخاب استان...</option>
                                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 ms-1 uppercase tracking-wide">شهرستان</label>
                            <div className="relative">
                                <select 
                                    name="county" 
                                    value={projectDetails.county} 
                                    onChange={updateProjectDetails} 
                                    disabled={!projectDetails.province}
                                    className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary-blue disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    <option value="">انتخاب شهرستان...</option>
                                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Draw Mode Instructions */}
            {isDrawMode && !locationData && (
                <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 space-y-3">
                    <div className="p-3 bg-blue-50 rounded-full">
                        <PencilSquareIcon className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">رسم روی نقشه</h4>
                        <p className="text-xs mt-1">برای تعیین ناحیه روی نقشه کلیک کنید. برای پایان دو بار کلیک کنید.</p>
                    </div>
                </div>
            )}
        </div>

        {/* Selected Area Summary & Reset */}
        {locationData && (
            <div className="p-4 border-t border-gray-200 bg-white mt-auto">
                <div className="flex justify-between items-center mb-3">
                    <h5 className="text-sm font-semibold text-gray-800">ناحیه انتخاب شده</h5>
                </div>

                <div className={`bg-gray-50 p-3 rounded-lg border space-y-2 ${isAreaTooLarge ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-600">نام:</span>
                        <span className="text-xs font-semibold truncate max-w-[150px]">{locationData.name}</span>
                    </div>
                    {areaSize > 0 && (
                        <div className="flex justify-between border-t border-gray-200/50 pt-2 mt-2">
                            <span className={`text-xs font-medium ${isAreaTooLarge ? 'text-red-700' : 'text-gray-600'}`}>مساحت:</span>
                            <span className={`text-xs font-bold ${isAreaTooLarge ? 'text-red-700' : 'text-primary-blue'}`} dir="ltr">{areaSize.toLocaleString()} km²</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 mt-3">
                    {/* RESET BUTTON */}
                    <button 
                        onClick={handleReset} 
                        className="px-3 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                        title="پاک کردن رسم"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>

                    {/* CONFIRM BUTTON */}
                    <button 
                        onClick={() => saveLocation(locationData)} 
                        disabled={isAreaTooLarge}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                            isAreaTooLarge ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-blue text-white hover:bg-primary-blue/90'
                        }`}
                    >
                        {isAreaTooLarge ? 'مساحت بیش از حد مجاز' : <><CheckIcon className="h-4 w-4" /> تایید موقعیت</>}
                    </button>
                </div>
            </div>
        )}
      </aside>

      {/* 1. Map Display (Left in RTL, so visually second in RTL layout) */}
      <div className="flex-1 relative bg-gray-200 h-[500px] lg:h-auto min-h-0 order-1 lg:order-2">
        <LeafletMap 
            ref={mapRef} 
            initialData={locationData}
            onCreated={handleMapCreated}
            onError={handleMapError}
        />
        
        {loadingBoundary && <LoadingOverlay message={`در حال دریافت مرزهای ${projectDetails.county}...`} />}
        {mapError && <ErrorToast message={mapError} onClose={() => setMapError(null)} />}
        
        {/* Draw Mode Search Bar */}
        {isDrawMode && (
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50">
              <div className="ps-3"><MagnifyingGlassIcon className="h-4 w-4 text-gray-400" /></div>
              <input 
                type="text" 
                placeholder="جستجوی مکان در ایران..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                className="w-full px-2 py-2 text-xs text-gray-700 border-none bg-transparent focus:outline-none placeholder:text-gray-400 text-right" 
              />
              <button 
                onClick={handleSearch} 
                disabled={isSearching} 
                className="px-3 py-2 text-xs font-medium text-white bg-primary-blue rounded-e-lg hover:bg-primary-blue/90 transition-colors disabled:bg-gray-400"
              >
                {isSearching ? '...' : 'جستجو'}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Step3_Location;
