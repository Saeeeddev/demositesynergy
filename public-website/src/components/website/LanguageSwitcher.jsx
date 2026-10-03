import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation('common');
  const currentLang = i18n?.language?.split('-')[0] || i18n?.language || 'fa';
  const otherLang = currentLang === 'fa' ? 'en' : 'fa';

  const handleLanguageChange = () => {
    i18n.changeLanguage(otherLang);
  };

  const label = otherLang === 'fa' ? 'فارسی' : 'English';

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      className="header__language-btn"
      aria-label={`Switch to ${otherLang === 'fa' ? 'Farsi' : 'English'}`}
    >
      <Languages size={18} aria-hidden="true" />
      {label}
    </button>
  );
};

export default LanguageSwitcher;

