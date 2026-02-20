import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import commonEn from '../locales/en/common.json';
import commonFa from '../locales/fa/common.json';

// Import Header translations
import headerEn from '../locales/en/Header.json';
import headerFa from '../locales/fa/Header.json';

// Import Footer translations
import footerEn from '../locales/en/Footer.json';
import footerFa from '../locales/fa/Footer.json';

// Import Home translations
import homeEn from '../locales/en/Home.json';
import homeFa from '../locales/fa/Home.json';

// Import Auth page translations
import authEn from '../locales/en/page/Auth.json';
import authFa from '../locales/fa/page/Auth.json';

// Import About page translations
import aboutEn from '../locales/en/page/About.json';
import aboutFa from '../locales/fa/page/About.json';

// Import Product page translations
import productEn from '../locales/en/page/Product.json';
import productFa from '../locales/fa/page/Product.json';

// Import Contact page translations
import contactEn from '../locales/en/page/Contact.json';
import contactFa from '../locales/fa/page/Contact.json';

// Import Pricing page translations
import pricingEn from '../locales/en/page/Pricing.json';
import pricingFa from '../locales/fa/page/Pricing.json';

// Import Support page translations
import supportEn from '../locales/en/page/Support.json';
import supportFa from '../locales/fa/page/Support.json';

// Import Case Studies page translations
import caseStudiesEn from '../locales/en/page/CaseStudies.json';
import caseStudiesFa from '../locales/fa/page/CaseStudies.json';

// Import Privacy page translations
import privacyEn from '../locales/en/page/legal/Privacy.json';
import privacyFa from '../locales/fa/page/legal/Privacy.json';

// Import Security page translations
import securityEn from '../locales/en/page/legal/Security.json';
import securityFa from '../locales/fa/page/legal/Security.json';

// Import Terms & Conditions page translations
import termsEn from '../locales/en/page/legal/TermsAndCondition.json';
import termsFa from '../locales/fa/page/legal/TermsAndCondition.json';

const resources = {
  en: {
    common: commonEn,
    Header: headerEn,
    Footer: footerEn,
    Home: homeEn,
    Auth: authEn, 
    About: aboutEn,
    Product: productEn,
    Contact: contactEn,
    Pricing: pricingEn,
    Support: supportEn,
    CaseStudies: caseStudiesEn,
    Privacy: privacyEn,
    Security: securityEn,
    TermsAndCondition: termsEn
  },
  fa: {
    common: commonFa,
    Header: headerFa,
    Footer: footerFa,
    Home: homeFa,
    Auth: authFa,
    About: aboutFa,
    Product: productFa,
    Contact: contactFa,
    Pricing: pricingFa,
    Support: supportFa,
    CaseStudies: caseStudiesFa,
    Privacy: privacyFa,
    Security: securityFa,
    TermsAndCondition: termsFa
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Default the site to Farsi for first-time visitors
    fallbackLng: 'fa',
    lng: 'fa',
    defaultNS: 'common',
    ns: [
      'common',
      'Header',
      'Footer', 
      'Home',
      'Auth',
      'About',
      'Product',
      'Contact',
      'Pricing',
      'Support',
      'CaseStudies',
      'Privacy',
      'Security',
      'TermsAndCondition'
    ],
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      // Respect a previously saved choice (localStorage) only.
      // This makes `fa` the initial language for new visitors.
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    react: {
      useSuspense: false
    }
  });


// Ensure HTML `lang` and `dir` reflect the active language on load and when it changes
const setHtmlAttrs = (lng) => {
  const dir = lng && lng.startsWith('fa') ? 'rtl' : 'ltr';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
  }
};

setHtmlAttrs(i18n.language || 'fa');
i18n.on('languageChanged', (lng) => setHtmlAttrs(lng));

export default i18n;
