import React from 'react';
import {
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import useResultStore from '../../../../stores/useResultStore';

// Import the specific panels (assumed to be in place or coming in next batches)
import ProjectOverviewSidebarPanel from '../ProjectOverview/ProjectOverviewSidebarPanel';
import LayersSidebarPanel from '../Layers/LayersSidebarPanel';
import FinancialSidebarPanel from '../Financial/FinancialSidebarPanel';

export default function ResultPageSidebar() {
  const { activePanel, setPanel, setContentView } = useResultStore();

  const tabs = [
    {
      id: 'layers',
      label: 'لایه‌ها',
      icon: <MapPinIcon className="w-5 h-5" />,
      contentView: 'layers-page'
    },
    {
      id: 'project-overview',
      label: 'بررسی کلی',
      icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
      contentView: 'project-overview'
    },
    {
      id: 'financial',
      label: 'تحلیل مالی',
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
      case 'layers': return <LayersSidebarPanel />;
      case 'project-overview': return <ProjectOverviewSidebarPanel />;
      case 'financial': return <FinancialSidebarPanel />;
      default: return null;
    }
  };

  return (
    // RTL Style Change:
    // border-r -> border-e (border-end, which is Left in RTL)
    // The sidebar is on the Right, so the border should be on its Left.
    <div className="w-[280px] h-full bg-gray-50 border-e border-gray-200 flex flex-col shrink-0 transition-all duration-300">
      {/* Internal Tabs Row */}
      <div className="flex items-center justify-around p-2 border-b border-gray-200 bg-gray-100/50">
        {tabs.map((tab) => {
          const isActive = activePanel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              title={tab.label}
              className={`p-2.5 rounded-lg transition-all duration-200 relative group outline-none ${
                isActive
                  ? 'bg-white text-primary-blue shadow-sm ring-1 ring-black/5'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              {tab.icon}
            </button>
          );
        })}
      </div>

      {/* Internal Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-right">
         {renderPanelContent()}
      </div>
    </div>
  );
}
