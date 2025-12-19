import React from 'react';

// --- Reusable "Data Row" Component ---
const DataRow = ({ label, value, unit, highlight = false, subValue }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <div className="text-right">
      <span className={`text-sm font-bold ${highlight ? 'text-emerald-500' : 'text-gray-800'}`}>
        {value} {unit}
      </span>
      {subValue && <div className="text-xs text-gray-400 mt-0.5">{subValue}</div>}
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
  // Defensive checks to prevent crashes if data is loading
  if (!summaryData || !solarResource) return null;

  const { overallSuitability, feasibilitySummary, keyMetrics } = summaryData;

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 animate-fade-in">
      
      {/* Top Section: Feasibility & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Overall Score */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center col-span-1">
          <h4 className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-4">Feasibility Score</h4>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-50 bg-white mb-4">
             <span className="text-5xl font-bold text-emerald-600">{overallSuitability.score}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            overallSuitability.rating === 'Good' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {overallSuitability.rating} Condition
          </span>
        </div>

        {/* Right: Text Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 lg:col-span-2">
          <CardHeader title="Site Analysis Summary" />
          <p className="text-sm text-gray-600 leading-7 mt-2">
            {feasibilitySummary}
          </p>
        </div>
      </div>

      {/* Bottom Section: Data Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Financial Projections Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <CardHeader title="Financial Projections" />
          <div className="grid grid-cols-1 gap-x-8">
            <DataRow label="Net Present Value (NPV)" value={keyMetrics.npv} unit="$" highlight={true} />
            <DataRow label="Internal Rate of Return (IRR)" value={keyMetrics.irr} unit="%" highlight={true} />
            <DataRow label="Levelized Cost (LCOE)" value={keyMetrics.lcoe} unit="$/kWh" />
            <DataRow label="Return on Investment" value={keyMetrics.roi} unit="%" />
            <DataRow label="Payback Period" value={keyMetrics.paybackPeriod} unit="Years" />
          </div>
        </div>

        {/* Solar Resource Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <CardHeader title="Solar Resource Availability" />
          <div className="grid grid-cols-1 gap-x-8">
            <DataRow label="Annual GHI" value={solarResource.annualGHI} highlight={true} subValue="Global Horizontal Irradiance" />
            <DataRow label="Direct Normal Irradiance" value={solarResource.dni} highlight={true} />
            <DataRow label="Average Solar Hours" value="6.7" unit="hours/day" />
            <DataRow label="Data Source" value={solarResource.dateSource || "SolarGIS (2020-2023)"} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectSummaryTab;
