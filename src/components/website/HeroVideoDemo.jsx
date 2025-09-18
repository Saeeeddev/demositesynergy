import React from 'react';

function HeroVideoDemo() {
  return (
    <div className="relative w-full flex justify-center -mt-[220px] xs:-mt-[240px] sm:-mt-[280px] md:-mt-[320px] lg:-mt-[375px]">
      <div className="w-[98%] md:w-[92%] lg:w-[1035px] aspect-[16/9] bg-[#f7f7f7] relative z-10 rounded-xl sm:rounded-2xl lg:rounded-[30px] shadow-hero-video p-0.5 sm:p-1">
        <div className="flex items-center gap-1.5 sm:gap-2 absolute top-[8px] sm:top-[12px] left-[8px] sm:left-[12px] h-3 sm:h-4 z-20">
          
        </div>
        <div className="w-full h-full border border-[rgba(121,126,138,0.18)] rounded-lg sm:rounded-xl lg:rounded-[28px] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/src/assets/demos/hero-light-lg.webm" type="video/webm"/>
          </video>
        </div>
      </div>
    </div>
  );
}

export default HeroVideoDemo;
