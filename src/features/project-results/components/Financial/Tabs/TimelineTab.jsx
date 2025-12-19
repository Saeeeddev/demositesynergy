import React from 'react';

const translateStage = (stage) => {
    const map = {
        "Permits & Finance": "مجوزها و تامین مالی",
        "Engineering & Proc.": "مهندسی و تامین تجهیزات",
        "Civil & Structure": "عمرانی و سازه",
        "Installation": "نصب و اجرا",
        "Commissioning": "راه‌اندازی و تست"
    };
    return map[stage] || stage;
};

const TimelineTab = ({ data }) => {
  // Safety check
  if (!data || !data.timeline) return null;

  const { timeline } = data;
  const totalMonths = 12;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-right" dir="rtl">
      <div className="pb-4">
            <h4 className="text-lg font-medium text-gray-800">زمان‌بندی اجرای پروژه (گانت چارت)</h4>
        </div>
      
      <div className="relative space-y-6">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10" style={{ flexDirection: 'row-reverse' }}>
          {/* row-reverse ensures lines match RTL axis flow */}
          {[...Array(totalMonths + 1)].map((_, i) => (
            <div key={i} className="h-full w-px bg-gray-900"></div>
          ))}
        </div>

        {timeline.map((item, idx) => (
          <div key={idx} className="relative flex items-center">
            {/* Label */}
            <div className="w-36 sm:w-48 text-xs sm:text-sm font-medium text-gray-700 truncate pl-4">
              {translateStage(item.stage)}
            </div>
            
            {/* Bar Track */}
            <div className="flex-1 h-8 bg-gray-50 rounded-full relative overflow-hidden">
              {/* 
                 RTL Implementation:
                 Use 'right' instead of 'left' to start bars from the beginning of the timeline (Right side).
              */}
              <div 
                className="absolute h-full top-0 bg-slate-700 rounded-md shadow-sm transition-all duration-500 hover:bg-slate-600"
                style={{
                  right: `${(item.start / totalMonths) * 100}%`,
                  width: `${(item.duration / totalMonths) * 100}%`
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">
                  {item.duration} ماه
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* X-Axis Labels */}
        {/* We use row-reverse to make 0 start on the Right */}
        <div className="flex justify-between pr-36 sm:pr-48 text-[10px] text-gray-400 pt-2 border-t border-gray-100 flex-row-reverse">
          {[...Array(totalMonths + 1)].map((_, i) => (
            <span key={i} dir="rtl">ماه {i}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineTab;