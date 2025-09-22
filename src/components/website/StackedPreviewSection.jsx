import CardSwap, { Card } from './utils/CardSwap';

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
const StackedPreviewSection = ({ t }) => { // 👈 Already correctly accepts 't'
  return (
    <section dir="ltr" className="flex flex-col lg:flex-row items-center justify-center w-full min-h-[500px] lg:h-[650px] py-8 sm:py-12 lg:py-16 bg-background-primary">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-4 sm:px-6 lg:px-8 gap-8 lg:gap-0">
        <div className="w-full lg:w-1/3 text-center lg:text-start px-4 lg:px-0">
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-text-dark">
            {t('stackedPreview.title')} {/* 👈 Already translated */}
          </h2>
          <p className="text-base sm:text-lg text-primary-dark max-w-md lg:max-w-none mx-auto lg:mx-0">
            {t('stackedPreview.subtitle')} {/* 👈 Already translated */}
          </p>
        </div>
        <div className="relative flex items-center justify-center w-full lg:w-2/3 h-[400px] sm:h-[450px] lg:h-full mt-8 lg:mt-0">
            <div className="absolute transform scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.70] origin-center"> 
                <CardSwap width={1000} height={600} cardDistance={60} verticalDistance={25} delay={4000} pauseOnHover={false} skewAmount={6}>
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-2xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-card-background border-b border-divider-color">
                            <ShieldCheckIcon />
                            <h3 className="font-semibold text-sm sm:text-base text-text-dark">{t('stackedPreview.cards.reliable')}</h3> {/* 👈 Already translated */}
                        </div>
                        <img 
                             src="src/assets/Solarresource.png" 
                             alt="Solar Resource Map" 
                             className="absolute top-0 start-0 object-cover w-full h-full rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl" 
                           />
                    </Card>
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-2xl border-divider-color">
                         <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-card-background border-b border-divider-color">
                            <BoltIcon />
                            <h3 className="font-semibold text-sm sm:text-base text-text-dark">{t('stackedPreview.cards.fast')}</h3> {/* 👈 Already translated */}
                        </div>
                        <img 
                             src="src/assets/Solarresource.png" 
                             alt="Solar Resource Map" 
                             className="absolute top-0 start-0 object-cover w-full h-full rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl" 
                           />
                    </Card>
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-lg sm:rounded-xl lg:rounded-2xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-card-background border-b border-divider-color">
                            <AdjustmentsHorizontalIcon />
                            <h3 className="font-semibold text-sm sm:text-base text-text-dark">{t('stackedPreview.cards.customizable')}</h3> {/* 👈 Already translated */}
                        </div>
                        <img 
                             src="src/assets/Solarresource.png" 
                             alt="Solar Resource Map" 
                             className="absolute top-0 start-0 object-cover w-full h-full rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl" 
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