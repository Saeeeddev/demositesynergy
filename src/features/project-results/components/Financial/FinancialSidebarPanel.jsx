import React, { useEffect } from 'react';
import { 
  PresentationChartLineIcon, 
  CurrencyDollarIcon, 
  ChartPieIcon, 
  ClipboardDocumentListIcon,
  ClockIcon,
  ShieldExclamationIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/outline';
import useResultStore from '../../../../stores/useResultStore';

export default function FinancialSidebarPanel() {
  const activeTab = useResultStore(state => state.activeFinancialTab);
  const setActiveTab = useResultStore(state => state.setFinancialTab);
  const setContentView = useResultStore(state => state.setContentView);

  // Ensure the main view renders the financial page when this sidebar is active
  useEffect(() => {
    setContentView('financial-page');
  }, [setContentView]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard & KPIs', icon: Squares2X2Icon },
    { id: 'capex', label: 'CAPEX Breakdown', icon: ChartPieIcon },
    { id: 'opex', label: 'OPEX Analysis', icon: CurrencyDollarIcon },
    { id: 'cashflow', label: 'Cash Flow & ROI', icon: PresentationChartLineIcon },
    { id: 'sensitivity', label: 'Sensitivity Analysis', icon: ClipboardDocumentListIcon },
    { id: 'strategic', label: 'SWOT & Risk', icon: ShieldExclamationIcon },
    { id: 'timeline', label: 'Project Timeline', icon: ClockIcon },
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left
                ${isActive 
                  ? 'bg-Sidebar-item-blue text-white shadow-sm' 
                  : 'text-gray-600 hover:text-primary-blue hover:bg-gray-100'}`}
            >
              <span className="text-base">
                <Icon className="w-5 h-5" />
              </span>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
