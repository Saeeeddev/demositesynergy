import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useResultStore from '../../../stores/useResultStore';
import { useFinancialData } from '../hooks/useResultQueries';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import DashboardTab from '../components/Financial/Tabs/DashboardTab';
import CapexTab from '../components/Financial/Tabs/CapexTab';
import OpexTab from '../components/Financial/Tabs/OpexTab';
import CashFlowTab from '../components/Financial/Tabs/CashFlowTab';
import SensitivityTab from '../components/Financial/Tabs/SensitivityTab';
import StrategicTab from '../components/Financial/Tabs/StrategicTab';
import TimelineTab from '../components/Financial/Tabs/TimelineTab';

const FinancialPage = () => {
  // Get ID from the Layout context
  const { projectId } = useOutletContext();
  const activeTab = useResultStore(state => state.activeFinancialTab);
  
  // Use specialized hook for financials
  const { data: financialData, isLoading, isError } = useFinancialData(projectId);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
             <div className="h-1.5 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-blue animate-[loading_1s_ease-in-out_infinite] w-1/2"></div>
             </div>
             <div className="text-sm font-medium text-gray-500 animate-pulse">در حال محاسبه مدل مالی...</div>
        </div>
      </div>
    );
  }

  // 2. Error / Empty Data State
  if (isError || !financialData || !financialData.kpi) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-sm">
           <div className="mx-auto w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
              <ExclamationCircleIcon className="w-6 h-6 text-amber-500" />
           </div>
           <h3 className="text-gray-800 font-bold mb-2">داده‌های مالی موجود نیست</h3>
           <p className="text-sm text-gray-500 leading-relaxed">
             برای این پروژه هنوز تحلیل مالی انجام نشده است یا ورودی‌ها کافی نیستند. لطفاً ورودی‌های پروژه را بررسی کنید.
           </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab data={financialData} />; 
      case 'capex': return <CapexTab data={financialData} />;
      case 'opex': return <OpexTab data={financialData} />;
      case 'cashflow': return <CashFlowTab data={financialData} />;
      case 'sensitivity': return <SensitivityTab data={financialData} />;
      case 'strategic': return <StrategicTab data={financialData} />;
      case 'timeline': return <TimelineTab data={financialData} />;
      default: return <DashboardTab data={financialData} />; 
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full overflow-auto min-h-full bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200" dir="rtl">
      {renderContent()}
    </div>
  );
};

export default FinancialPage;
