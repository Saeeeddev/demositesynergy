import React from 'react';
import useResultStore from '../../../stores/useResultStore';
import { useProjectData } from '../hooks/useResultQueries';

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
    // Check against English values from DB to ensure styling works
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
    return <div className="flex h-full items-center justify-center text-gray-500">در حال بارگذاری بررسی کلی...</div>;
  }

  if (isError || !siteData) {
    return <div className="flex h-full items-center justify-center text-red-500">خطا در بارگذاری داده‌های پروژه.</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <ProjectSummaryTab summaryData={siteData.summaryData} solarResource={siteData.solarResource} />;
      case 'basic-info':
        return <BasicSiteInfoTab siteData={siteData} getValueClass={getValueClass} />;
      case 'grid-infrastructure':
        return <GridInfrastructureTab gridData={siteData.gridInfo} />;
      default:
        return <ProjectSummaryTab summaryData={siteData.summaryData} solarResource={siteData.solarResource} />;
    }
  };

  return (
    <div className="h-full w-full bg-gray-50/80">
      {renderContent()}
    </div>
  );
};

export default ProjectOverviewPage;
