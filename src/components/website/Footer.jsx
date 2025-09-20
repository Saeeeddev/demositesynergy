import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerData = [
    {
      title: 'APP',
      links: ['Web App', 'Login / Signup']
    },
    {
      title: 'PRODUCT',
      links: ['About', 'Product', 'Pricing', 'Contact']
    },
    {
      title: 'RESOURCES',
      links: ['Case Studies', 'Support']
    },
    {
      title: 'TEST',
      links: ['Not Found', 'Error Page']
    },
    {
      title: 'CONNECT',
      links: ['LinkedIn', 'X / Twitter', 'Instagram', 'YouTube']
    },
    {
      title: 'LEGAL',
      links: ['Privacy Policy', 'Terms & Conditions', 'Security']
    }
  ];

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
                  alt="SiteSynergy" 
                />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 md:gap-8 lg:gap-12">
            {footerData.map((section, index) => (
              <div key={index} className="min-w-[120px]">
                <h3 className="text-gray-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="list-none p-0">
                  {section.links.map((link, linkIndex) => (
                    <li 
                      key={linkIndex} 
                      className="text-gray-500 text-xs sm:text-sm mb-2 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                    >
                      {link === 'Security' ? (
                        <Link to="/security" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Terms & Conditions' ? (
                        <Link to="/terms" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Privacy Policy' ? (
                        <Link to="/privacy" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'About' ? (
                        <Link to="/about" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Pricing' ? (
                        <Link to="/pricing" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Product' ? (
                        <Link to="/product" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Contact' ? (
                        <Link to="/contact" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Support' ? (
                        <Link to="/support" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Case Studies' ? (
                        <Link to="/case-studies" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Not Found' ? (
                        <Link to="/not-found" className="text-inherit no-underline">{link}</Link>
                      ) : link === 'Error Page' ? (
                        <Link to="/error-page" className="text-inherit no-underline">{link}</Link>
                      ) : (
                        link
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 sm:pt-5 text-center">
          <div>
            <span className="text-gray-500 text-xs sm:text-sm">
              © 2025 SiteSynergy Technologies. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;