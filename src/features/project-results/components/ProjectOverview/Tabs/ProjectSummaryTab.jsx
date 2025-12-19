import React from 'react';

// --- Reusable "Data Row" Component ---
const DataRow = ({ label, value, unit, highlight = false, subValue }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <div className="text-left" dir="ltr"> {/* Value kept LTR for numbers/units */}
      <span className={`text-sm font-bold ${highlight ? 'text-emerald-500' : 'text-gray-800'}`}>
        {value} {unit}
      </span>
      {subValue && <div className="text-xs text-gray-400 mt-0.5 text-right" dir="rtl">{subValue}</div>}
    </div>
  </div>
);

// --- Header Component ---
const CardHeader = ({ title }) => (
  <div className="mb-4 pb-3 border-b border-gray-100">
    <h3 className="text-lg font-medium text-gray-800 mb-6">{title}</h3>
  </div>
);

const ProjectSummaryTab = ({ summaryData, solarResource }) => {
  if (!summaryData || !solarResource) return null;

  const { overallSuitability, feasibilitySummary, keyMetrics } = summaryData;

  // Translation helper for condition
  const conditionLabel = overallSuitability.rating === 'Good' ? 'وضعیت مطلوب' : 'وضعیت متوسط';

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 animate-fade-in text-right" dir="rtl">
      
      {/* Top Section: Feasibility & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Overall Score */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center col-span-1">
          <h4 className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-4">امتیاز امکان‌سنجی</h4>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-50 bg-white mb-4">
             <span className="text-5xl font-bold text-emerald-600" dir="ltr">{overallSuitability.score}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            overallSuitability.rating === 'Good' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {conditionLabel}
          </span>
        </div>

        {/* Right: Text Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 lg:col-span-2">
          <CardHeader title="خلاصه تحلیل سایت" />
          <p className="text-sm text-gray-600 leading-7 mt-2 text-justify">
            {/* 
               Note: Since feasibilitySummary comes from DB in English, 
               it will display in English unless the DB is updated. 
               For a static demo, we can wrap it or leave as is.
            */}
            <span dir="ltr" className="block text-right">{feasibilitySummary}</span>
          </p>
        </div>
      </div>

      {/* Bottom Section: Data Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Financial Projections Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <CardHeader title="پیش‌بینی‌های مالی" />
          <div className="grid grid-cols-1 gap-x-8">
            <DataRow label="ارزش خالص فعلی (NPV)" value={keyMetrics.npv} unit="$" highlight={true} />
            <DataRow label="نرخ بازده داخلی (IRR)" value={keyMetrics.irr} unit="%" highlight={true} />
            <DataRow label="هزینه تراز شده (LCOE)" value={keyMetrics.lcoe} unit="$/kWh" />
            <DataRow label="بازگشت سرمایه (ROI)" value={keyMetrics.roi} unit="%" />
            <DataRow label="دوره بازگشت سرمایه" value={keyMetrics.paybackPeriod} unit="سال" />
          </div>
        </div>

        {/* Solar Resource Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <CardHeader title="منابع خورشیدی" />
          <div className="grid grid-cols-1 gap-x-8">
            <DataRow label="تابش افقی سالانه (GHI)" value={solarResource.annualGHI} highlight={true} subValue="میانگین تابش افقی جهانی" />
            <DataRow label="تابش مستقیم نرمال (DNI)" value={solarResource.dni} highlight={true} />
            <DataRow label="میانگین ساعات آفتابی" value="6.7" unit="ساعت/روز" />
            <DataRow label="منبع داده" value={solarResource.dateSource || "SolarGIS (2020-2023)"} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectSummaryTab;
