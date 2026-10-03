import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';

const CaseStudies = () => {
  // Use the 'CaseStudies' namespace
  const { t } = useTranslation('CaseStudies');

  // Fetch the case studies object from the JSON file
  const caseStudiesData = t('studies', { returnObjects: true });
  const caseStudyKeys = Object.keys(caseStudiesData);

  // Fetch comparison data
  const traditionalData = t('comparison.traditional', { returnObjects: true });
  const sitesynergyData = t('comparison.sitesynergy', { returnObjects: true });
  const comparisonKeys =['timeline', 'data', 'risk', 'economic', 'cost'];

  return (
    <div className="min-h-screen bg-background-secondary">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              {t('hero.badge')}
            </p>
            <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              {t('hero.title')}
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* --- Case Studies Showcase --- */}
          <div className="w-full max-w-[1200px] space-y-24">
            {caseStudyKeys.map((key, index) => {
              const study = caseStudiesData[key];
              const results = Object.values(study.results);
              
              return (
                <div key={key} className="bg-card-background p-8 rounded-3xl shadow-surface border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <p className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-4">{study.client}</p>
                      <h2 className="font-display text-4xl font-bold text-text-dark mb-6">{study.title}</h2>
                      <div className="space-y-4 text-suitability-paragraph text-base">
                        <p><strong>{t('labels.theChallenge')}</strong> {study.challenge}</p>
                        <p><strong>{t('labels.theSolution')}</strong> {study.solution}</p>
                      </div>
                    </div>
                    
                    <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                       {/* HTML/CSS Placeholder instead of an <img> tag */}
                       <div className="rounded-xl shadow-map-viz w-full aspect-[4/3] bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center">
                         <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                         </svg>
                         <span className="text-lg font-semibold text-gray-600">{study.title}</span>
                         <span className="text-sm mt-2 text-gray-500">Map Visualization Placeholder</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 border-t border-gray-200 pt-8">
                     <h3 className="font-display text-2xl font-bold text-text-dark mb-6 text-center">{t('labels.keyResults')}</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {results.map((result, r_index) => (
                          <div key={r_index} className="bg-surface-light p-4 rounded-lg">
                            <p className="text-3xl font-bold text-primary-dark">{result.metric}</p>
                            <p className="text-sm text-gray-600 font-semibold">{result.description}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- Comparison Section --- */}
          <div className="w-full max-w-[1200px] my-32">
              <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-gray-900">{t('comparison.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card-background p-8 rounded-2xl shadow-surface border">
                  <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-500 mb-4">{traditionalData.title}</h3>
                      <ul className="space-y-3 text-gray-600 list-disc list-inside">
                          {comparisonKeys.map(key => {
                              const [label, ...value] = t(`comparison.traditional.${key}`).split(':');
                              return (
                                <li key={key}><strong className="text-gray-700">{label}:</strong>{value.join(':')}</li>
                              )
                          })}
                      </ul>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-secondary">
                      <h3 className="text-2xl font-bold text-primary-dark mb-4">{sitesynergyData.title}</h3>
                      <ul className="space-y-3 text-gray-700 list-disc list-inside">
                          {comparisonKeys.map(key => {
                              const [label, ...value] = t(`comparison.sitesynergy.${key}`).split(':');
                              return (
                                <li key={key}><strong className="text-gray-800">{label}:</strong>{value.join(':')}</li>
                              )
                          })}
                      </ul>
                  </div>
              </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;