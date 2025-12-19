import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReactOriginal from 'highcharts-react-official';

const HighchartsReact = HighchartsReactOriginal.default || HighchartsReactOriginal;

const SensitivityTab = ({ data }) => {
  // Safety check: ensure chart data exists
  if (!data || !data.charts) return null;

  const { sensitivity, breakeven } = data.charts;

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

  // --- Chart 1 Configuration: Break-even (Line) ---
  const breakEvenOptions = {
    chart: {
      type: 'spline', 
      backgroundColor: 'transparent',
      height: 300,
      style: { fontFamily: 'inherit' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      labels: { 
        format: '{value}%',
        style: { color: '#9CA3AF', fontSize: '12px' }
      },
      lineColor: 'transparent',
      tickLength: 0
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#F3F4F6',
      labels: { 
        formatter: function() { return this.value / 1000 + 'k'; },
        style: { color: '#9CA3AF', fontSize: '12px' }
      }
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>Capacity: {point.x:.0f}%</b><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { color: '#374151', fontSize: '12px' }
    },
    plotOptions: {
      series: {
        marker: { enabled: false, states: { hover: { enabled: true, radius: 6 } } },
        lineWidth: 3
      }
    },
    series: [
      {
        name: 'Revenue',
        data: chartData.map(d => [d.x, d.revenue]),
        color: '#1E293B'
      },
      {
        name: 'Total Cost',
        data: chartData.map(d => [d.x, d.cost]),
        color: '#EF4444'
      }
    ]
  };

  // --- Chart 2 Configuration: IRR Sensitivity ---
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
      style: { fontFamily: 'inherit' }
    },
    title: { text: null },
    credits: { enabled: false },
    xAxis: {
      categories: sensitivity.map(d => d.name),
      lineColor: 'transparent',
      tickLength: 0,
      labels: { 
        style: { color: '#9CA3AF', fontSize: '11px' },
        autoRotation: false 
      }
    },
    yAxis: {
      title: { text: null },
      max: 40,
      gridLineColor: '#F3F4F6',
      labels: { 
        format: '{value}%',
        style: { color: '#9CA3AF', fontSize: '12px' }
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f}%</b>'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { color: '#374151', fontSize: '12px' }
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        pointWidth: 40,
        borderWidth: 0
      }
    },
    series: [{
      name: 'IRR Percentage',
      data: irrSeriesData
    }]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800">Break-even Analysis</h4>
            <p className="text-sm text-gray-500 mt-1">Revenue vs. Total Cumulative Cost</p>
          </div>
          <div style={{ width: '100%' }}>
             <HighchartsReact highcharts={Highcharts} options={breakEvenOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800">IRR Sensitivity Analysis</h4>
            <p className="text-sm text-gray-500 mt-1">Impact of variations on Internal Rate of Return</p>
          </div>
          <div style={{ width: '100%' }}>
            <HighchartsReact highcharts={Highcharts} options={irrOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityTab;
