import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProductFaq() {
  const { t } = useTranslation('Product');
  const [openKey, setOpenKey] = useState(null);
  const items = t('faq.items', { returnObjects: true });

  return (
    <section className="w-full max-w-4xl mb-20 sm:mb-24" aria-labelledby="product-faq-title">
      <h2 id="product-faq-title" className="text-center text-2xl sm:text-3xl lg:text-[42px] leading-tight font-bold text-gray-900 mb-8 sm:mb-12">{t('faq.title')}</h2>
      <div className="divide-y divide-gray-200 rounded-2xl bg-white border border-gray-200 px-5 sm:px-8">
        {Object.entries(items).map(([key, item]) => {
          const isOpen = openKey === key;
          return (
            <div key={key} className="py-4 sm:py-5">
              <button type="button" className="w-full flex items-center justify-between gap-4 text-start text-base sm:text-lg font-semibold text-gray-900" aria-expanded={isOpen} onClick={() => setOpenKey(isOpen ? null : key)}>
                <span>{item.question}</span><span className="shrink-0 text-2xl font-normal" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="mt-3 text-sm sm:text-base leading-7 text-gray-600">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
