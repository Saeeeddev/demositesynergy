import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../website/Header';
import Footer from '../../website/Footer';

const Privacy = () => {
  const { t } = useTranslation('Privacy');

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
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              {t('lastUpdated')}
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-2xl mt-8 sm:mt-10 md:mt-12 text-text-dark space-y-8 sm:space-y-10 px-4 sm:px-6">
          {/* Intro Section */}
          <section>
            <p className="text-base leading-relaxed mb-4">
              {t('intro.paragraph1')}
            </p>

            <p className="text-base leading-relaxed mb-8">
              {t('intro.paragraph2')}
            </p>

            <h2 className="text-3xl font-display font-bold mb-4">{t('dataCollection.title')}</h2>
            <p className="text-base leading-relaxed mb-4">
              {t('dataCollection.description')}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{t('dataCollection.types.account.title')}</h3>
                <p className="text-base leading-relaxed">
                  {t('dataCollection.types.account.description')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{t('dataCollection.types.project.title')}</h3>
                <p className="text-base leading-relaxed">
                  {t('dataCollection.types.project.description')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{t('dataCollection.types.usage.title')}</h3>
                <p className="text-base leading-relaxed">
                  {t('dataCollection.types.usage.description')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{t('dataCollection.types.device.title')}</h3>
                <p className="text-base leading-relaxed">
                  {t('dataCollection.types.device.description')}
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed mt-6">
              {t('dataCollection.note')}
            </p>
          </section>

          {/* Architecture & Infrastructure Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">{t('architecture.localFirst.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('architecture.localFirst.description')}
            </p>

            <h2 className="text-4xl font-display font-bold">{t('architecture.enterprise.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('architecture.enterprise.description')}
            </p>

            <h2 className="text-4xl font-display font-bold">{t('architecture.security.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('architecture.security.description')}
            </p>

            <h2 className="text-4xl font-display font-bold">{t('architecture.authentication.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('architecture.authentication.description')}
            </p>
          </section>

          {/* Privacy by Design Section */}
          <section className="space-y-8">
            <h2 className="text-4xl font-display font-bold">{t('privacyByDesign.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('privacyByDesign.description')}
            </p>

            <ul className="list-disc list-inside space-y-4 text-base leading-relaxed">
              <li>
                <span className="font-bold">{t('privacyByDesign.features.localControl.title')}</span> {t('privacyByDesign.features.localControl.description')}
              </li>
              <li>
                <span className="font-bold">{t('privacyByDesign.features.scopedUploads.title')}</span> {t('privacyByDesign.features.scopedUploads.description')}
              </li>
              <li>
                <span className="font-bold">{t('privacyByDesign.features.permissionedSharing.title')}</span> {t('privacyByDesign.features.permissionedSharing.description')}
              </li>
            </ul>

            <p className="text-base leading-relaxed">
              {t('privacyByDesign.conclusion')}
            </p>
          </section>

          {/* Cloud & Data Section */}
          <section className="space-y-8 pb-8">
            <h2 className="text-4xl font-display font-bold">{t('cloudFeatures.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('cloudFeatures.paragraph1')}
            </p>

            <p className="text-base leading-relaxed">
              {t('cloudFeatures.paragraph2')}
            </p>

            <p className="text-base leading-relaxed">
              {t('cloudFeatures.paragraph3')}
            </p>

            <h2 className="text-4xl font-display font-bold">{t('dataOwnership.title')}</h2>
            <p className="text-base leading-relaxed">
              {t('dataOwnership.paragraph1')}
            </p>
            <p className="text-base leading-relaxed">
              {t('dataOwnership.paragraph2')}
            </p>
          </section>
        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default Privacy;