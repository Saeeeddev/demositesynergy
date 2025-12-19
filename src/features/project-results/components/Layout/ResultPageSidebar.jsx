import React from 'react';
import {
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import useResultStore from '../../../../stores/useResultStore';

// Sub-components
import ProjectOverviewSidebarPanel from '../ProjectOverview/ProjectOverviewSidebarPanel';
import LayersSidebarPanel from '../Layers/LayersSidebarPanel';
import FinancialSidebarPanel from '../Financial/FinancialSidebarPanel';

export default function ResultPageSidebar() {
  // Use Global Store
  const { activePanel, setPanel, setContentView } = useResultStore();

  const tabs = [
    {
      id: 'layers',
      label: 'Layers',
      icon: <MapPinIcon className="w-5 h-5" />,
      contentView: 'layers-page'
    },
    {
      id: 'project-overview',
      label: 'Overview',
      icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
      contentView: 'project-overview'
    },
    {
      id: 'financial',
      label: 'Financial',
      icon: <BanknotesIcon className="w-5 h-5" />,
      contentView: 'financial-page'
    },
  ];

  const handleTabClick = (tab) => {
    setPanel(tab.id);
    setContentView(tab.contentView);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'layers':
        return <LayersSidebarPanel />;

      case 'project-overview':
        return <ProjectOverviewSidebarPanel />;

      case 'financial':
        return <FinancialSidebarPanel />;

      default:
        return null;
    }
  };

  return (
    <div className="w-[270px] h-full bg-white border-r border-gray-200 flex flex-col shrink-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Header Tabs */}
      <div className="flex items-center bg-gray-50 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activePanel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-1 transition-all duration-200 relative group outline-none focus:outline-none ${
                isActive
                  ? 'bg-white text-primary-blue'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
              }`}
            >
              <div className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                {tab.icon}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-blue rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300/80">
        <div className="p-4 min-h-full">
           {renderPanelContent()}
        </div>
      </div>
    </div>
  );
}
