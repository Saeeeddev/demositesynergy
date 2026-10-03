import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/heroBAckgroundVideo.mp4';

function Hero({ t }) { // 👈 Already correctly accepts 't'
  return (
    <div className="relative pt-[60px] h-[700px] sm:h-[760px] md:h-[835px] flex flex-col items-center justify-start text-center max-w-[1905px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20 rounded-b-[36px] sm:rounded-b-[70px] overflow-hidden">
      <div className="absolute top-0 start-0 w-full h-full -z-10 bg-hero-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8edf7]/35 to-transparent pointer-events-none z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="w-full sm:w-[600px] lg:w-[700px] min-h-[280px] mt-[60px] flex flex-col items-center justify-center px-4">
        <h1 className="text-hero-text text-4xl sm:text-5xl lg:text-[58px] font-bold leading-tight lg:leading-[68.8px] tracking-[-2px] lg:tracking-[-4.1px] mb-4 sm:mb-6 lg:mb-6">
          {t('hero.title')} {/* 👈 Already translated */}
        </h1>
        <p className="text-hero-text text-sm sm:text-lg lg:text-[17px] leading-relaxed lg:leading-[22.9px] text-hero-subtext max-w-[90%] sm:max-w-[600px]">
          {t('hero.subtitle')} {/* 👈 Already translated */}
        </p>
        <Link
          to="/contact"
          className="mt-4 min-w-[160px] min-h-[42px] py-2 px-5 bg-white text-[#6d7f9f] border-none rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-transform duration-200 hover:-translate-y-[1px] inline-flex items-center justify-center no-underline whitespace-nowrap"
        >
          {t('hero.cta')} {/* 👈 Already translated */}
        </Link>
      </div>
    </div>
  );
}

export default Hero;
