import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import commonFa from '../locales/fa/common.json';
import commonEn from '../locales/en/common.json';

// Import Header translations
import headerFa from '../locales/fa/Header.json';
import headerEn from '../locales/en/Header.json';

// Import Footer translations
import footerFa from '../locales/fa/Footer.json';
import footerEn from '../locales/en/Footer.json';

// Import Home translations
import homeFa from '../locales/fa/Home.json';
import homeEn from '../locales/en/Home.json';

// Import About page translations
import aboutFa from '../locales/fa/page/About.json';
import aboutEn from '../locales/en/page/About.json';

// Import Product page translations
import productFa from '../locales/fa/page/Product.json';
import productEn from '../locales/en/page/Product.json';

// Import Contact page translations
import contactFa from '../locales/fa/page/Contact.json';
import contactEn from '../locales/en/page/Contact.json';

// Import Pricing page translations
import pricingFa from '../locales/fa/page/Pricing.json';
import pricingEn from '../locales/en/page/Pricing.json';

// Import Case Studies page translations
import caseStudiesFa from '../locales/fa/page/CaseStudies.json';
import caseStudiesEn from '../locales/en/page/CaseStudies.json';

// Import Privacy page translations
import privacyFa from '../locales/fa/page/legal/Privacy.json';
import privacyEn from '../locales/en/page/legal/Privacy.json';

// Import Security page translations
import securityFa from '../locales/fa/page/legal/Security.json';
import securityEn from '../locales/en/page/legal/Security.json';

// Import Terms & Conditions page translations
import termsFa from '../locales/fa/page/legal/TermsAndCondition.json';
import termsEn from '../locales/en/page/legal/TermsAndCondition.json';

const resources = {
  fa: {
    common: commonFa,
    Header: headerFa,
    Footer: footerFa,
    Home: homeFa,
    About: aboutFa,
    Product: productFa,
    Contact: contactFa,
    Pricing: pricingFa,
    CaseStudies: caseStudiesFa,
    Privacy: privacyFa,
    Security: securityFa,
    TermsAndCondition: termsFa
  },
  en: {
    common: commonEn, Header: headerEn, Footer: footerEn, Home: homeEn,
    About: aboutEn, Product: productEn, Contact: contactEn,
    Pricing: pricingEn, CaseStudies: caseStudiesEn,
    Privacy: privacyEn, Security: securityEn, TermsAndCondition: termsEn
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Default the site to Farsi for first-time visitors
    fallbackLng: 'fa',
    defaultNS: 'common',
    ns: [
      'common',
      'Header',
      'Footer', 
      'Home',
      'About',
      'Product',
      'Contact',
      'Pricing',
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
