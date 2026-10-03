import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CONSENT_KEY = 'sitesynergy-cookie-choice';

export default function CookieNotice() {
  const { t } = useTranslation('common');
  const [choice, setChoice] = useState(() => {
    try { return document.cookie.split('; ').find((item) => item.startsWith(`${CONSENT_KEY}=`))?.split('=')[1] || null; } catch { return null; }
  });

  const saveChoice = (value) => {
    try { document.cookie = `${CONSENT_KEY}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch { /* cookies may be disabled */ }
    setChoice(value);
  };

  if (choice) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[1100] mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl text-gray-800" role="dialog" aria-label={t('cookies.title')}>
      <h2 className="font-bold text-lg mb-2">{t('cookies.title')}</h2>
      <p className="text-sm leading-relaxed mb-4">{t('cookies.description')} <Link className="underline" to="/privacy">{t('cookies.privacy')}</Link></p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => saveChoice('accepted')} className="rounded-full bg-[#6d7f9f] px-5 py-2 text-white">{t('cookies.accept')}</button>
        <button type="button" onClick={() => saveChoice('necessary')} className="rounded-full border border-gray-300 px-5 py-2">{t('cookies.necessary')}</button>
      </div>
    </aside>
  );
}
