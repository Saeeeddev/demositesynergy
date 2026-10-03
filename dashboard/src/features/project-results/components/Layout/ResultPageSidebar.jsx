import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

// Import Panels
import ProjectOverviewSidebarPanel from '../ProjectOverview/ProjectOverviewSidebarPanel';
import LayersSidebarPanel from '../Layers/LayersSidebarPanel';
import FinancialSidebarPanel from '../Financial/FinancialSidebarPanel';
import { getProjectLocation } from '../../lib/projectLocation';

export default function ResultPageSidebar({ projectData }) {
  const location = useLocation();

  // Determine which panel content to show based on current URL path
  const renderPanelContent = () => {
    const path = location.pathname;
    if (path.includes('/map')) return <LayersSidebarPanel hasSelectedLocation={!!getProjectLocation(projectData, projectData?.id)} />;
    if (path.includes('/overview')) return <ProjectOverviewSidebarPanel />;
    if (path.includes('/financial')) return <FinancialSidebarPanel />;
    return <LayersSidebarPanel hasSelectedLocation={!!getProjectLocation(projectData, projectData?.id)} />;
  };

  const tabs = [
    { id: 'map', label: 'لایه‌ها', icon: <MapPinIcon className="w-5 h-5" />, path: 'map' },
    { id: 'overview', label: 'بررسی کلی', icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />, path: 'overview' },
    { id: 'financial', label: 'تحلیل مالی', icon: <BanknotesIcon className="w-5 h-5" />, path: 'financial' },
  ];

  return (
    <div className="w-[280px] h-full bg-gray-50 border-e border-gray-200 flex flex-col shrink-0 transition-all duration-300 z-10">
      
      {/* Navigation Tabs */}
      <div className="flex items-center justify-around p-2 border-b border-gray-200 bg-gray-100/50">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            title={tab.label}
            className={({ isActive }) => `
              p-2.5 rounded-lg transition-all duration-200 relative group outline-none
              ${isActive
                ? 'bg-white text-primary-blue shadow-sm ring-1 ring-black/5'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/60'
              }
            `}
          >
            {tab.icon}
          </NavLink>
        ))}
      </div>

      {/* Internal Content Area (Sub-menus like Layers list) */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-right">
         {renderPanelContent()}
      </div>
    </div>
  );
}
