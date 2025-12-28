import React from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import ResultPageHeader from './ResultPageHeader';
import ResultPageSidebar from './ResultPageSidebar';
import { useProjectData } from '../../hooks/useResultQueries';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ResultPageLayout = () => {
  const navigate = useNavigate();
  // Get Project ID from URL
  const { id } = useParams();

  // --- CORE DATA CHECK ---
  // We fetch the main project data here. 
  // If this fails, we assume the project doesn't exist or user has no access.
  const { data: projectData, isLoading, isError, error } = useProjectData(id);

  const handleBack = () => {
    navigate('/projects'); 
  };

  // 1. Loading State (Full Page)
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-50 items-center justify-center space-y-4" dir="rtl">
        <div className="relative flex items-center justify-center h-16 w-16">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75 animate-ping"></span>
          <div className="relative h-12 w-12 rounded-full border-4 border-gray-200"></div>
          <div className="absolute h-12 w-12 rounded-full border-4 border-t-transparent border-r-transparent border-primary-blue animate-spin"></div>
        </div>
        <p className="text-gray-500 font-medium animate-pulse">در حال دریافت اطلاعات پروژه...</p>
      </div>
    );
  }

  // 2. Error State (Blocking Access)
  if (isError || !projectData) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-50 items-center justify-center p-6" dir="rtl">
         <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">پروژه یافت نشد</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              اطلاعاتی برای پروژه با شناسه <span className="font-mono bg-gray-100 px-1 rounded text-gray-700">{id}</span> در سیستم موجود نیست یا شما دسترسی لازم را ندارید.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs text-left text-gray-400 font-mono overflow-hidden">
                {error?.message || "Error 404: Resource Not Found"}
            </div>
            <button 
              onClick={handleBack}
              className="w-full py-2.5 bg-primary-blue hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4 transform scale-x-[-1]" />
              بازگشت به لیست پروژه‌ها
            </button>
         </div>
      </div>
    );
  }

  // 3. Success State - Render the Interface
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 overflow-hidden relative" dir="rtl">
      
      {/* Pass cached projectData to header to avoid refetching */}
      <ResultPageHeader projectId={id} projectData={projectData} onBack={handleBack} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <ResultPageSidebar />
        
        <div className="flex flex-1 min-w-0 relative h-full bg-gray-50/80">
           {/* Pass context to children */}
           <Outlet context={{ projectId: id, projectData }} />
        </div>
      </div>
    </div>
  );
};

export default ResultPageLayout;
