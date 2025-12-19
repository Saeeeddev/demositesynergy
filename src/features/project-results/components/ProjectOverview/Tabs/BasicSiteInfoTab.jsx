import React from 'react';

// Reusable Row Component
const InfoRow = ({ label, value, valueClass = "text-gray-900" }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 md:nth-last-child-2:border-0 group hover:bg-gray-50/50 transition-colors px-2">
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

const BasicSiteInfoTab = ({ siteData, getValueClass }) => {
  // Defensive check
  if (!siteData || !siteData.basicInfo) return null;
  
  const { basicInfo } = siteData;

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-1">Basic Site Information</h4>
            <p className="text-xs text-gray-500 mt-0.5">Project identification and geographical characteristics</p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            
            <InfoRow label="Project ID" value={basicInfo.ProjectId} />
            <InfoRow label="Coordinates" value={basicInfo.coordinates} />
            <InfoRow label="Land Area" value={basicInfo.landArea} />
            <InfoRow label="Land Ownership" value={basicInfo.ownership} />
            <InfoRow label="Land Use Classification" value={basicInfo.landUse} />
            <InfoRow label="Nearest City" value={basicInfo.nearestCity} />
            
            <InfoRow 
              label="Accessibility" 
              value={basicInfo.accessibility}
              valueClass={getValueClass ? getValueClass(basicInfo.accessibility, 'status') : "text-gray-900"}
            />

          </div>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
           <p className="text-xs text-gray-400 text-center">
             Site data verified against latest GIS survey records.
           </p>
        </div>

      </div>
    </div>
  );
};

export default BasicSiteInfoTab;