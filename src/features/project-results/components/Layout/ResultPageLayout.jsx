import React, { useEffect } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import ResultPageHeader from './ResultPageHeader';
import ResultPageSidebar from './ResultPageSidebar';

const ResultPageLayout = () => {
  const navigate = useNavigate();
  // We can access URL params here if needed
  // const { id } = useParams(); 

  const handleBack = () => {
    navigate('/projects'); 
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 overflow-hidden relative" dir="rtl">
      
      <ResultPageHeader onBack={handleBack} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar now uses NavLinks */}
        <ResultPageSidebar />
        
        {/* Main Content Area using Outlet for Nested Routes */}
        <div className="flex flex-1 min-w-0 relative h-full bg-gray-50/80">
           {/* Suspense is already handled in the Router config, but safe to add here if needed specific transitions */}
           <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ResultPageLayout;
