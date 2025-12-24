import React from 'react';
import { 
  PresentationChartLineIcon,
  InformationCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import useResultStore from '../../../../stores/useResultStore';

export default function ProjectOverviewSidebarPanel() {
  // Logic cleaned: Removed 'setContentView' and useEffect. 
  // Router now handles the page view.
  const activeTab = useResultStore(state => state.activeProjectTab);
  const setActiveTab = useResultStore(state => state.setProjectTab);

  const tabs = [
    { id: 'summary', label: 'خلاصه مدیریتی', icon: PresentationChartLineIcon },
    { id: 'basic-info', label: 'اطلاعات پایه', icon: InformationCircleIcon },
    { id: 'grid-infrastructure', label: 'شبکه و زیرساخت', icon: BoltIcon },
  ];

  return (
    <div className="flex-none w-full mb-6">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-right
                ${isActive 
                  ? 'bg-Sidebar-item-blue text-white shadow-sm' 
                  : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'}`}
            >
              <span className="text-base">
                <Icon className="w-5 h-5"/>
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
