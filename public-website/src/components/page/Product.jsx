import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../website/Header';
import Footer from '../website/Footer';
import ProductFaq from './ProductFaq';

// وارد کردن آیکون CTA
import syIcon from '../../assets/LogoIconImages/sy_icon_transparent_background.png';

// ----------------------------------------------------------------------
// وارد کردن عکس‌های مربوط به محصول "سایت سلکشن" 
import ssImg1 from '../../assets/ProductImage/siteSelectionIMG1.png'; 
import ssImg2 from '../../assets/ProductImage/siteSelectionIMG2.png'; 
import ssImg3 from '../../assets/ProductImage/siteSelectionIMG3.png'; 
import ssImg4 from '../../assets/ProductImage/siteSelectionIMG4.png'; 

// وارد کردن عکس‌های مربوط به محصول "گزارش‌ها" 
import repImg1 from '../../assets/ProductImage/siteSelectionIMG1.png'; 
import repImg2 from '../../assets/ProductImage/siteSelectionIMG1.png'; 
import repImg3 from '../../assets/ProductImage/siteSelectionIMG1.png'; 
import repImg4 from '../../assets/ProductImage/siteSelectionIMG1.png'; 
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// کامپوننت اختصاصی اسلایدر (Fixed Z-Index)
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // تغییر خودکار اسلایدها هر 4 ثانیه
  useEffect(() => {
    if (isModalOpen) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer);
  }, [isModalOpen, images.length]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* کادر تصویر اسلایدر */}
      <div 
        className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 group bg-gray-50 cursor-pointer"
        style={{ aspectRatio: '1915/859' }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* تصاویر */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* دکمه قبلی (هنگام هاور مشخص می‌شود) */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* دکمه بعدی (هنگام هاور مشخص می‌شود) */}
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* نقطه‌های راهنما (زیر اسلایدر و بدون عدد) */}
      <div className="flex justify-center items-center gap-2 mt-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { 
              e.stopPropagation();
              setCurrentIndex(idx); 
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'w-8 bg-primary-dark shadow-sm' // نقطه فعال طولانی‌تر و به رنگ اصلی
                : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* مودال نمایش تمام‌صفحه (View) */}
      {isModalOpen && (
        <div 
          /* Updated z-index to 9999 to cover Header */
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          {/* دکمه بستن (Close) - Updated z-index to 10000 */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-red-500/90 text-white z-[10000] p-2 rounded-full transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); 
              setIsModalOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* دکمه قبلی در حالت تمام‌صفحه */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* تصویر در حالت تمام‌صفحه */}
          <img 
            src={images[currentIndex]} 
            alt={`Full View ${currentIndex + 1}`} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default relative z-[10000]"
            onClick={(e) => e.stopPropagation()} 
          />

          {/* دکمه بعدی در حالت تمام‌صفحه */}
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* نمایش شماره عکس در پایین مودال */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-lg z-[10000]">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};
// ----------------------------------------------------------------------

const FeatureIcon = ({ children }) => (
  <div className="w-10 h-10 bg-primary-light-blue/50 text-primary-dark rounded-lg flex items-center justify-center mb-3 shrink-0">
    {children}
  </div>
);

// Map of different icons for Site Selection features
const siteSelectionIcons = {
  f1: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  f2: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
  ),
  f3: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  )
};

// Map of different icons for Reports features
const reportsIcons = {
  f1: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  ),
  f2: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  ),
  f3: ( 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  )
};

const Product = () => {
  const { t } = useTranslation('Product');

  const siteSelectionFeatures = ['f1', 'f2', 'f3'];
  const reportsFeatures =['f1', 'f2', 'f3'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* --- Hero Section --- */}
          <div className="w-full max-w-[1200px] mt-16 mb-24 text-center">
            <div className="mb-8">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">
                {t('hero.badge')}
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[64px] font-bold text-gray-900 mb-6 max-w-[800px] mx-auto">
              {t('hero.title')}
            </h1>
            <div className="max-w-[600px] mx-auto">
              <p className="text-lg leading-[28px] text-gray-600">
                {t('hero.description')}
              </p>
            </div>
          </div>

          {/* --- Product 1: Site Selection --- */}
          <div className="w-full max-w-[1200px] bg-card-background p-8 lg:p-12 rounded-3xl shadow-surface mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <div className="text-start order-2 lg:order-1">
                <p className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-4">
                  {t('siteSelection.badge')}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark mb-6">
                  {t('siteSelection.title')}
                </h2>
                <p className="text-suitability-paragraph text-lg leading-relaxed mb-8">
                  {t('siteSelection.description')}
                </p>
                
                {/* Features List */}
                <div className="space-y-6">
                  {siteSelectionFeatures.map((fKey, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <FeatureIcon>
                        {siteSelectionIcons[fKey]}
                      </FeatureIcon>
                      <div>
                        <h4 className="font-bold text-gray-900">{t(`siteSelection.features.${fKey}.title`)}</h4>
                        <p className="text-gray-600 text-sm">{t(`siteSelection.features.${fKey}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Component */}
              <div className="order-1 lg:order-2 w-full flex items-center">
                 <ImageSlider images={[ssImg1, ssImg2, ssImg3, ssImg4]} />
              </div>

            </div>
          </div>

          {/* --- Product 2: Reports --- */}
          <div className="w-full max-w-[1200px] bg-card-background p-8 lg:p-12 rounded-3xl shadow-surface mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Slider Component (Alternating side) */}
              <div className="order-1 lg:order-1 w-full flex items-center">
                 <ImageSlider images={[repImg1, repImg2, repImg3, repImg4]} />
              </div>

              {/* Text Content */}
              <div className="text-start order-2 lg:order-2">
                <p className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-4">
                  {t('reports.badge')}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark mb-6">
                  {t('reports.title')}
                </h2>
                <p className="text-suitability-paragraph text-lg leading-relaxed mb-8">
                  {t('reports.description')}
                </p>
                
                {/* Features List */}
                <div className="space-y-6">
                  {reportsFeatures.map((fKey, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <FeatureIcon>
                        {reportsIcons[fKey]}
                      </FeatureIcon>
                      <div>
                        <h4 className="font-bold text-gray-900">{t(`reports.features.${fKey}.title`)}</h4>
                        <p className="text-gray-600 text-sm">{t(`reports.features.${fKey}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <ProductFaq />

          {/* --- Call to Action Section --- */}
          <div className="w-full max-w-[1200px] mb-24">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 rounded-2xl shadow-2xl shadow-gray-400/30 mx-auto flex items-center justify-center border border-gray-200 p-2">
                  <img 
                    src={syIcon}
                    alt={t('cta.appIconAlt')} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mb-8">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-4">
                  {t('cta.badge')}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-tight lg:leading-[48px] font-bold text-gray-900 mb-8 whitespace-pre-line">
                  {t('cta.title')}
                </h2>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="inline-block mt-4 w-[180px] h-[42px] py-2 px-4 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-action-btn-hover shadow-action-btn no-underline text-center"
                >
                  {t('cta.button')}
                </Link>
              </div>
            </div>
          </div>  
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
