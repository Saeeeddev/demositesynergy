import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';
import DashboardImg from '../../assets/DemoImage/Dashboard.png'; 
import syIcon from '../../assets/LogoIconImages/sy_icon_transparent_background.png';

// Placeholder icons for feature cards
const FeatureIcon = ({ children }) => (
  <div className="w-12 h-12 bg-primary-light-blue/50 text-primary-dark rounded-lg flex items-center justify-center mb-5">
    {children}
  </div>
);

const Product = () => {
  // Use the 'Product' namespace to get the correct translations
  const { t } = useTranslation('Product');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <div className="mb-8">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
                {t('hero.badge')}
              </p>
            </div>
            
            <h1 className="text-[56px] leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              {t('hero.title')}
            </h1>
            
            <div className="max-w-[600px] mx-auto">
              <p className="text-lg leading-[28px] text-gray-600">
                {t('hero.description')}
              </p>
            </div>
          </div>

          {/* Product Feature Section */}
          <div className="w-full max-w-[1200px] mb-24">
            {/* Main Feature Showcase */}
            <div className="bg-card-background p-8 rounded-3xl shadow-surface mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-start">
                  <p className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-4">
                    {t('mainFeature.badge')}
                  </p>
                  <h2 className="font-display text-4xl font-bold text-text-dark mb-6">
                    {t('mainFeature.title')}
                  </h2>
                  <p className="text-suitability-paragraph text-lg leading-relaxed">
                    {t('mainFeature.description')}
                  </p>
                </div>
                {/* Visual Mockup */}
                <div className="bg-surface-light rounded-xl shadow-map-viz p-3">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <img 
                      src={DashboardImg} 
                      alt={t('mainFeature.imageAlt')}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
              {/* Feature 1 */}
              <div className="bg-card-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <FeatureIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 12a4 4 0 118 0 4 4 0 01-8 0z" /></svg>
                </FeatureIcon>
                <h3 className="font-display text-xl font-bold text-text-dark mb-3">
                  {t('features.adaptive.title')}
                </h3>
                <p className="text-suitability-paragraph leading-relaxed">
                  {t('features.adaptive.description')}
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-card-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <FeatureIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7l8-4 8 4m-8 4v10" /></svg>
                </FeatureIcon>
                <h3 className="font-display text-xl font-bold text-text-dark mb-3">
                  {t('features.multiLayer.title')}
                </h3>
                <p className="text-suitability-paragraph leading-relaxed">
                  {t('features.multiLayer.description')}
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-card-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <FeatureIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 00-4-4H3a2 2 0 00-2 2v2a2 2 0 002 2h2a4 4 0 004-4zm12-6a4 4 0 00-4-4h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a4 4 0 004-4z" /></svg>
                </FeatureIcon>
                <h3 className="font-display text-xl font-bold text-text-dark mb-3">
                  {t('features.endToEnd.title')}
                </h3>
                <p className="text-suitability-paragraph leading-relaxed">
                  {t('features.endToEnd.description')}
                </p>
              </div>
            </div>
          </div>


          {/* Call to Action Section */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center">
              
              <div className="mb-8">
                <div className="w-24 h-24 rounded-2xl shadow-2xl shadow-gray-400/30 mx-auto flex items-center justify-center border border-gray-200 p-2">
                  <img 
                    src={syIcon}
                    alt={t('cta.appIconAlt')} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-4">
                  {t('cta.badge')}
                </p>
                <h2 className="text-[42px] leading-[48px] font-bold text-gray-900 mb-8 whitespace-pre-line">
                  {t('cta.title')}
                </h2>
              </div>
              
              <div>
                <button className="mt-4 w-[180px] h-[42px] py-2 px-4 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-action-btn-hover shadow-action-btn">
                  {t('cta.button')}
                </button>
              </div>
              
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
