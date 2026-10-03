import { useTranslation } from 'react-i18next';

export default function IncludedInsights() {
  const { t } = useTranslation('Home');
  const features = t('included.features', { returnObjects: true });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20" aria-labelledby="included-insights-title">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 lg:p-14 shadow-surface">
        <div className="text-center mb-8 sm:mb-12">
          <h2 id="included-insights-title" className="text-2xl sm:text-3xl lg:text-[42px] leading-tight font-bold text-gray-900">{t('included.title')}</h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 mt-4 max-w-2xl mx-auto">{t('included.subtitle')}</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-5">
          {Object.entries(features).map(([key, feature]) => (
            <li key={key} className="flex items-start gap-3 min-w-0">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-300 text-white flex items-center justify-center mt-0.5" aria-hidden="true">✓</span>
              <span className="text-sm sm:text-base leading-relaxed text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
