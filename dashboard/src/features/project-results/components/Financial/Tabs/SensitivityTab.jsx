import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

const SensitivityTab = ({ data }) => {
  // Safety check: ensure chart data exists
  const { sensitivity, breakeven } = data?.charts || {};

  // Keep the exact logic for data generation
  const chartData = useMemo(() => {
    if (!breakeven || breakeven.length < 2) return [];

    const start = breakeven[0];
    const end = breakeven[1];
    const steps = 20; 
    const data = [];

    for (let i = 0; i <= steps; i++) {
      const percent = i * (100 / steps);
      const revenue = start.revenue + (percent / 100) * (end.revenue - start.revenue);
      const cost = start.cost + (percent / 100) * (end.cost - start.cost);
      
      data.push({
        x: percent,
        revenue: Math.round(revenue),
        cost: Math.round(cost)
      });
    }
    return data;
  }, [breakeven]);

  if (!data?.charts) return null;

  // --- Chart 1 Configuration: Break-even (Line) ---
  const breakEvenOptions = {
    chart: {
      type: 'spline', 
      backgroundColor: 'transparent',
      height: 300,
      style: { fontFamily: 'Yekan Bakh, sans-serif' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      reversed: true, // RTL: Axis should flow Right (0) to Left (100)
      labels: { 
        format: '{value}%',
        style: { color: '#9CA3AF', fontSize: '12px' }
      },
      lineColor: 'transparent',
      tickLength: 0,
      title: { text: 'ظرفیت تولید' }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#F3F4F6',
      labels: { 
        formatter: function() { return this.value / 1000 + 'k'; }, // Keep 'k' or change to 'هزار' if preferred
        style: { color: '#9CA3AF', fontSize: '12px' }
      },
      opposite: true // Y-axis on Right
    },
    tooltip: {
      shared: true,
      useHTML: true,
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      headerFormat: '<b>ظرفیت: {point.x:.0f}%</b><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { color: '#374151', fontSize: '12px', fontFamily: 'Yekan Bakh' },
      rtl: true
    },
    plotOptions: {
      series: {
        marker: { enabled: false, states: { hover: { enabled: true, radius: 6 } } },
        lineWidth: 3
      }
    },
    series: [
      {
        name: 'درآمد',
        data: chartData.map(d => [d.x, d.revenue]),
        color: '#1E293B'
      },
      {
        name: 'هزینه کل',
        data: chartData.map(d => [d.x, d.cost]),
        color: '#EF4444'
      }
    ]
  };

  // --- Chart 2 Configuration: IRR Sensitivity ---
  // Translate sensitivity categories
  const translateSensName = (name) => {
      const map = {
          "Base Case": "حالت پایه",
          "Revenue -10%": "درآمد ۱۰٪-",
          "Const. Cost +10%": "هزینه ساخت ۱۰٪+",
          "OPEX +10%": "هزینه عملیاتی ۱۰٪+"
      };
      return map[name] || name;
  };

  const irrSeriesData = sensitivity.map((entry, index) => {
    let color;
    if (index === 0) color = '#1E293B';
    else if (entry.irr < 33.4) color = '#EF4444';
    else color = '#EAB308';

    return {
      y: entry.irr,
      color: color
    };
  });

  const irrOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 300,
      style: { fontFamily: 'Yekan Bakh, sans-serif' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: sensitivity.map(d => translateSensName(d.name)),
      lineColor: 'transparent',
      tickLength: 0,
      labels: { 
        style: { color: '#9CA3AF', fontSize: '11px' },
        autoRotation: false 
      },
      reversed: true // Columns order Right to Left
    },
    yAxis: {
      title: { text: null },
      max: 40,
      gridLineColor: '#F3F4F6',
      labels: { 
        format: '{value}%',
        style: { color: '#9CA3AF', fontSize: '12px' }
      },
      opposite: true // Y-axis on Right
    },
    tooltip: {
      useHTML: true,
      style: { direction: 'rtl', textAlign: 'right', fontFamily: 'Yekan Bakh' },
      pointFormat: '{series.name}: <b>{point.y:.1f}%</b>'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { color: '#374151', fontSize: '12px', fontFamily: 'Yekan Bakh' },
      rtl: true
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        pointWidth: 40,
        borderWidth: 0
      }
    },
    series: [{
      name: 'درصد بازده داخلی (IRR)',
      data: irrSeriesData
    }]
  };

  return (
    <div className="space-y-6 animate-fade-in text-right" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800">تحلیل نقطه سربه‌سر</h4>
            <p className="text-sm text-gray-500 mt-1">مقایسه درآمد در برابر هزینه تجمعی</p>
          </div>
          <div style={{ width: '100%' }} dir="ltr">
             <HighchartsReact highcharts={Highcharts} options={breakEvenOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800">تحلیل حساسیت IRR</h4>
            <p className="text-sm text-gray-500 mt-1">تاثیر تغییرات پارامترها بر نرخ بازده داخلی</p>
          </div>
          <div style={{ width: '100%' }} dir="ltr">
            <HighchartsReact highcharts={Highcharts} options={irrOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityTab;
