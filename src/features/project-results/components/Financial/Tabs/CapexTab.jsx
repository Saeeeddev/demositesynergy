import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

// SAFETY FIX: Handle Vite/CJS interoperability
const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

// Simple Translation Map for Data Items
const translateItem = (name) => {
  const dict = {
    "Main Equipment (PV & Inverters)": "تجهیزات اصلی (پنل و اینورتر)",
    "Civil, Structure & Fencing": "سیویل، سازه و حصارکشی",
    "Engineering & Pre-operation": "مهندسی و پیش‌راه‌اندازی",
    "Grid Connection & Substation": "اتصال به شبکه و پست",
    "Contingency": "هزینه‌های پیش‌بینی نشده",
    "Equipment Rental (Construction)": "اجاره ماشین‌آلات",
    "Equipment": "تجهیزات",
    "Civil Works": "کارهای عمرانی",
    "Grid": "شبکه",
    "Other": "سایر",
    "Unforeseen": "پیش‌بینی نشده"
  };
  return dict[name] || name;
};

const CapexCard = ({ title, data, total, currency = "میلیون ریال" }) => {
  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#10B981', '#06B6D4', '#3B82F6', '#6366F1'];

  // Configure Donut Chart
  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200,
      width: 200,
      style: { fontFamily: 'Yekan Bakh, sans-serif' }
    },
    title: { text: null },
    credits: { enabled: false },
    tooltip: {
      enabled: true,
      useHTML: true,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: true,
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      formatter: function() {
        return `<b>${this.key}</b><br/>${this.y.toLocaleString()} ${currency}`;
      }
    },
    plotOptions: {
      pie: {
        innerSize: '75%', 
        borderWidth: 0,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: false },
        colors: COLORS
      }
    },
    series: [{
      name: 'هزینه',
      data: data.map((component, index) => ({
        name: translateItem(component.name),
        y: component.value,
        color: COLORS[index % COLORS.length]
      }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6 text-right" dir="rtl">
      <h4 className="text-lg font-medium text-gray-800 mb-6">{title}</h4>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
        
        <div className="w-full lg:w-2/3">
          <div className="space-y-3">
            {data.map((component, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-sm flex-shrink-0" 
                    style={{backgroundColor: COLORS[index % COLORS.length]}}
                  ></div>
                  <span className="text-sm text-gray-600 font-medium">{translateItem(component.name)}</span>
                </div>
                {/* Values LTR for numbers */}
                <div className="flex items-center gap-4" dir="ltr">
                  <span className="text-sm font-bold text-gray-800">
                    {component.value.toLocaleString()} <span className="text-xs text-gray-400 font-normal ms-1" dir="rtl">{currency}</span>
                  </span>
                  <span className="text-sm text-gray-400 w-12 text-left">{component.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">مجموع هزینه‌های سرمایه‌ای:</span>
            <span className="text-xl font-bold text-gray-900" dir="ltr">{total.toLocaleString()} <span className="text-sm" dir="rtl">{currency}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CapexTab = ({ data }) => {
  if (!data || !data.capex) return null;
  const { detailed, structure } = data.capex;

  return (
    <div className="animate-fade-in space-y-6">
       <CapexCard 
          title="ریز هزینه‌های سرمایه‌ای (CAPEX)" 
          data={detailed.components} 
          total={detailed.total} 
        />
       <CapexCard 
          title="تخصیص ساختار هزینه‌ها" 
          data={structure.components} 
          total={structure.total} 
        />
    </div>
  );
};

export default CapexTab;