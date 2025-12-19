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
    <div className="flex bg-white min-h-screen font-sans ">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen relative min-h-screen">
        <MobileHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-0 p-0 md:pt-[10px] md:pr-[10px]">
          {/* 
             Outer Card: Keeps overflow-hidden to maintain rounded corners clipping 
             and external shadow consistency.
          */}
          <div className="bg-white md:rounded-[18px] md:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] flex-1 flex flex-col overflow-hidden relative">
            
            {/* 
               FIX IS HERE: 
               Changed 'overflow-hidden' to 'overflow-y-auto'.
               This allows the Outlet (ProjectsPage) to scroll vertically 
               within this container.
            */}
            <div className="w-full h-full overflow-y-auto relative">
              <Outlet />
            </div>

          </div>
        </main>
        
        <BottomNavBar />
      </div>

      {/* Panels */}
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

