import React from 'react';
import useResultStore from '../../../stores/useResultStore';
import { useProjectData } from '../hooks/useResultQueries';

import ProjectSummaryTab from '../components/ProjectOverview/Tabs/ProjectSummaryTab';
import BasicSiteInfoTab from '../components/ProjectOverview/Tabs/BasicSiteInfoTab';
import GridInfrastructureTab from '../components/ProjectOverview/Tabs/GridInfrastructureTab';

// Helper for status colors
const getValueClass = (value, type) => {
  if (type === 'performance') {
    if (value > 80) return 'text-green-600';
    if (value > 60) return 'text-yellow-600';
    return 'text-red-600';
  }
  if (type === 'status') {
    const v = value?.toLowerCase();
    if (v === 'good' || v === 'high' || v === 'low' || v === 'available') return 'text-green-600'; 
    if (v === 'fair' || v === 'medium') return 'text-yellow-600';
    return 'text-red-600';
  }
  return 'text-gray-800'; 
};

const ProjectOverviewPage = () => {
  const activeTab = useResultStore(state => state.activeProjectTab);
  const { data: siteData, isLoading, isError } = useProjectData();

  if (isLoading) {
    return <div className="flex h-full items-center justify-center text-gray-500">Loading Overview...</div>;
  }

  if (isError || !siteData) {
    return <div className="flex h-full items-center justify-center text-red-500">Failed to load project data.</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <ProjectSummaryTab summaryData={siteData.summaryData} solarResource={siteData.solarResource} />;
      
      case 'basic-info':
        return <BasicSiteInfoTab siteData={siteData} getValueClass={getValueClass} />;
        
      case 'grid-infrastructure':
        // We pass 'gridInfo' from the JSON to the 'gridData' prop of the component
        return <GridInfrastructureTab gridData={siteData.gridInfo} />;

      default:
        return <ProjectSummaryTab summaryData={siteData.summaryData} solarResource={siteData.solarResource} />;
    }
  };

  return (
    <div className="h-full w-full bg-gray-50/80 overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default ProjectOverviewPage;