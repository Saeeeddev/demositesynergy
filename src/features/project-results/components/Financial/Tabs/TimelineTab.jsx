import React from 'react';

const TimelineTab = ({ data }) => {
  // Safety check
  if (!data || !data.timeline) return null;

  const { timeline } = data;
  const totalMonths = 12;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm ">
      <div className="pb-4">
            <h4 className="text-lg font-medium text-gray-800">Project Implementation Schedule (Gantt)</h4>
        </div>
      
      <div className="relative space-y-6">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
          {[...Array(totalMonths + 1)].map((_, i) => (
            <div key={i} className="h-full w-px bg-gray-900"></div>
          ))}
        </div>

        {timeline.map((item, idx) => (
          <div key={idx} className="relative flex items-center">
            <div className="w-32 sm:w-48 text-xs sm:text-sm font-medium text-gray-700 truncate pr-4">
              {item.stage}
            </div>
            <div className="flex-1 h-8 bg-gray-50 rounded-full relative overflow-hidden">
              <div 
                className="absolute h-full top-0 bg-slate-700 rounded-md shadow-sm transition-all duration-500 hover:bg-slate-600"
                style={{
                  left: `${(item.start / totalMonths) * 100}%`,
                  width: `${(item.duration / totalMonths) * 100}%`
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">
                  {item.duration} Mo
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* X-Axis Labels */}
        <div className="flex justify-between pl-32 sm:pl-48 text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          {[...Array(totalMonths + 1)].map((_, i) => (
            <span key={i}>M{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineTab;