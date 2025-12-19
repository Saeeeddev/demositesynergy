import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultPageMainBox from './ResultPageMainBox';
import ResultPageSidebar from './ResultPageSidebar';
import ResultPageHeader from './ResultPageHeader';
import useResultStore from '../../../../stores/useResultStore';

const ResultPageLayout = () => {
  const navigate = useNavigate();
  const activePanel = useResultStore((state) => state.activePanel);

  // Trigger window resize event when layout changes 
  // This is crucial for Leaflet to recalculate map size correctly
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [activePanel]);

  const handleBack = () => {
    navigate('/projects'); // Return to project list
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-100">
      <ResultPageHeader onBack={handleBack} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ResultPageSidebar />
        
        {/* Main Content Area */}
        <div className="flex flex-1 min-w-0 relative">
          <ResultPageMainBox />
        </div>
      </div>
    </div>
  );
};

export default ResultPageLayout;