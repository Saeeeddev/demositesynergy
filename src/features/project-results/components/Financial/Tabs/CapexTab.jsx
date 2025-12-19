import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

// SAFETY FIX: Handle Vite/CJS interoperability issues
// Sometimes the import resolves to an object { default: Component } instead of the Component itself
const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

const CapexCard = ({ title, data, total, currency = "M Rial" }) => {
  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#10B981', '#06B6D4', '#3B82F6', '#6366F1'];

  // Configure Donut Chart
  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200,
      width: 200,
      style: { fontFamily: 'inherit' }
    },
    title: { text: null },
    credits: { enabled: false },
    tooltip: {
      enabled: true,
      valueSuffix: ` ${currency}`,
      valueDecimals: 0
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
      name: 'Cost',
      data: data.map((component, index) => ({
        name: component.name,
        y: component.value,
        color: COLORS[index % COLORS.length]
      }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
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
                  <span className="text-sm text-gray-600 font-medium">{component.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-800">
                    {component.value.toLocaleString()} <span className="text-xs text-gray-400 font-normal">{currency}</span>
                  </span>
                  <span className="text-sm text-gray-400 w-12 text-right">{component.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Total CAPEX:</span>
            <span className="text-xl font-bold text-gray-900">{total.toLocaleString()} {currency}</span>
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
          title="Capital Expenditure Breakdown" 
          data={detailed.components} 
          total={detailed.total} 
        />
       <CapexCard 
          title="Cost Structure Allocation" 
          data={structure.components} 
          total={structure.total} 
        />
    </div>
  );
};

export default CapexTab;