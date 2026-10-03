import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';

// A reusable card for comparing the old vs. new way
const ValueCard = ({ title, children, isAdvantage = false }) => (
  <div className={`p-8 rounded-2xl h-full flex flex-col ${isAdvantage ? 'bg-card-background shadow-surface border-blue-200 border' : 'bg-gray-100'}`}>
    <h3 className={`font-display text-xl font-bold mb-3 ${isAdvantage ? 'text-primary-dark' : 'text-gray-700'}`}>{title}</h3>
    <p className="text-suitability-paragraph leading-relaxed flex-grow">{children}</p>
  </div>
);

const Pricing = () => {
  const { t } = useTranslation('Pricing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
              {t('hero.badge')}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              {t('hero.title')}
            </h1>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* --- The Comparison Section --- */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* The Old Way */}
              <div>
                <h2 className="text-center text-2xl sm:text-[32px] font-bold text-gray-500 mb-8 whitespace-pre-line">
                  {t('comparison.oldWay.title')}
                </h2>
                <div className="space-y-6">
                  <ValueCard title={t('comparison.oldWay.subscription.title')}>
                    {t('comparison.oldWay.subscription.description')}
                  </ValueCard>
                  <ValueCard title={t('comparison.oldWay.consulting.title')}>
                    {t('comparison.oldWay.consulting.description')}
                  </ValueCard>
                  <ValueCard title={t('comparison.oldWay.experts.title')}>
                    {t('comparison.oldWay.experts.description')}
                  </ValueCard>
                </div>
              </div>
              {/* The SiteSynergy Way */}
              <div>
                <h2 className="text-center text-2xl sm:text-[32px] font-bold text-gray-900 mb-8 whitespace-pre-line">
                  {t('comparison.newWay.title')}
                </h2>
                <div className="space-y-6">
                  <ValueCard title={t('comparison.newWay.project.title')} isAdvantage={true}>
                    {t('comparison.newWay.project.description')}
                  </ValueCard>
                  <ValueCard title={t('comparison.newWay.speed.title')} isAdvantage={true}>
                    {t('comparison.newWay.speed.description')}
                  </ValueCard>
                  <ValueCard title={t('comparison.newWay.integrated.title')} isAdvantage={true}>
                    {t('comparison.newWay.integrated.description')}
                  </ValueCard>
                </div>
              </div>
            </div>
          </div>

          {/* --- CTA Section --- */}
          <div className="w-full max-w-[1200px] my-24 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-4">
              {t('cta.badge')}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-tight lg:leading-[48px] font-bold text-gray-900 mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg leading-[28px] text-gray-600 max-w-[600px] mx-auto mb-8">
              {t('cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-block h-[42px] py-2 px-8 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn no-underline"
            >
              {t('cta.button')}
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
