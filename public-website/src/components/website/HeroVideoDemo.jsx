import React from 'react';
import HeroDemoVideo from '../../assets/DemoVideos/HeroDemoVideo.mp4';

function HeroVideoDemo() {
  return (
    <div className="relative w-full flex justify-center -mt-[180px] sm:-mt-[240px] md:-mt-[320px] lg:-mt-[375px]">
      <div className="w-[98%] md:w-[92%] lg:w-[1277px] max-w-full bg-white relative z-10 rounded-xl sm:rounded-2xl lg:rounded-[30px] shadow-hero-video p-0.5 sm:p-1">
        <div className="relative w-full border border-[rgba(121,126,138,0.18)] rounded-lg sm:rounded-xl lg:rounded-[28px] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="block w-full aspect-[1280/574] object-contain pointer-events-none select-none"
          >
            <source src={HeroDemoVideo} type="video/mp4" />
          </video>
          <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 right-0 w-[3px] bg-white" />
        </div>
      </div>
    </div>
  );
}

export default HeroVideoDemo;
