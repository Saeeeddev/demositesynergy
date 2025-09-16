import CardSwap, { Card } from './utils/CardSwap'; // Adjust the import path as needed

// Placeholder Icons (Unchanged)
const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-dark">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const BoltIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-dark">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const AdjustmentsHorizontalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-dark">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9-7.5h9.75" />
    </svg>
);


const StackedPreviewSection = () => {
  return (
    <section className="flex items-center justify-center w-full py-16 bg-background-primary" style={{ height: '650px' }}>
      <div className="flex items-center justify-between w-full max-w-6xl px-8">
        
        <div className="w-1/3 text-left">
          <h2 className="mb-4 text-4xl font-bold font-display text-text-dark">
         Smarter Site Selection.
          </h2>
          <p className="text-lg text-primary-dark">
            Optimize solar sites, cut complexity, and secure profitable locations.
          </p>
        </div>

        <div className="relative flex items-center justify-center w-2/3 h-full">
            {/* Adjusted scale slightly for wider cards */}
            <div className="absolute transform scale-[0.70] origin-center"> 
                <CardSwap
                    width={830} // Increased by 80px (700 + 80)
                    height={530} 
                    cardDistance={60} // Adjusted cardDistance for wider cards
                    verticalDistance={25} 
                    delay={4000}
                    pauseOnHover={false}
                    skewAmount={6}
                >
                    {/* ADDED: shadow-custom-lg class */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-2xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-3 px-4 py-3 bg-card-background border-b border-divider-color">
                            <ShieldCheckIcon />
                            <h3 className="font-semibold font-sans text-text-dark">Reliable</h3>
                        </div>
                        <div className="relative flex-grow w-full">
                           <img src="src/assets/TechniacalSuitablitty.png" alt="Technical Suitability Analysis" className="absolute top-0 left-0 object-cover w-full h-full" />
                        </div>
                    </Card>
                    {/* ADDED: shadow-custom-lg class */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-2xl border-divider-color">
                         <div className="flex items-center flex-shrink-0 gap-3 px-4 py-3 bg-card-background border-b border-divider-color">
                            <BoltIcon />
                            <h3 className="font-semibold font-sans text-text-dark">Fast</h3>
                        </div>
                         <div className="relative flex-grow w-full">
                           <img src="src/assets/summary.png" alt="Summary Report" className="absolute top-0 left-0 object-cover w-full h-full" />
                        </div>
                    </Card>
                    {/* ADDED: shadow-custom-lg class */}
                    <Card className="flex flex-col overflow-hidden border shadow-custom-lg bg-background-secondary rounded-2xl border-divider-color">
                        <div className="flex items-center flex-shrink-0 gap-3 px-4 py-3 bg-card-background border-b border-divider-color">
                            <AdjustmentsHorizontalIcon />
                            <h3 className="font-semibold font-sans text-text-dark">Customizable</h3>
                        </div>
                        <div className="relative flex-grow w-full">
                           <img src="src/assets/Solarresource.png" alt="Solar Resource Map" className="absolute top-0 left-0 object-cover w-full h-full" />
                        </div>
                    </Card>
                </CardSwap>
            </div>
        </div>
      </div>
    </section>
  );
};

export default StackedPreviewSection;