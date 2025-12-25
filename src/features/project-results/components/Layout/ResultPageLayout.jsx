import React from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import ResultPageHeader from './ResultPageHeader';
import ResultPageSidebar from './ResultPageSidebar';

const ResultPageLayout = () => {
  const navigate = useNavigate();
  // Get Project ID from URL (defined in Router as :id)
  const { id } = useParams();

  const handleBack = () => {
    navigate('/projects'); 
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 overflow-hidden relative" dir="rtl">
      
      {/* Pass projectId to Header for its own data fetching */}
      <ResultPageHeader projectId={id} onBack={handleBack} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <ResultPageSidebar />
        
        {/* Main Content Area using Outlet for Nested Routes */}
        <div className="flex flex-1 min-w-0 relative h-full bg-gray-50/80">
           {/* 
              Pass the projectId down to children (Map, Overview, Financial) 
              using Outlet Context so they don't have to all run useParams().
           */}
           <Outlet context={{ projectId: id }} />
        </div>

      </div>
    </div>
  );
};

export default ResultPageLayout;
