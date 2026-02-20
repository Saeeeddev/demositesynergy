import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation('common');
  const currentLang = i18n?.language?.split('-')[0] || i18n?.language || 'fa';
  const otherLang = currentLang === 'fa' ? 'en' : 'fa';

  const handleLanguageChange = () => {
    const dir = otherLang === 'fa' ? 'rtl' : 'ltr';
    i18n.changeLanguage(otherLang);
    document.documentElement.dir = dir;
    document.documentElement.lang = otherLang;
  };

  const label = otherLang === 'fa' ? 'فارسی' : 'EN';

  return (
    <span
      onClick={handleLanguageChange}
      className="cursor-pointer text-m font-medium px-2 py-2"
      aria-label={`Switch to ${otherLang === 'fa' ? 'Farsi' : 'English'}`}
    >
      {label}
    </span>
  );
};

export default LanguageSwitcher;


