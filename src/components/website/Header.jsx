import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Header.css';
function Header({ useColoredLogo = false, isHomePage = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      // Use 370px for home page, 30px for other pages
      const scrollThreshold = isHomePage ? 370 : 30;
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.header__mobile-menu') && !e.target.closest('.header__hamburger')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`header__container ${isScrolled ? 'header__container--scrolled' : ''}`}>
        <div className={`header__wrapper ${isScrolled ? 'header__wrapper--scrolled' : ''}`}>
          {/* Logo Placeholder */}
          <div className="header__logo-placeholder">
            {/* Logo changes based on scroll state */}
            <Link to="/" className="header__logo-image">
              {useColoredLogo ? (
                <img 
                  src={windowWidth <= 1044 || isScrolled ? "/src/assets/sitesynergy_logo_white.png" : "/src/assets/sitesynergy_logo_colored.png"} 
                  alt="SiteSynergy" 
                />
              ) : (
                <img src="/src/assets/sitesynergy_logo_white.png" alt="SiteSynergy" />
              )}
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="header__nav-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item"><Link to="/product">Product</Link></li>
              <li className="header__nav-item"><Link to="/about">About</Link></li>
              <li className="header__nav-item"><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Actions Section - Desktop Only */}
          <div className="header__actions">
            <button className="header__get-started-btn">Get Started</button>
          </div>

          {/* Hamburger Menu - Mobile/Tablet */}
          <button 
            className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/product">Product</Link></li>
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/about">About</Link></li>
            <li className="header__mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}><Link to="/contact">Contact</Link></li>
          </ul>
          <button className="header__mobile-get-started-btn" onClick={() => setIsMobileMenuOpen(false)}>
            Get Started
          </button>
        </nav>
      </div>
    </>
  );
}

export default Header;