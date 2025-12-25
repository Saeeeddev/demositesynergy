import React from 'react';
import { useOutletContext } from 'react-router-dom';
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
    const v = value?.toLowerCase();
    if (v === 'good' || v === 'high' || v === 'low' || v === 'available') return 'text-green-600'; 
    if (v === 'fair' || v === 'medium') return 'text-yellow-600';
    return 'text-red-600';
  }
  return 'text-gray-800'; 
};

const ProjectOverviewPage = () => {
  // Get ID from the Layout context
  const { projectId } = useOutletContext();
  
  const activeTab = useResultStore(state => state.activeProjectTab);
  
  // Pass the ID to the hook
  const { data: siteData, isLoading, isError } = useProjectData(projectId);

  if (isLoading) {
    return (
        <div className="flex h-full items-center justify-center bg-gray-50">
             <div className="text-gray-500 animate-pulse">در حال بارگذاری بررسی کلی ({projectId})...</div>
        </div>
    );
  }

  // Handle case where project exists but results haven't been generated yet
  if (isError || !siteData) {
    return (
        <div className="flex flex-col h-full items-center justify-center bg-gray-50 text-center p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">اطلاعاتی یافت نشد</h3>
            <p className="text-gray-500 text-sm max-w-md">
                هنوز داده‌های تحلیلی برای این پروژه محاسبه نشده‌اند یا در سیستم موجود نیستند.
            </p>
        </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <ProjectSummaryTab summaryData={siteData.summaryData} solarResource={siteData.solarResource} />;
      case 'basic-info':
        return <BasicSiteInfoTab siteData={siteData} getValueClass={getValueClass} />;
      case 'grid-infrastructure':
        // Safe access to gridInfo in case it's missing in some JSON entries
        return <GridInfrastructureTab gridData={siteData.gridInfo || {}} />;
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

