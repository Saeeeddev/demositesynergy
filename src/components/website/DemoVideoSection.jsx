import React from 'react';

function DemoVideoSection() {
  return (
    <div className="w-full lg:w-[1350px] min-h-[800px] lg:h-[1162px] mx-auto bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-12 md:py-16 lg:py-20 box-border font-sans">
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-[47px] leading-normal lg:leading-[51px] tracking-[-1.2px] lg:tracking-[-1.7px] text-center font-bold mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
          Results That Drive Confident Decisions
        </h1>
        
        {/*
          FIX: Removed min-h-[400px] and reduced responsive vertical padding (py-*)
          to eliminate the large gap on mobile and tablet.
        */}
        <div className="w-[98%] lg:w-[1035px] lg:h-[705px] px-4 sm:px-8 md:px-12 lg:px-[75px] py-6 lg:py-[45px] mb-8 lg:mb-[15px] box-border">
          <div className="w-full h-full shadow-demo-video p-1 border border-[#e5e7eb] bg-[#fafafa] rounded-2xl lg:rounded-[32px] box-border">
            <div className="w-full h-full rounded-2xl lg:rounded-[32px] border border-[#e5e7eb] overflow-hidden">
              <video 
                className="w-full h-full object-cover rounded-2xl lg:rounded-[32px]"
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/src/assets/demos/hero-light-lg.webm" type="video/webm"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[1040px] flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-[70px] px-4 sm:px-6">
          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              Comprehensive site analysis
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
              Layer multiple data sources to quickly identify the most suitable solar sites.
            </p>
          </div>

          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 4.89543 4 6 4H14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              Instant recommendations
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
              Receive ranked site options with detailed scoring in hours, not months.
            </p>
          </div>

          <div className="w-full md:w-[320px] flex flex-col items-start">
            <div className="w-6 h-6 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-black text-lg sm:text-xl lg:text-[21px] tracking-[-0.28px] leading-tight lg:leading-[21px] font-semibold m-0 mb-2">
              Risk-optimized decisions
            </h3>
            <p className="text-[#6b7280] text-base lg:text-[17px] leading-relaxed lg:leading-[22.8px] m-0">
             Make confident investments backed by transparent risk assessment and mitigation strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoVideoSection;