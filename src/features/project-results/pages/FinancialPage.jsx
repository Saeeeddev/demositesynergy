import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useResultStore from '../../../stores/useResultStore';
import { useFinancialData } from '../hooks/useResultQueries';

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
  
  // Pass the ID to the hook
  const { data: financialData, isLoading, isError } = useFinancialData(projectId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
             <div className="h-2 w-24 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-primary-blue animate-[loading_1s_ease-in-out_infinite]"></div>
             </div>
             <div className="text-sm font-medium text-gray-500">در حال بارگذاری مدل مالی...</div>
        </div>
      </div>
    );
  }

  if (isError || !financialData) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-sm font-medium text-red-500">
           خطا در بارگذاری داده‌های مالی برای پروژه {projectId}.
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
    <div className="p-4 sm:p-6 min-h-full bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200" dir="rtl">
      {renderContent()}
    </div>
  );
};

export default FinancialPage;
