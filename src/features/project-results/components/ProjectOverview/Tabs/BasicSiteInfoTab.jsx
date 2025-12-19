import React from 'react';

// Reusable Row Component
const InfoRow = ({ label, value, valueClass = "text-gray-900" }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 md:nth-last-child-2:border-0 group hover:bg-gray-50/50 transition-colors px-2">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </div>
    
    <div className="text-left flex items-baseline gap-1" dir="ltr"> {/* Values LTR */}
      <span className={`text-lg font-bold ${valueClass}`}>
        {value}
      </span>
    </div>
  </div>
);

const BasicSiteInfoTab = ({ siteData, getValueClass }) => {
  if (!siteData || !siteData.basicInfo) return null;
  
  const { basicInfo } = siteData;

  // Translation Map for Values that might be in English in DB
  const translateValue = (val) => {
      if(val === 'Private') return 'خصوصی';
      if(val === 'Public') return 'دولتی';
      if(val === 'Agricultural') return 'کشاورزی';
      if(val === 'Good') return 'خوب';
      return val;
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 p-6 overflow-y-auto animate-fade-in text-right" dir="rtl">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-1">اطلاعات پایه سایت</h4>
            <p className="text-xs text-gray-500 mt-0.5">شناسنامه پروژه و ویژگی‌های جغرافیایی</p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            
            <InfoRow label="شناسه پروژه" value={basicInfo.ProjectId} />
            <InfoRow label="مختصات" value={basicInfo.coordinates} />
            <InfoRow label="مساحت زمین" value={basicInfo.landArea} />
            <InfoRow label="مالکیت زمین" value={translateValue(basicInfo.ownership)} />
            <InfoRow label="کاربری اراضی" value={translateValue(basicInfo.landUse)} />
            <InfoRow label="نزدیک‌ترین شهر" value={basicInfo.nearestCity} />
            
            <InfoRow 
              label="دسترسی" 
              value={translateValue(basicInfo.accessibility)}
              valueClass={getValueClass ? getValueClass(basicInfo.accessibility, 'status') : "text-gray-900"}
            />

          </div>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
           <p className="text-xs text-gray-400 text-center">
             داده‌های سایت با آخرین رکوردهای نقشه‌برداری GIS تایید شده است.
           </p>
        </div>

      </div>
    </div>
  );
};

export default BasicSiteInfoTab;