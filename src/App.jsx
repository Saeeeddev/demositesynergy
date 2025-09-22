import React, { useState, useEffect } from 'react';

import './App.css'
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
import Support from './components/page/Support'
import CaseStudies from './components/page/CaseStudies'
import NotFound from './components/page/NotFound'
import ErrorPage from './components/page/ErrorPage'

import ScrollToTop from './components/utils/ScrollToTop'

function App() {

  const { i18n } = useTranslation(); // 👈 Get the i18n instance

  // This effect runs when the language changes and sets the page direction
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n, i18n.language]);

  return (
    <Router>
      <ScrollToTop />
      <div className='app'>
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
          <Route path="/support" element={<Support />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App
