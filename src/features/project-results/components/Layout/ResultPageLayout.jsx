import React, { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultPageHeader from './ResultPageHeader';
import ResultPageSidebar from './ResultPageSidebar';
import ResultPageMainBox from './ResultPageMainBox';
import useResultStore from '../../../../stores/useResultStore';

const ContentLoading = () => (
  <div className="flex h-full w-full items-center justify-center bg-gray-50">
    <div className="animate-pulse text-sm text-gray-400">Loading Result Module...</div>
  </div>
);

const ResultPageLayout = () => {
  const navigate = useNavigate();
  const activePanel = useResultStore((state) => state.activePanel);

  useEffect(() => {
    // Trigger resize for map when panels shift
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [activePanel]);

  const handleBack = () => {
    navigate('/projects'); 
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 overflow-hidden relative">
      
      <ResultPageHeader onBack={handleBack} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar is fixed width, so it won't be affected by parent flex issues */}
        <ResultPageSidebar />
        
        {/* Main Content takes remaining space */}
        <div className="flex flex-1 min-w-0 relative h-full">
          <Suspense fallback={<ContentLoading />}>
            <ResultPageMainBox />
          </Suspense>
        </div>

      </div>
    </div>
  );
};

export default ResultPageLayout;
