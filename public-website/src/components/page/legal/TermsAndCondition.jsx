import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../website/Header';
import Footer from '../../website/Footer';

const TermsAndCondition = () => {
  const { t } = useTranslation('TermsAndCondition');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Top Box for Title */}
          <div className="w-full max-w-3xl mt-8 sm:mt-12 md:mt-16 flex flex-col items-center justify-center">
            <div className="w-full text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black leading-tight">
                {t('title')}
              </h1>
            </div>
            <div className="w-full text-center">
              <p className="text-gray-500 text-xs sm:text-sm mt-2">{t('lastUpdated')}</p>
            </div>
          </div>

          {/* Content Box */}
          <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
            {/* Intro Section */}
            <section>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph1')}
              </p>
              <p className="text-base leading-relaxed">
                {t('intro.paragraph2')}
              </p>
            </section>

            {/* Account Terms Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-display font-bold">{t('sections.accountTerms.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.accountTerms.description')}
              </p>

              <h2 className="text-4xl font-display font-bold">{t('sections.contentRights.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.contentRights.description')}
              </p>

              <h2 className="text-4xl font-display font-bold">{t('sections.serviceRules.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.serviceRules.description')}
              </p>

              <h2 className="text-4xl font-display font-bold">{t('sections.modifications.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.modifications.description')}
              </p>
            </section>

            {/* Subscription Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-display font-bold">{t('sections.subscriptionTerms.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.subscriptionTerms.description')}
              </p>
              <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
                <li>
                  <span className="font-bold">{t('sections.subscriptionTerms.items.billingCycle.title')}</span> {t('sections.subscriptionTerms.items.billingCycle.description')}
                </li>
                <li>
                  <span className="font-bold">{t('sections.subscriptionTerms.items.automaticRenewal.title')}</span> {t('sections.subscriptionTerms.items.automaticRenewal.description')}
                </li>
                <li>
                  <span className="font-bold">{t('sections.subscriptionTerms.items.refundPolicy.title')}</span> {t('sections.subscriptionTerms.items.refundPolicy.description')}
                </li>
              </ul>
            </section>

            {/* Legal Disclaimers Section */}
            <section className="space-y-8 pb-8">
              <h2 className="text-4xl font-display font-bold">{t('sections.legalDisclaimers.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.legalDisclaimers.paragraph1')}
              </p>
              <p className="text-base leading-relaxed">
                {t('sections.legalDisclaimers.paragraph2')}
              </p>

              <h2 className="text-4xl font-display font-bold">{t('sections.changesToTerms.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.changesToTerms.paragraph1')}
              </p>
              <p className="text-base leading-relaxed">
                {t('sections.changesToTerms.paragraph2')}
              </p>

              <h2 className="text-4xl font-display font-bold">{t('sections.contactUs.title')}</h2>
              <p className="text-base leading-relaxed">
                {t('sections.contactUs.description')}
              </p>
              <p className="text-base leading-relaxed font-semibold">
                {t('sections.contactUs.company')}<br />
                {t('sections.contactUs.address')}<br />
                {t('sections.contactUs.email')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndCondition;