import React from "react";
import { Link } from "react-router-dom";
import "../../style/Footer.css";const Footer = () => {
  const footerData = [
    {
      title: 'APP',
      links: ['Web App', 'Login / Signup']
    },
    {
      title: 'PRODUCT',
      links: ['About', 'Features', 'Pricing', 'Docs', 'Contact']
    },
    {
      title: 'RESOURCES',
      links: ['Blog', 'Case Studies', 'News & Updates', 'Academy / Guides', 'Support']
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
    <div className="Footer-section__container">
      <div className="Footer-section__content">
        <div className="Footer-section__top-box">
          <div className="Footer-section__left-section">
            <div className="Footer-section__logo-box">
              {/* Logo placeholder */}
              <div className="Footer__logo-image"><img src="/src/assets/sitesynergy_logo_colored.png" alt="" /></div>
            </div>
          </div>
          <div className="Footer-section__right-section">
            {footerData.map((section, index) => (
              <div key={index} className="Footer-section__quick-links-box">
                <h3 className="Footer-section__quick-links-header">{section.title}</h3>
                <ul className="Footer-section__quick-links-list">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="Footer-section__quick-links-item">
                      {link === 'Security' ? (
                        <Link to="/security">{link}</Link>
                      ) : link === 'Privacy Policy' ? (
                        <Link to="/privacy">{link}</Link>
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
        <div className="Footer-section__bottom-box">
          <div className="Footer-section__copyright-box">
            <span className="Footer-section__copyright-text">
              © 2025 SiteSynergy Technologies. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;