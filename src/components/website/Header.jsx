// src/components/website/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import '../../style/Header.css';

function Header({ useColoredLogo = false, isHomePage = false }) {
  const { t } = useTranslation(['Header', 'common']);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Placeholder for authentication status.
  // This will be updated later with your actual authentication logic (e.g., from a context).
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                  src={windowWidth <= 1044 || isScrolled ? "/src/assets/sitesynergy_logo_white.png" : "/src/assets/sitesynergy_logo_colored.png"} 
                  alt={t('logoAlt', { ns: 'Header' })}
                />
              ) : (
                <img src="/src/assets/sitesynergy_logo_white.png" alt={t('logoAlt', { ns: 'Header' })} />
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
            {/* --- CORRECTED: Button now uses Link and checks login state --- */}
            {isLoggedIn ? (
              <Link to="/dashboard" className="header__get-started-btn">
                {t('actions.dashboard', { ns: 'Header', defaultValue: 'Dashboard' })}
              </Link>
            ) : (
              <Link to="/auth" className="header__get-started-btn">
                {t('actions.getStarted', { ns: 'Header' })}
              </Link>
            )}
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
            {/* --- CORRECTED: Mobile button also uses Link and checks login state --- */}
            <Link 
              to={isLoggedIn ? "/dashboard" : "/auth"} 
              className="header__mobile-get-started-btn" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isLoggedIn 
                ? t('actions.dashboard', { ns: 'Header', defaultValue: 'Dashboard' })
                : t('actions.getStarted', { ns: 'Header' })}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;