import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/localData';
import Pagination from '../../components/common/Pagination';
import { 
  DocumentTextIcon, 
  MagnifyingGlassIcon, 
  ClockIcon, 
  UserCircleIcon, 
  ArrowDownTrayIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

const getThumbnailBgColor = (type) => {
    switch (type) {
      case 'technical': return 'bg-blue-50';
      case 'financial': return 'bg-emerald-50';
      case 'environmental': return 'bg-teal-50';
      case 'comprehensive': return 'bg-sky-50';
      default: return 'bg-gray-50';
    }
};

const ReportsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  // Notification State
  const [showNote, setShowNote] = useState(false);

  // Handler for restricted interactions
  const handleRestrictedAction = () => {
      setShowNote(true);
      setTimeout(() => setShowNote(false), 2000);
  };

  const { data: reports = [], isLoading } = useQuery({ 
      queryKey: ['reports'], 
      queryFn: async () => (await api.get('/reports')).data 
  });
  
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = reports.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6 text-right" dir="rtl">
      
      {/* --- Main Container --- */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center">
            {/* Changed mr-3 to ms-3 */}
            <DocumentTextIcon className="h-6 w-6 text-primary-blue ms-3" />
            <h2 className="text-xl font-medium text-gray-800">مخزن گزارش‌ها</h2>
          </div>
        </div>
        
        {/* Toolbar Section */}
        <div className="mb-6 relative">
            {/* Notification Tooltip */}
            {showNote && (
                <div className="absolute bottom-full right-1/4 mb-2 z-20 w-max px-2 py-1 text-[11px] font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
                    امکان جستجو و فیلتر در بروزرسانی بعدی
                    <div className="absolute top-full right-4 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:max-w-2xl">
                    {/* Restricted Search */}
                    <div 
                        className="relative w-full md:max-w-xs cursor-pointer"
                        onClick={handleRestrictedAction}
                    >
                        {/* Icon on Right (Start) */}
                        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            readOnly
                            placeholder="جستجو در گزارش‌ها..."
                            className="ps-10 pe-4 py-2 block w-full rounded-lg border border-gray-300 focus:border-gray-300 focus:ring-0 text-sm cursor-pointer bg-white text-right"
                        />
                    </div>
                    
                    {/* Badge Label */}
                    <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            جستجو و فیلتر پیشرفته بزودی
                        </span>
                    </div>
                </div>
                
                {/* Restricted Sort Dropdown */}
                <div className="flex justify-end">
                    <div className="relative inline-block text-left w-full sm:w-auto">
                        <div>
                            <button
                                type="button"
                                onClick={handleRestrictedAction}
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                مرتب‌سازی بر اساس تاریخ
                                <ChevronDownIcon className="-me-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
            <div className="text-center py-12 text-gray-500">در حال دریافت گزارش‌ها...</div>
        ) : paginatedReports.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {paginatedReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex flex-col">
                  {/* Colored Header Area */}
                  <div className={`h-24 rounded-t-lg relative ${getThumbnailBgColor(report.type)}`}>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 h-10">{report.title}</h3>
                    
                    <div className="space-y-2 text-xs text-gray-500 mb-4 flex-grow">
                       <div className="flex items-center">
                        <UserCircleIcon className="h-4 w-4 ms-0 me-2" />
                        <span>{report.author}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 ms-0 me-2" />
                        {/* Persian Date */}
                        <span>{new Date(report.date).toLocaleDateString('fa-IR')}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <button className="w-full px-4 py-2 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <ArrowDownTrayIcon className="h-4 w-4 ms-1.5" />
                        دانلود
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </>
        ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">گزارشی یافت نشد</h3>
                <p className="text-sm text-gray-500 mt-1">لطفاً پارامترهای جستجو را تغییر دهید.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;