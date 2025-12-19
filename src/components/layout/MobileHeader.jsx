import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../stores/useUIStore';

const BellIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;

const MobileHeader = () => {
  const { isNotificationOpen, toggleNotifications, isProfileOpen, toggleProfile } = useUIStore();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerHeight = 60;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If at top or scrolling up, show. If scrolling down past height, hide.
      if (currentScrollY < headerHeight) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="md:hidden sticky top-0 z-40 bg-white shadow-sm w-full h-[60px] px-4 flex items-center justify-between"
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      dir="rtl"
    >
      <div className="h-[36px]">
        <img 
            src="src/assets/images/sitesynergy_logo_colored.png" 
            alt="SiteSynergy Logo" 
            className="h-full object-contain" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x36/cccccc/333333?text=Logo'; }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button 
            onClick={toggleNotifications} 
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative ${isNotificationOpen ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          </button>
        </div>
        <div className="relative">
          <button 
            onClick={toggleProfile} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <img src="https://placehold.co/40x40/a78bfa/ffffff?text=S" alt="User profile" className="w-8 h-8 rounded-full"/>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default MobileHeader;