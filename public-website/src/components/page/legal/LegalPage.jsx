import { useTranslation } from 'react-i18next';
import Header from '../../website/Header';
import Footer from '../../website/Footer';

export default function LegalPage({ namespace }) {
  const { t } = useTranslation(namespace);
  const sections = t('sections', { returnObjects: true });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo />
      <main className="mx-auto max-w-4xl px-5 pt-36 pb-20 text-gray-800">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-sm text-gray-500">{t('lastUpdated')}</p>
        </header>
        <p className="text-lg leading-8 mb-10">{t('intro')}</p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl bg-white p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-8 mb-3 last:mb-0">{paragraph}</p>)}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
