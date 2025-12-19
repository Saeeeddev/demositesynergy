import React from 'react';
import useResultStore from '../../../../stores/useResultStore';

// Page Components
import ProjectOverviewPage from '../../pages/ProjectOverviewPage';
import LayersPage from '../../pages/LayersPage';
import FinancialPage from '../../pages/FinancialPage';

const ResultPageMainBox = () => {
  const contentView = useResultStore((state) => state.contentView);

  const renderContent = () => {
    switch (contentView) {
      case 'project-overview': return <ProjectOverviewPage />;
      case 'financial-page': return <FinancialPage />;
      case 'layers-page': return <LayersPage />;
      default: return <LayersPage />;
    }
  };

  const isMapView = contentView === 'layers-page';
  
  // FIX: Using 'h-full' ensures the container fills the parent flex item.
  // 'overflow-y-auto' enables scrolling for content pages.
  // 'overflow-hidden' for map prevents double scrollbars.
  const mainContainerClass = `w-full h-full bg-gray-50/80 relative ${
    isMapView ? 'overflow-hidden' : 'overflow-y-auto'
  }`;

  return (
    <main className={mainContainerClass}>
      {renderContent()}
    </main>
  );
};

export default ResultPageMainBox;
