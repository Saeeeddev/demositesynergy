import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // 👈 Import useTranslation

// Helper to map JSON keys to URL paths
const linkPaths = {
  about: '/about',
  product: '/product',
  pricing: '/pricing',
  contact: '/contact',
  caseStudies: '/case-studies',
  support: '/support',
  privacyPolicy: '/privacy',
  termsConditions: '/terms',
  security: '/security'
};

const Footer = () => {
  const { t } = useTranslation('Footer'); // 👈 Use the 'Footer' namespace
  
  // Get the sections object from your JSON file. `returnObjects: true` is essential.
  const footerSections = t('sections', { returnObjects: true });

  return (
    <div className="bg-transparent py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 mb-8 md:mb-10">
          <div className="flex-shrink-0">
            <div className="flex justify-center md:justify-start">
              <Link to="/">
                <img 
                  className="h-12 sm:h-10 w-auto" 
                  src="/src/assets/sitesynergy_logo_colored.png" 
                  alt={t('logoAlt')} // 👈 Translated
                />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 md:gap-8 lg:gap-12">
            {/* 👈 Loop through the translated sections */}
            {Object.keys(footerSections).map((sectionKey) => (
              <div key={sectionKey} className="min-w-[120px]">
                <h3 className="text-gray-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  {footerSections[sectionKey].title}
                </h3>
                <ul className="list-none p-0">
                  {/* 👈 Loop through the translated links */}
                  {Object.keys(footerSections[sectionKey].links).map((linkKey) => {
                    const linkText = footerSections[sectionKey].links[linkKey];
                    const path = linkPaths[linkKey];
                    return (
                      <li 
                        key={linkKey} 
                        className="text-gray-500 text-xs sm:text-sm mb-2 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                      >
                        {path ? (
                          <Link to={path} className="text-inherit no-underline">{linkText}</Link>
                        ) : (
                          linkText
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 sm:pt-5 text-center">
          <div>
            <span className="text-gray-500 text-xs sm:text-sm">
              {t('copyright')} {/* 👈 Translated */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;