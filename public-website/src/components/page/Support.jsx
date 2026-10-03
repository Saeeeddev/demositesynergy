import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';

// Reusable component for the FAQ items to handle the open/close state
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-start text-gray-800 hover:text-gray-900 transition-colors"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <span className={`text-2xl text-gray-500 font-light transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <div className="text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Reusable component for the support resource cards
const SupportCard = ({ title, children, buttonText, buttonHref = '#' }) => (
  <div className="bg-card-background p-6 rounded-xl flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300">
    <h3 className="font-display text-xl font-bold text-text-dark mb-3">{title}</h3>
    <p className="text-suitability-paragraph leading-relaxed mb-6 flex-grow">{children}</p>
    <a
      href={buttonHref}
      className="text-center mt-auto w-full max-w-[200px] px-4 py-2 bg-surface-light text-primary-dark font-semibold rounded-full hover:bg-gray-200 transition-colors"
    >
      {buttonText}
    </a>
  </div>
);


const Support = () => {
  const { t } = useTranslation('Support');
  const faqItems = t('faq.items', { returnObjects: true });

  return (
    <div className="min-h-screen bg-background-secondary">
      <Header useColoredLogo={true} />

      <main className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* --- Looking for Support Section --- */}
          <div className="w-full max-w-[1200px] my-16 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-start mt-12">
              <SupportCard title={t('resources.contact.title')} buttonText={t('resources.contact.button')} buttonHref="/contact">
                {t('resources.contact.description')}
              </SupportCard>
              <SupportCard title={t('resources.demo.title')} buttonText={t('resources.demo.button')} buttonHref="/pricing">
                {t('resources.demo.description')}
              </SupportCard>
               <SupportCard title={t('resources.caseStudies.title')} buttonText={t('resources.caseStudies.button')}>
                {t('resources.caseStudies.description')}
              </SupportCard>
              <SupportCard title={t('resources.tutorials.title')} buttonText={t('resources.tutorials.button')}>
                {t('resources.tutorials.description')}
              </SupportCard>
            </div>
          </div>

          {/* --- FAQ Section --- */}
          <div className="w-full max-w-4xl my-24">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900">{t('faq.title')}</h2>
              <p className="text-5xl font-bold text-gray-900">{t('faq.subtitle')}</p>
            </div>
            <div className="space-y-2">
              {Object.values(faqItems).map((item, index) => (
                <FaqItem key={index} question={item.question}>
                  <p>{item.answer}</p>
                </FaqItem>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;