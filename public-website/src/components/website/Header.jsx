// src/components/website/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../style/Header.css';
import LanguageSwitcher from './LanguageSwitcher';
import logoWhite from '../../assets/LogoIconImages/sitesynergy_logo_white.png';
import logoColored from '../../assets/LogoIconImages/sitesynergy_logo_colored.png';

function Header({ useColoredLogo = false, isHomePage = false }) {
  const { t } = useTranslation(['Header', 'common']);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = isHomePage ? 370 : 30;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.header__mobile-menu') && !e.target.closest('.header__hamburger')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className={`header__container ${isScrolled ? 'header__container--scrolled' : ''}`}>
        <div className={`header__wrapper ${isScrolled ? 'header__wrapper--scrolled' : ''}`}>
          <div className="header__logo-placeholder">
            <Link to="/" className="header__logo-image">
              {useColoredLogo ? (
                <img 
               src={windowWidth <= 1044 || isScrolled ? logoWhite : logoColored} 
                alt={t('logoAlt', { ns: 'Header' })}
                />
              ) : (
                <img src={logoWhite} alt={t('logoAlt', { ns: 'Header' })} />
              )}
            </Link>
          </div>

          <nav className="header__nav-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item"><Link to="/product">{t('menu.product', { ns: 'Header' })}</Link></li>
              <li className="header__nav-item"><Link to="/about">{t('menu.about', { ns: 'Header' })}</Link></li>
              <li className="header__nav-item"><Link to="/contact">{t('menu.contact', { ns: 'Header' })}</Link></li>
            </ul>
          </nav>

          <div className="header__actions">
            <LanguageSwitcher />
            <a href="https://d.sitesynergy.ir/login" className="header__get-started-btn">
              {t('actions.getStarted', { ns: 'Header' })}
            </a>
          </div>

          <button 
            className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={t('mobileMenu.toggleLabel', { ns: 'Header' })}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/product">{t('menu.product', { ns: 'Header' })}</Link></li>
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/about">{t('menu.about', { ns: 'Header' })}</Link></li>
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/contact">{t('menu.contact', { ns: 'Header' })}</Link></li>
          </ul>
          <div className="header__mobile-actions">
            <LanguageSwitcher />
            <a
              href="https://d.sitesynergy.ir/login"
              className="header__mobile-get-started-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('actions.getStarted', { ns: 'Header' })}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
