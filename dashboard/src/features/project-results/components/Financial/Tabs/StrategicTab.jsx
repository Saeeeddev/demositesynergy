import React from 'react';

// Helper to translate DB data on the fly
const translateData = (text) => {
    const map = {
        // SWOT
        "Attractive IRR (33.4%)": "نرخ بازده جذاب (۳۳.۴٪)",
        "Modern PV Technology": "تکنولوژی مدرن پنل‌های خورشیدی",
        "Good Payback Period": "دوره بازگشت سرمایه مناسب",
        "High Initial Liquidity Requirement": "نیاز به نقدینگی اولیه بالا",
        "Electricity Export (Art. 12)": "صادرات برق (ماده ۱۲)",
        "Green Stock Market": "عرضه در بورس سبز",
        "Currency Fluctuations": "نوسانات ارزی",
        "Regulatory Changes": "تغییرات قوانین رگولاتوری",
        
        // Risks
        "Currency Fluctuation": "نوسانات ارزی",
        "Financing Delay": "تاخیر در تامین مالی",
        "Panel Efficiency Drop": "افت راندمان پنل‌ها",
        "Critical (Red)": "بحرانی (قرمز)",
        "Serious (Orange)": "جدی (نارنجی)",
        "Acceptable (Green)": "قابل قبول (سبز)",
        "High": "زیاد",
        "Medium": "متوسط",
        "Low": "کم"
    };
    return map[text] || text;
};

const SwotBox = ({ title, items, colorClass, borderClass, textClass }) => (
  <div className={`rounded-xl border ${borderClass} ${colorClass} p-5 h-full text-right`}>
    <h5 className={`font-bold mb-3 uppercase tracking-wider text-xs ${textClass}`}>{title}</h5>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
          {/* RTL: margin-top adjusted for visual alignment with Persian text */}
          <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${textClass.replace('text-', 'bg-')}`}></span>
          <span>{translateData(item)}</span>
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
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* SWOT Grid */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-medium text-gray-800 mb-6">تحلیل استراتژیک (SWOT)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwotBox title="نقاط قوت (Strengths)" items={swot.strengths} colorClass="bg-emerald-50" borderClass="border-emerald-100" textClass="text-emerald-700" />
          <SwotBox title="نقاط ضعف (Weaknesses)" items={swot.weaknesses} colorClass="bg-red-50" borderClass="border-red-100" textClass="text-red-700" />
          <SwotBox title="فرصت‌ها (Opportunities)" items={swot.opportunities} colorClass="bg-blue-50" borderClass="border-blue-100" textClass="text-blue-700" />
          <SwotBox title="تهدیدها (Threats)" items={swot.threats} colorClass="bg-amber-50" borderClass="border-amber-100" textClass="text-amber-700" />
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="bg-white p-6 rounded-xl shadow-sm overflow-hidden">
        <div className="pb-4">
            <h4 className="text-lg font-medium text-gray-800">ماتریس ارزیابی ریسک</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">ناحیه ریسک</th>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">شدت</th>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">احتمال وقوع</th>
                <th className="bg-gray-50 p-3 text-right font-semibold text-gray-700 border-b-2 border-gray-200">عامل ریسک</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, idx) => (
                <tr key={idx} className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50">
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      risk.zone.includes('Critical') ? 'bg-red-100 text-red-700' : 
                      risk.zone.includes('Serious') ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {translateData(risk.zone)}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{translateData(risk.severity)}</td>
                  <td className="p-3 text-gray-600">{translateData(risk.probability)}</td>
                  <td className="p-3 font-medium text-gray-800">{translateData(risk.name)}</td>
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
