import React from 'react';
import { useTranslation } from 'react-i18next';
import CardSwap, { Card } from './utils/CardSwap'; // Ensure this path is correct

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const AdjustmentsHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9-7.5h9.75" />
  </svg>
);

const StackedPreviewSection = () => {
  const { t } = useTranslation('Home');
  return (
    <section  className="flex flex-col lg:flex-row items-center justify-center w-full min-h-[500px] lg:h-[750px] py-8 sm:py-12 lg:py-16 bg-background-primary overflow-hidden">
      {/* 
          Main Container:
          Changed justify-between -> justify-center 
          Added gap-12 lg:gap-20 to control the "padding from text"
      */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 gap-12 lg:gap-20">
        
        {/* Text Section (Right Side in RTL) */}
        <div className="w-full lg:w-5/12 text-center lg:text-start px-4 lg:px-0 z-10 order-1 lg:order-1">
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
            {t('stackedPreview.title')}
          </h2>
          <p className="text-base sm:text-lg text-primary-dark leading-relaxed">
            {t('stackedPreview.subtitle')}
          </p>
        </div>

        {/* Animation Section (Left Side in RTL) */}
        {/* Added lg:justify-end to pull content towards the text if needed, but center works best with the gap above */}
        <div  dir="ltr" className="relative flex items-center justify-center w-full lg:w-7/12 h-[400px] sm:h-[500px] lg:h-full mt-8 lg:mt-0 order-2 lg:order-2">
            
            {/* 
               Scale Adjustment:
               Cards are 1481px wide.
               lg:scale-[0.45] makes them ~666px wide.
               We center this container.
            */}
            <div className="absolute transform scale-[0.25] sm:scale-[0.35] lg:scale-[0.45] origin-center ltr:lg:-translate-x-10 rtl:lg:translate-x-10"> 
                <CardSwap 
                    width={1501} 
                    height={935} 
                    cardDistance={60} 
                    verticalDistance={30} 
                    delay={4000} 
                    pauseOnHover={false} 
                    skewAmount={4}
                >
                    {/* CAPEX CARD */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-3xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-3 px-6 py-4 bg-card-background border-b border-divider-color h-[100px]">
                            <ShieldCheckIcon />
                            <h3 className="font-bold text-2xl text-text-dark">{t('stackedPreview.cards.capex')}</h3>
                        </div>
                        <img 
                             src="src/assets/DemoImage/Capex.png" 
                             alt="Capital Expenditure Analysis" 
                             className="absolute top-[100px] start-0 object-cover w-full h-[calc(100%-100px)] rounded-b-lg" 
                           />
                    </Card>

                    {/* OPEX CARD */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-3xl border-divider-color">
                         <div className="flex items-center flex-shrink-0 gap-3 px-6 py-4 bg-card-background border-b border-divider-color h-[100px]">
                            <BoltIcon />
                            <h3 className="font-bold text-2xl text-text-dark">{t('stackedPreview.cards.opex')}</h3>
                        </div>
                        <img 
                             src="src/assets/DemoImage/OpexImage.png" 
                             alt="Operational Cost Analysis" 
                             className="absolute top-[100px] start-0 object-cover w-full h-[calc(100%-100px)] rounded-b-lg" 
                           />
                    </Card>

                    {/* DASHBOARD CARD */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-3xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-3 px-6 py-4 bg-card-background border-b border-divider-color h-[100px]">
                            <AdjustmentsHorizontalIcon />
                            <h3 className="font-bold text-2xl text-text-dark">{t('stackedPreview.cards.dashboard')}</h3>
                        </div>
                        <img 
                             src="src/assets/DemoImage/Dashboard.png" 
                             alt="Management Dashboard" 
                             className="absolute top-[100px] start-0 object-cover w-full h-[calc(100%-100px)] rounded-b-lg" 
                           />
                    </Card>
                </CardSwap>
            </div>
        </div>
      </div>
    </section>
  );
};

export default StackedPreviewSection;