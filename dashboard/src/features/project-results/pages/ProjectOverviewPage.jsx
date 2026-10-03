import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useResultStore from '../../../stores/useResultStore';

import ProjectSummaryTab from '../components/ProjectOverview/Tabs/ProjectSummaryTab';
import BasicSiteInfoTab from '../components/ProjectOverview/Tabs/BasicSiteInfoTab';
import GridInfrastructureTab from '../components/ProjectOverview/Tabs/GridInfrastructureTab';

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
  // Get Data directly from Layout Context (No re-fetch needed)
  // This ensures we show exactly what the Layout validated.
  const { projectData } = useOutletContext();
  const activeTab = useResultStore(state => state.activeProjectTab);
  
  // Since Layout handles Error/Loading, projectData is guaranteed here.
  // However, specific fields inside it might be missing depending on JSON structure.
  
  // Safety check for empty object
  if (!projectData) return null;

  // Use the fetched data
  const siteData = projectData;

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
            <ProjectSummaryTab 
                summaryData={siteData.summaryData} 
                solarResource={siteData.solarResource} 
            />
        );
      case 'basic-info':
        return (
            <BasicSiteInfoTab 
                siteData={siteData} 
                getValueClass={getValueClass} 
            />
        );
      case 'grid-infrastructure':
        return (
            <GridInfrastructureTab 
                gridData={siteData.gridInfo || {}} 
            />
        );
      default:
        return (
            <ProjectSummaryTab 
                summaryData={siteData.summaryData} 
                solarResource={siteData.solarResource} 
            />
        );
    }
  };

  return (
    <div className="h-full w-full bg-gray-50/80">
      {renderContent()}
    </div>
  );
};

export default ProjectOverviewPage;

