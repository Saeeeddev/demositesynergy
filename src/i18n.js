import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import commonEn from '../locales/en/common.json';
import commonAr from '../locales/ar/common.json';
import commonFa from '../locales/fa/common.json';

// Import Header translations
import headerEn from '../locales/en/Header.json';
import headerAr from '../locales/ar/Header.json';
import headerFa from '../locales/fa/Header.json';

// Import Footer translations
import footerEn from '../locales/en/Footer.json';
import footerAr from '../locales/ar/Footer.json';
import footerFa from '../locales/fa/Footer.json';

// Import Home translations
import homeEn from '../locales/en/Home.json';
import homeAr from '../locales/ar/Home.json';
import homeFa from '../locales/fa/Home.json';

// Import About page translations
import aboutEn from '../locales/en/page/About.json';
import aboutAr from '../locales/ar/page/About.json';
import aboutFa from '../locales/fa/page/About.json';

// Import Product page translations
import productEn from '../locales/en/page/Product.json';
import productAr from '../locales/ar/page/Product.json';
import productFa from '../locales/fa/page/Product.json';

// Import Contact page translations
import contactEn from '../locales/en/page/Contact.json';
import contactAr from '../locales/ar/page/Contact.json';
import contactFa from '../locales/fa/page/Contact.json';

// Import Pricing page translations
import pricingEn from '../locales/en/page/Pricing.json';
import pricingAr from '../locales/ar/page/Pricing.json';
import pricingFa from '../locales/fa/page/Pricing.json';

// Import Support page translations
import supportEn from '../locales/en/page/Support.json';
import supportAr from '../locales/ar/page/Support.json';
import supportFa from '../locales/fa/page/Support.json';

// Import Case Studies page translations
import caseStudiesEn from '../locales/en/page/CaseStudies.json';
import caseStudiesAr from '../locales/ar/page/CaseStudies.json';
import caseStudiesFa from '../locales/fa/page/CaseStudies.json';

// Import Privacy page translations
import privacyEn from '../locales/en/page/legal/Privacy.json';
import privacyAr from '../locales/ar/page/legal/Privacy.json';
import privacyFa from '../locales/fa/page/legal/Privacy.json';

// Import Security page translations
import securityEn from '../locales/en/page/legal/Security.json';
import securityAr from '../locales/ar/page/legal/Security.json';
import securityFa from '../locales/fa/page/legal/Security.json';

// Import Terms & Conditions page translations
import termsEn from '../locales/en/page/legal/TermsAndCondition.json';
import termsAr from '../locales/ar/page/legal/TermsAndCondition.json';
import termsFa from '../locales/fa/page/legal/TermsAndCondition.json';

const resources = {
  en: {
    common: commonEn,
    Header: headerEn,
    Footer: footerEn,
    Home: homeEn,
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
  ar: {
    common: commonAr,
    Header: headerAr,
    Footer: footerAr,
    Home: homeAr,
    About: aboutAr,
    Product: productAr,
    Contact: contactAr,
    Pricing: pricingAr,
    Support: supportAr,
    CaseStudies: caseStudiesAr,
    Privacy: privacyAr,
    Security: securityAr,
    TermsAndCondition: termsAr
  },
  fa: {
    common: commonFa,
    Header: headerFa,
    Footer: footerFa,
    Home: homeFa,
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
    fallbackLng: 'en',
    lng: 'en',
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
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
