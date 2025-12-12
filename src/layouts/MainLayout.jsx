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
  const { isNotificationOpen, isProfileOpen } = useUIStore();

  return (
    <div className="flex bg-white min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen relative min-h-screen">
        <MobileHeader />
        
        {/* Main Content Area - matches MainContent.jsx structure from old version */}
        <main className="flex-1 flex flex-col min-h-0 p-0 md:pt-[10px] md:pr-[10px]">
          <div className="bg-white md:rounded-[18px] md:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex-1 flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
              <Outlet />
            </div>
          </div>
        </main>
        
        <BottomNavBar />
      </div>

      {/* Panels (Profile/Notifications) */}
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