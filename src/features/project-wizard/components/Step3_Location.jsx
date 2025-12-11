import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { useWizardStore } from '../../../stores/useWizardStore';
import LeafletMap from '../../../components/map/LeafletMap';
import countyList from '../../../assets/data/countyList.json'; // Importing local JSON
import { 
  PencilSquareIcon, 
  GlobeAmericasIcon, 
  CheckIcon, 
  MapPinIcon, 
  InformationCircleIcon, 
  ChevronDownIcon,
  XMarkIcon,
  ExclamationCircleIcon
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

const ErrorToast = ({ message, onClose }) => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] flex items-center p-3 text-red-800 bg-red-50 border border-red-200 rounded-lg shadow-lg animate-fade-in-up">
        <ExclamationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
        <div className="text-xs font-semibold mr-4">{message}</div>
        <button onClick={onClose}><XMarkIcon className="w-4 h-4" /></button>
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

  // Constants
  const isDrawMode = projectDetails.scale === 'draw';
  const isCountyMode = projectDetails.scale === 'county';
  const MAX_AREA_SQ_KM = 52000;
  
  // -- Sync Counties when Province Changes --
  useEffect(() => {
    if (projectDetails.province) {
      setCounties(countyList[projectDetails.province]?.map(c => c.county) || []);
    } else {
      setCounties([]);
    }
  }, [projectDetails.province]);

  // -- Map Event Handlers --
  const handleMapDrawCreated = (customJson) => {
    const newData = { name: 'Custom Area', type: 'drawn_area', data: customJson };
    updateLocationData(newData); // Local state in store for immediate preview
    setMapError(null);
  };

  const handleMapError = (msg) => {
    setMapError(msg);
    setTimeout(() => setMapError(null), 4000);
  };

  const handleMethodChange = (mode) => {
    handleScaleSelection(mode);
    mapRef.current?.clearLayers(); // Clean slate on switch
  };

  const handleSelectCounty = async (e) => {
      const newCounty = e.target.value;
      updateProjectDetails(e); // Sync store details
      setLoadingBoundary(true);
      setMapError(null);

      // Find OSM ID if available
      const countyMeta = countyList[projectDetails.province]?.find(c => c.county === newCounty);
      
      try {
          if (!newCounty) throw new Error("Invalid selection");

          // SIMULATION: Fetching geometry from standard API
          // In real app, this hits the `axios` instance which might proxy to OpenStreetMap or local GIS DB
          // For now, we simulate a successful geometry fetch or fail.
          
          const params = {
              q: `${newCounty}, ${projectDetails.province}, Iran`,
              polygon_geojson: 1,
              format: 'json',
              limit: 1
          };
          
          // Actual network call using standard OSM endpoint for this demo since we don't have the GIS server running
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(params.q)}&polygon_geojson=1&format=json`);
          const data = await res.json();

          if (data && data.length > 0 && data[0].geojson) {
              // Valid Geometry Found
              const normalizedData = mapRef.current?.loadBoundary(data[0].geojson);
              
              const newData = { 
                  name: `${newCounty}, ${projectDetails.province}`, 
                  type: 'county', 
                  data: normalizedData 
              };
              updateLocationData(newData);
          } else {
              setMapError(`Could not find boundary for ${newCounty}. Try Drawing instead.`);
          }

      } catch (err) {
          console.error(err);
          setMapError("Failed to fetch location boundary. Please use Draw Mode.");
      } finally {
          setLoadingBoundary(false);
      }
  };

  const areaSize = locationData?.data?.properties?.areaSqKm || 0;
  const isAreaTooLarge = isDrawMode && areaSize > MAX_AREA_SQ_KM;

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full relative h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 1. Map Panel (Left/Top) */}
      <div className="flex-1 relative bg-gray-200 lg:order-1 h-[400px] lg:h-auto min-h-0">
        <LeafletMap 
            ref={mapRef} 
            initialData={locationData}
            onDrawComplete={handleMapDrawCreated}
            onEditComplete={handleMapDrawCreated} // Updates store on edit too
            onError={handleMapError}
        />
        
        {/* Loading Overlay */}
        {loadingBoundary && (
            <div className="absolute inset-0 bg-white/60 z-[999] flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mb-2"></div>
                <p className="text-xs font-semibold text-gray-700">Fetching Boundary...</p>
            </div>
        )}

        {/* Map Toast */}
        {mapError && <ErrorToast message={mapError} onClose={() => setMapError(null)} />}
        
        {/* Legend/Mode Indicator on Map */}
        <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow border border-gray-200 text-xs font-semibold text-gray-600">
            Mode: <span className="text-primary-blue">{isDrawMode ? "Custom Drawing" : "Administrative"}</span>
        </div>
      </div>

      {/* 2. Controls Panel (Right/Bottom) */}
      <aside className="w-full lg:w-80 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 flex-shrink-0 flex flex-col p-0 lg:order-2">
        
        {/* -- Method Selector -- */}
        <div className="p-5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
                <MapPinIcon className="h-4 w-4 text-primary-blue" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Selection Method</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <SidebarSelectionCard 
                    active={isDrawMode} 
                    onClick={() => handleMethodChange('draw')}
                    icon={PencilSquareIcon}
                    title="Draw Area"
                />
                <SidebarSelectionCard 
                    active={isCountyMode} 
                    onClick={() => handleMethodChange('county')}
                    icon={GlobeAmericasIcon}
                    title="Administrative"
                />
            </div>
        </div>

        {/* -- Dynamic Controls -- */}
        <div className="p-5 space-y-5 overflow-y-auto flex-grow">
            
            {/* Draw Mode Info */}
            {isDrawMode && (
                <div className="space-y-3 animate-fade-in-up">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Use the drawing tool to define a precise area for analysis. Ideal for custom land parcels or non-standard regions.
                    </p>
                    <button 
                        onClick={() => mapRef.current?.startDrawing()} 
                        className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <PencilSquareIcon className="h-4 w-4" /> Start Drawing
                    </button>
                    <button 
                        onClick={() => { mapRef.current?.clearLayers(); updateLocationData(null); }}
                        className="w-full py-2.5 text-red-600 text-xs font-medium hover:underline"
                    >
                        Clear Map
                    </button>
                </div>
            )}

            {/* Administrative Mode Inputs */}
            {isCountyMode && (
                <div className="space-y-4 animate-fade-in-up">
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2.5">
                        <InformationCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-800 leading-relaxed">
                            Boundaries are sourced from OpenStreetMap. For precise legal boundaries, we recommend the <strong>Draw Area</strong> tool.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Province</label>
                            <div className="relative">
                                <select 
                                    name="province" 
                                    value={projectDetails.province} 
                                    onChange={updateProjectDetails} 
                                    className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                                >
                                    <option value="">Select Province...</option>
                                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">County</label>
                            <div className="relative">
                                <select 
                                    name="county" 
                                    value={projectDetails.county} 
                                    onChange={handleSelectCounty} 
                                    disabled={!projectDetails.province}
                                    className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary-blue disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    <option value="">Select County...</option>
                                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* -- Summary / Confirm -- */}
        {locationData && (
            <div className="p-5 bg-white border-t border-gray-200 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                <div className={`rounded-lg p-3 mb-3 border ${isAreaTooLarge ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Selected Area</span>
                        {isAreaTooLarge && <span className="text-red-600 font-bold flex items-center"><XMarkIcon className="w-3 h-3 mr-1"/>Too Large</span>}
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-gray-800 text-sm truncate max-w-[150px]">{locationData.name}</span>
                        <span className={`font-bold font-mono text-sm ${isAreaTooLarge ? 'text-red-600' : 'text-primary-blue'}`}>
                            {areaSize.toLocaleString()} km²
                        </span>
                    </div>
                </div>

                <button 
                    onClick={() => saveLocation(locationData)} // Next Step
                    disabled={isAreaTooLarge}
                    className={`
                        w-full py-2.5 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md
                        ${isAreaTooLarge 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
                        }
                    `}
                >
                    {isAreaTooLarge ? 'Select Smaller Area' : <>Confirm Location <CheckIcon className="w-4 h-4" /></>}
                </button>
            </div>
        )}
      </aside>
    </div>
  );
};

export default Step3_Location;