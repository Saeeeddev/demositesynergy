import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/layout/Sidebar';
import MobileHeader from '../components/layout/MobileHeader';
import BottomNavBar from '../components/layout/BottomNavBar';
import NotificationPanel from '../components/layout/NotificationPanel';
import UserProfilePanel from '../components/layout/UserProfilePanel';
import { useUIStore } from '../stores/useUIStore';

const DEMO_BANNER_DISMISSED_KEY = 'site-synergy-demo-banner-dismissed-v1';

const MainLayout = () => {
  const { isNotificationOpen, isProfileOpen, closeAllPanels } = useUIStore();
  const [showDemoBanner, setShowDemoBanner] = useState(() => {
    try { return localStorage.getItem(DEMO_BANNER_DISMISSED_KEY) !== 'true'; }
    catch { return true; }
  });

  const dismissDemoBanner = () => {
    setShowDemoBanner(false);
    try { localStorage.setItem(DEMO_BANNER_DISMISSED_KEY, 'true'); }
    catch { /* Keep the banner hidden until this page is reloaded. */ }
  };

  return (
    <div className="flex bg-white min-h-screen font-sans" dir="rtl">
      
      {/* 
        CLICK OUTSIDE LAYER: 
        A transparent fixed div that covers the screen behind the panels.
        Clicking it closes the active panel.
      */}
      {(isNotificationOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-[1900] bg-transparent cursor-default"
          onClick={closeAllPanels}
          aria-hidden="true"
        />
      )}

      {/* Sidebar appears on the Right (Start) in RTL */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen relative min-h-screen">
        <MobileHeader />
        
        {/* Main Content Area */}
        {/* md:pe-[10px] adds padding on the left side in RTL for the 'card' effect */}
        <main className="flex-1 flex flex-col min-h-0 p-0 md:pt-[10px] md:pe-[10px]">
          {/* 
             Outer Card: Keeps overflow-hidden to maintain rounded corners clipping 
             and external shadow consistency.
          */}
          <div className="bg-white md:rounded-[18px] md:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex-1 min-h-0 flex flex-col overflow-hidden relative border border-gray-200">
            {showDemoBanner && <div role="note" className="flex shrink-0 items-center justify-between gap-3 border-b border-amber-300 bg-amber-100 px-4 py-2.5 text-xs font-semibold leading-5 text-amber-950">
              <p className="flex-1 text-center">این نسخه آزمایشی است و داده‌های نمایش‌داده‌شده، از جمله داده‌های مالی، نمونه هستند.</p>
              <button type="button" onClick={dismissDemoBanner} aria-label="بستن پیام نسخه آزمایشی" className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-700">
                <XMarkIcon className="h-4 w-4" />
                <span>بستن</span>
              </button>
            </div>}
            <div className="w-full flex-1 min-h-0 overflow-y-auto relative custom-scrollbar">
              <Outlet />
            </div>

          </div>
        </main>
        
        <BottomNavBar />
      </div>

      {/* Panels (Z-Index 2000, above the click-outside layer) */}
      <AnimatePresence>
        {isNotificationOpen && (
          <>
            <NotificationPanel isMobile={true} />
            <NotificationPanel isMobile={false} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <UserProfilePanel isMobile={true} />
            <UserProfilePanel isMobile={false} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
