import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import MobileHeader from '../components/layout/MobileHeader';
import BottomNavBar from '../components/layout/BottomNavBar';
import NotificationPanel from '../components/layout/NotificationPanel';
import UserProfilePanel from '../components/layout/UserProfilePanel';
import { useUIStore } from '../stores/useUIStore';

const MainLayout = () => {
  const { isNotificationOpen, isProfileOpen, closeAllPanels } = useUIStore();

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
          <div className="bg-white md:rounded-[18px] md:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex-1 flex flex-col overflow-hidden relative border border-gray-200">
            
            <div className="w-full h-full overflow-y-auto relative custom-scrollbar">
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
