import './App.css'
import React, { useEffect } from 'react';
import clsx from 'clsx'; // A small library for conditional classes
import { useTranslation } from 'react-i18next'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/website/Header'
import Footer from './components/website/Footer'
import Home from './components/page/Home'
import Security from './components/page/legal/Security'
import Privacy from './components/page/legal/Privacy'
import TermsAndCondition from './components/page/legal/TermsAndCondition'
import About from './components/page/About'
import Product from './components/page/Product'
import Contact from './components/page/Contact'
import Pricing from './components/page/Pricing'
import CookieNotice from './components/website/CookieNotice'
import NotFound from './components/page/NotFound'
import ErrorPage from './components/page/ErrorPage'

import ScrollToTop from './components/utils/ScrollToTop'

function App() {
  const { i18n } = useTranslation();
  const isFarsi = i18n.language === 'fa';

  // This effect now handles both direction and language attribute
  useEffect(() => {
    document.documentElement.dir = isFarsi ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.title = isFarsi ? 'سایت‌سینرژی' : 'SiteSynergy';
  }, [isFarsi, i18n.language]);

  // NEW: Conditionally set the font class for the entire app
  const appClasses = clsx('app', {
    'font-sans': !isFarsi, // Your default font from tailwind.config.js
    'font-yekan': isFarsi,  // The Yekan Bakh font for Farsi
  });
     


  
  return (
    <Router>
      <ScrollToTop />
      <div className={appClasses}>
        <Routes>
          <Route path="/" element={
            <>
              <Header key={i18n.language} isHomePage={true} />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<NotFound />} />
          <Route path="/case-studies" element={<NotFound />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieNotice />
      </div>
    </Router>
  );
}



export default App
