import React from 'react';
import LiquidChrome from './utils/LiquidChrome';

function Hero() {
  return (
    <div className="relative pt-[60px] h-[835px] md:h-[835px] flex flex-col items-center justify-start text-center max-w-[1905px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20 rounded-bl-[70px] rounded-br-[70px] overflow-hidden">
      <div className="absolute top-0 start-0 w-full h-full -z-10 bg-hero-bg overflow-hidden">
        <div className="absolute top-0 start-0 w-full h-full bg-[url('/src/assets/noise_texture_strong.png')] bg-repeat opacity-80 pointer-events-none z-10"></div>
        <LiquidChrome
          baseColor={[0, 0.1, 0.2]}
          speed={0.3}
          amplitude={0.25}
          interactive={false}
        />
      </div>
      <div className="w-full sm:w-[600px] lg:w-[700px] min-h-[280px] mt-[60px] flex flex-col items-center justify-center px-4">
        <h1 className="text-hero-text text-4xl sm:text-5xl lg:text-[68px] font-bold leading-tight lg:leading-[68.8px] tracking-[-2px] lg:tracking-[-4.1px] mb-4 sm:mb-6 lg:mb-6">
          The most reliable way to select the optimal site
        </h1>
        <p className="text-base sm:text-lg lg:text-[17px] leading-relaxed lg:leading-[22.9px] text-hero-subtext max-w-[90%] sm:max-w-[600px]">
          AI-driven analysis of location, solar potential, costs, and risks — empowering you to make faster, smarter, and more profitable site decisions.
        </p>
        <button className="mt-4 w-[140px] h-[38px] py-2 px-3 bg-white text-[#6d7f9f] border-none rounded-full text-base font-semibold cursor-pointer transition-transform duration-200 hover:-translate-y-[1px]">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Hero;
