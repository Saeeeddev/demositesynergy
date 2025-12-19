import React from 'react';

const SwotBox = ({ title, items, colorClass, borderClass, textClass }) => (
  <div className={`rounded-xl border ${borderClass} ${colorClass} p-5 h-full`}>
    <h5 className={`font-bold mb-3 uppercase tracking-wider text-xs ${textClass}`}>{title}</h5>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${textClass.replace('text-', 'bg-')}`}></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const StrategicTab = ({ data }) => {
  // Safety check
  if (!data || !data.swot) return null;
  const { swot, risks } = data;

  return (
    <div className="space-y-6">
      
      {/* SWOT Grid */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-medium text-gray-800 mb-6">Strategic SWOT Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwotBox title="Strengths" items={swot.strengths} colorClass="bg-emerald-50" borderClass="border-emerald-100" textClass="text-emerald-700" />
          <SwotBox title="Weaknesses" items={swot.weaknesses} colorClass="bg-red-50" borderClass="border-red-100" textClass="text-red-700" />
          <SwotBox title="Opportunities" items={swot.opportunities} colorClass="bg-blue-50" borderClass="border-blue-100" textClass="text-blue-700" />
          <SwotBox title="Threats" items={swot.threats} colorClass="bg-amber-50" borderClass="border-amber-100" textClass="text-amber-700" />
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="bg-white p-6 rounded-xl shadow-sm overflow-hidden">
        <div className="pb-4">
            <h4 className="text-lg font-medium text-gray-800">Risk Assessment Matrix</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Risk Zone</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Severity</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Probability</th>
                <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Risk Factor</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, idx) => (
                <tr key={idx} className="border-b border-gray-200 last:border-0">
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      risk.zone.includes('Critical') ? 'bg-red-100 text-red-700' : 
                      risk.zone.includes('Serious') ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {risk.zone}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{risk.severity}</td>
                  <td className="p-3 text-gray-600">{risk.probability}</td>
                  <td className="p-3 font-medium text-gray-800">{risk.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StrategicTab;