import React from 'react';

const DashboardTab = ({ data }) => {
  // Use the data passed from the parent
  if (!data || !data.kpi) return null; 
  
  const { kpi } = data;

  const items = [
    { label: "Project IRR", value: `${kpi.irrProject}%`, isHighlight: true },
    { label: "Shareholder IRR", value: `${kpi.irrEquity}%`, isHighlight: true },
    { label: "Payback Period (PBP)", value: kpi.pbp, unit: "Years" },
    { label: "Average DSCR", value: kpi.dscr, unit: "x" },
    { label: "Total Investment", value: kpi.totalInvestment.toLocaleString(), unit: "M Rial" },
    { label: "NPV (Project)", value: kpi.npv.toLocaleString(), unit: "M Rial" },
    { label: "Working Capital", value: kpi.workingCapital.toLocaleString(), unit: "M Rial" },
    { label: "LCOE", value: kpi.lcoe.toLocaleString(), unit: "Rial/kWh" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">Management Dashboard & KPIs</h4>
                <p className="text-xs text-gray-500 mt-0.5">Key performance indicators for project viability</p>
             </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 md:nth-last-child-2:border-0 group hover:bg-gray-50/50 transition-colors px-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {item.label}
                  </span>
                </div>
                
                <div className="text-right flex items-baseline gap-1">
                  <span className={`text-lg font-bold ${item.isHighlight ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-gray-400 font-medium">{item.unit}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;