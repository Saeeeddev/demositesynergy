import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const regions = [
    {
      name: 'North America',
      countries: [
        { 
          name: 'United States', 
          languages: [{ code: 'en', name: 'English', dir: 'ltr' }] 
        },
      ]
    },
    {
      name: 'Middle-East',
      countries: [
        { 
          name: 'Iran', 
          languages: [{ code: 'fa', name: 'فارسی', dir: 'rtl' }] 
        },
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLanguageChange = (langCode, dir) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = dir;
    document.documentElement.lang = langCode;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-transparent text-white rounded-full hover:bg-white/20 transition-colors duration-200"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HiOutlineGlobeAlt className="w-6 h-6" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-4 w-[clamp(300px,80vw,900px)] bg-white text-black rounded-lg shadow-2xl p-6 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-switcher-heading"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {regions.map((region) => (
              <div key={region.name}>
                <h3 className="font-bold text-base mb-3 text-gray-800">{region.name}</h3>
                <ul className="space-y-2">
                  {region.countries.map((country) => (
                    <li key={country.name}>
                      <p className="font-medium text-sm text-gray-700">{country.name}</p>
                      <div className="flex flex-wrap gap-x-2">
                        {country.languages.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code, lang.dir)}
                            className={`text-sm hover:underline ${lang.code === i18n.language ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
