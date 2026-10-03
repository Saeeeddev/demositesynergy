import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = ({ t }) => { // 👈 Already correctly accepts 't'
  return (
    <div className="w-full md:w-[90%] lg:w-[1200px] min-h-[400px] md:h-[560px] mx-auto px-4 sm:px-8 md:px-20 py-10 md:py-20 box-border flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full md:w-[90%] lg:w-[1040px] min-h-[300px] md:h-[400px] p-6 sm:p-10 md:p-20 rounded-[32px] box-border bg-gradient-to-br from-[#6d7f9f] via-[#42587f] to-[#6d7f9f] animate-gradient-animation flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-[42px] leading-normal md:leading-[51px] tracking-[-1px] md:tracking-[-1.4px] text-center font-bold m-0 mb-5 md:mb-[30px] max-w-[90%] md:max-w-[800px]">
            {t('ctaSection.quote')} {/* 👈 Already translated */}
          </h2>
          <Link
            to="/contact"
            className="mt-5 min-h-[42px] py-2.5 px-5 bg-white text-[#6d7f9f] border-none rounded-full text-sm md:text-base font-semibold cursor-pointer transition-transform duration-200 hover:-translate-y-[1px] inline-flex items-center justify-center no-underline whitespace-nowrap"
          >
            {t('ctaSection.button')} {/* 👈 Already translated */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
