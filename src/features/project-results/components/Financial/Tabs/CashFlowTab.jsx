import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

const CashFlowTab = ({ data }) => {
  if (!data || !data.charts) return null;

  const { cashFlow, revenueVsOpex } = data.charts;

  // --- Chart 1 Configuration: Cumulative Cash Flow ---
  const cashFlowOptions = {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 350, 
      style: { fontFamily: 'Yekan Bakh, sans-serif' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: cashFlow.map(d => d.year),
      lineColor: 'transparent',
      tickLength: 0,
      labels: { style: { color: '#9CA3AF', fontSize: '12px' } },
      title: { text: 'سال', align: 'high' } // Axis title in Farsi
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#F3F4F6',
      labels: { style: { color: '#9CA3AF', fontSize: '12px' } },
      opposite: true // In RTL, Y-axis often looks better on Right, or standard Left. Keeping opposite=true puts it on right which fits RTL reading order (Start).
    },
    tooltip: {
      shared: true,
      useHTML: true,
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      valueFormatter: (value) => value.toLocaleString()
    },
    legend: { enabled: false },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(59, 130, 246, 0.1)'], 
            [1, 'rgba(59, 130, 246, 0)']
          ]
        },
        marker: { radius: 2 },
        lineWidth: 2,
        states: { hover: { lineWidth: 2 } },
        threshold: null
      }
    },
    series: [{
      name: 'جریان نقدینگی',
      data: cashFlow.map(d => d.value),
      color: '#3B82F6'
    }]
  };

  // --- Chart 2 Configuration: Revenue vs OPEX ---
  const revenueVsOpexOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 350, 
      style: { fontFamily: 'Yekan Bakh, sans-serif' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: revenueVsOpex.map(d => d.year),
      lineColor: 'transparent',
      tickLength: 0,
      labels: { style: { color: '#9CA3AF', fontSize: '12px' } },
      title: { text: 'سال', align: 'high' }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#F3F4F6',
      labels: { style: { color: '#9CA3AF', fontSize: '12px' } },
      opposite: true // Move axis to Right side
    },
    tooltip: {
      shared: true,
      useHTML: true,
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      valueFormatter: (value) => value.toLocaleString()
    },
    legend: {
      align: 'right', // Align legend to right (Start in RTL)
      rtl: true, // Highcharts RTL support for legend items
      verticalAlign: 'bottom',
      itemStyle: { color: '#374151', fontSize: '12px', fontFamily: 'Yekan Bakh' }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 5,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'درآمد',
        data: revenueVsOpex.map(d => d.revenue),
        color: '#1E293B'
      },
      {
        name: 'هزینه عملیاتی',
        data: revenueVsOpex.map(d => d.opex),
        color: '#F59E0B'
      }
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in text-right" dir="rtl">
      
      {/* Top Section: Charts in clean cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-medium text-gray-800 mb-6">جریان نقدینگی تجمعی</h4>
          <div style={{ width: '100%' }} dir="ltr"> {/* Keep chart container LTR so axes don't break, text is handled via options */}
            <HighchartsReact highcharts={Highcharts} options={cashFlowOptions} />
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-medium text-gray-800 mb-6">درآمد در مقابل هزینه عملیاتی</h4>
          <div style={{ width: '100%' }} dir="ltr">
             <HighchartsReact highcharts={Highcharts} options={revenueVsOpexOptions} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="text-lg text-gray-800 font-medium">جدول جریان نقدینگی پروژه</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-gray-50 p-3 text-center font-semibold text-gray-700 border-b-2 border-gray-200">سال</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">درآمد</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">هزینه عملیاتی</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">EBITDA</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">جریان نقد آزاد</th>
                <th className="bg-gray-50 p-3 text-center font-semibold text-gray-700 border-b-2 border-gray-200">پوشش بدهی</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {revenueVsOpex.map((row, index) => {
                 const isPositive = row.fcf > 0;
                 return (
                  <tr key={index} className={isPositive ? 'bg-emerald-50' : 'bg-red-50'}>
                    <td className="p-3 border-b border-gray-200 text-gray-700 text-center">{row.year}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-700 text-left" dir="ltr">{row.revenue.toLocaleString()}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-700 text-left" dir="ltr">{row.opex.toLocaleString()}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-700 text-left" dir="ltr">{row.ebitda.toLocaleString()}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-700 font-medium text-left" dir="ltr">{row.fcf.toLocaleString()}</td>
                    <td className={`p-3 border-b border-gray-200 font-bold text-center ${isPositive ? 'text-emerald-600' : 'text-red-500'}`} dir="ltr">
                      {row.dscr.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CashFlowTab;
