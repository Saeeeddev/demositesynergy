import React from 'react';

// --- STATIC DATA (Placeholder) ---
const STATIC_GRID_DATA = {
  distance: '12 km',
  substation: 'Yazd Central Substation',
  capacity: '50 MW',
  impact: 'Low',
  voltage: '230 kV',
  potential: 'High',
  availability: 'Available',
};

// --- Local Color Helper ---
const getStatusColor = (value) => {
  const v = value?.toLowerCase();
  if (v === 'good' || v === 'high' || v === 'low' || v === 'available') return 'text-emerald-600';
  if (v === 'fair' || v === 'medium') return 'text-yellow-600';
  return 'text-red-600';
};

// Reusable Row Component
const InfoRow = ({ label, value, valueClass = "text-gray-900" }) => (
  <div className="relative flex items-center justify-between py-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 transition-colors px-2 z-10">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </div>
    <div className="text-right flex items-baseline gap-1">
      <span className={`text-lg font-bold ${valueClass}`}>
        {value}
      </span>
    </div>
  </div>
);

const GridInfrastructureTab = ({ gridData }) => {
  // Use props if available, otherwise fallback to static data
  const data = gridData || STATIC_GRID_DATA;

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden relative">
        
        {/* --- BACKGROUND WATERMARK --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
          <div className="transform -rotate-12 opacity-[0.04] whitespace-nowrap select-none">
            <span className="text-9xl font-black text-gray-900 uppercase tracking-widest">
              Coming Soon • Beta • Preview
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-transparent to-purple-50/20"></div>
        </div>

        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-100 bg-gray-50/30 z-10">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-medium text-gray-800">Grid & Infrastructure Access</h4>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                  Static Preview
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Connection feasibility and grid technical specifications</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            <InfoRow label="Transmission Line Distance" value={data.distance} />
            <InfoRow label="Nearest Substation" value={data.substation} />
            
            <InfoRow 
              label="Grid Capacity" 
              value={data.capacity} 
              valueClass="text-indigo-600"
            />
            
            <InfoRow 
              label="Substation Voltage" 
              value={data.voltage} 
            />
            
            <InfoRow 
              label="Grid Impact" 
              value={data.impact} 
              valueClass={getStatusColor(data.impact)}
            />
            
            <InfoRow 
              label="Capacity Potential" 
              value={data.potential} 
              valueClass={getStatusColor(data.potential)}
            />
            
            <InfoRow 
              label="Interconnection Availability" 
              value={data.availability} 
              valueClass={getStatusColor(data.availability)}
            />
          </div>
        </div>

        <div className="relative px-9 py-4 bg-gray-50 border-t border-gray-100 z-10">
           <p className="text-s text-gray-400 text-center flex items-center justify-center gap-1">
             <span>⚠️</span>
             This module is currently in development. Data shown is a placeholder.
           </p>
        </div>

      </div>
    </div>
  );
};

export default GridInfrastructureTab;