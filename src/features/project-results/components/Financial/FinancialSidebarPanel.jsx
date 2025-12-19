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
    { id: 'dashboard', label: 'داشبورد و شاخص‌ها', icon: Squares2X2Icon },
    { id: 'capex', label: 'تحلیل هزینه‌های سرمایه‌ای', icon: ChartPieIcon }, // CAPEX
    { id: 'opex', label: 'تحلیل هزینه‌های عملیاتی', icon: CurrencyDollarIcon }, // OPEX
    { id: 'cashflow', label: 'جریان نقدینگی و ROI', icon: PresentationChartLineIcon },
    { id: 'sensitivity', label: 'تحلیل حساسیت', icon: ClipboardDocumentListIcon },
    { id: 'strategic', label: 'ریسک و SWOT', icon: ShieldExclamationIcon },
    { id: 'timeline', label: 'زمان‌بندی پروژه', icon: ClockIcon },
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
              // RTL: text-right aligns content to start (Right)
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-right
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
