import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

const translateCategory = (cat) => {
    if (cat.includes('Labor')) return 'نیروی انسانی';
    if (cat.includes('Maintenance')) return 'تعمیر و نگهداری';
    if (cat.includes('General')) return 'عمومی و اداری';
    if (cat.includes('Spare Parts')) return 'قطعات یدکی';
    return cat;
};

const translateNote = (note) => {
    if (note.includes('Engineers')) return 'مهندسین و تکنسین‌ها';
    if (note.includes('Main equipment')) return 'تجهیزات اصلی دارای گارانتی';
    if (note.includes('Insurance')) return 'بیمه و مدیریت';
    if (note.includes('Est. 10%')) return 'تخمین ۱۰٪ نگهداری';
    return note;
};

const OpexTab = ({ data }) => {
  if (!data || !data.opex) return null;

  const { total, items } = data.opex;
  const COLORS = ['#F97316', '#3B82F6', '#A855F7', '#64748B'];

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
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      formatter: function() {
        return `<b>${this.key}</b><br/>${this.y.toLocaleString()} میلیون ریال`;
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
      name: 'هزینه‌ها',
      data: items.map((item, index) => ({
        name: translateCategory(item.category),
        y: item.value,
        color: COLORS[index % COLORS.length]
      }))
    }]
  };

  return (
    <div className="space-y-8 animate-fade-in text-right" dir="rtl">
      {/* OPEX Summary Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-medium text-gray-800 mb-6">ساختار هزینه‌های عملیاتی (سال اول)</h4>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="w-[200px] h-[200px] flex items-center justify-center">
               <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-sm flex-shrink-0" 
                      style={{backgroundColor: COLORS[index % COLORS.length]}}
                    ></div>
                    <span className="text-sm text-gray-600 font-medium">{translateCategory(item.category)}</span>
                  </div>
                  <div className="flex items-center gap-4" dir="ltr">
                    <span className="text-sm font-bold text-gray-800">
                      {item.value.toLocaleString()} <span className="text-xs text-gray-400 font-normal ms-1" dir="rtl">میلیون ریال</span>
                    </span>
                    <span className="text-sm text-gray-400 w-12 text-left">{((item.value / total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
             
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">مجموع هزینه‌های عملیاتی (OPEX):</span>
              <span className="text-xl font-bold text-gray-900" dir="ltr">{total.toLocaleString()} <span className="text-sm" dir="rtl">میلیون ریال</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white p-5 rounded-xl shadow-sm overflow-hidden">
        <div className="pb-4 border-b border-gray-100">
          <h4 className="text-lg font-medium text-gray-800">ریز اقلام هزینه‌ها</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">دسته‌بندی</th>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">توضیحات</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">مقدار (م.ر)</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">سهم</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 border-b border-gray-200 text-gray-800 font-medium flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                     {translateCategory(item.category)}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-gray-500">{translateNote(item.note)}</td>
                  <td className="p-3 border-b border-gray-200 text-gray-800 font-bold text-left" dir="ltr">{item.value.toLocaleString()}</td>
                  <td className="p-3 border-b border-gray-200 text-gray-500 text-left" dir="ltr">{((item.value / total) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OpexTab;
