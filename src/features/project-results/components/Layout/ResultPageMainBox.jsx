import React from 'react';
import useResultStore from '../../../../stores/useResultStore';

// Page Components
import ProjectOverviewPage from '../../pages/ProjectOverviewPage';
import LayersPage from '../../pages/LayersPage';
import FinancialPage from '../../pages/FinancialPage';

const ResultPageMainBox = () => {
  // Read View State
  const contentView = useResultStore((state) => state.contentView);

  const renderContent = () => {
    switch (contentView) {
      case 'project-overview':
        return <ProjectOverviewPage />;
      
      case 'financial-page':
        return <FinancialPage />;
      
      case 'layers-page':
        return <LayersPage />;

      default:
        // Default to Layers
        return <LayersPage />;
    }
  };

  const isMapView = contentView === 'layers-page';
  // If it's the map, we hide overflow to let Leaflet handle it. 
  // If it's data/financials, we allow the container to scroll.
  const mainContainerClass = `flex-1 bg-gray-50/80 ${isMapView ? 'overflow-hidden' : 'overflow-y-auto'}`;

  return (
    <main className={mainContainerClass}>
      {renderContent()}
    </main>
  );
};

export default ResultPageMainBox;
