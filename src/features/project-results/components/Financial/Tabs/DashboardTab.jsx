import React from 'react';

const DashboardTab = ({ data }) => {
  // Use the data passed from the parent
  if (!data || !data.kpi) return null; 
  
  const { kpi } = data;

  // Translation & Formatting
  const items = [
    { label: "نرخ بازده داخلی پروژه (Project IRR)", value: `${kpi.irrProject}%`, isHighlight: true },
    { label: "نرخ بازده حقوق صاحبان سهام (Equity IRR)", value: `${kpi.irrEquity}%`, isHighlight: true },
    { label: "دوره بازگشت سرمایه (PBP)", value: kpi.pbp.replace('Years', 'سال').replace('Months', 'ماه'), unit: "" },
    { label: "میانگین پوشش بدهی (DSCR)", value: kpi.dscr, unit: "x" },
    { label: "کل سرمایه‌گذاری", value: kpi.totalInvestment.toLocaleString(), unit: "میلیون ریال" },
    { label: "ارزش خالص فعلی (NPV)", value: kpi.npv.toLocaleString(), unit: "میلیون ریال" },
    { label: "سرمایه در گردش", value: kpi.workingCapital.toLocaleString(), unit: "میلیون ریال" },
    { label: "هزینه تراز شده انرژی (LCOE)", value: kpi.lcoe.toLocaleString(), unit: "ریال/کیلووات ساعت" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">داشبورد مدیریتی و شاخص‌های کلیدی</h4>
                <p className="text-xs text-gray-500 mt-0.5">شاخص‌های عملکردی برای ارزیابی توجیه‌پذیری پروژه</p>
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
                
                {/* 
                   Value Display: 
                   dir="ltr" ensures numbers (e.g. 33.36%) display correctly (Left to Right).
                   The container is flex-row, so LTR puts value on Left, unit on Right.
                   In RTL context, we want Value on Right, Unit on Left visually? 
                   Actually, in Persian math notation, numbers are written LTR. 
                   "100 Million" -> "۱۰۰ میلیون".
                   So we keep LTR inside this specific block to keep number ordering correct.
                */}
                <div className="text-left flex items-baseline gap-1" dir="ltr">
                  <span className={`text-lg font-bold ${item.isHighlight ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-gray-400 font-medium" dir="rtl">{item.unit}</span>
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
