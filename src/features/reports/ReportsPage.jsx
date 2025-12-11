import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
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
  
  // Restricted Feature State
  const [showNote, setShowNote] = useState(false);
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
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6">
      
      {/* --- Header Section --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-primary-blue/10 rounded-lg mr-3">
             <DocumentTextIcon className="h-6 w-6 text-primary-blue" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Report Repository</h2>
        </div>
        
        {/* Search & Filter Toolbar */}
        <div className="relative">
            {/* Notification Tooltip */}
            {showNote && (
                <div className="absolute bottom-full left-10 mb-2 z-20 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
                    Search & Sort available in next update
                    <div className="absolute top-full left-4 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md" onClick={handleRestrictedAction}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        readOnly 
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-gray-400 focus:outline-none" 
                        placeholder="Search reports..." 
                    />
                </div>
                <div className="flex-shrink-0">
                    <button 
                        onClick={handleRestrictedAction}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Sort by Date
                        <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- Grid Content --- */}
      {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading reports...</div>
      ) : paginatedReports.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginatedReports.map((report) => (
              <div key={report.id} className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
                {/* Colored Header Area */}
                <div className={`h-24 w-full ${getThumbnailBgColor(report.type)} relative group-hover:opacity-90 transition-opacity`}></div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4" title={report.title}>{report.title}</h3>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-6 flex-grow">
                     <div className="flex items-center">
                        <UserCircleIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{report.author}</span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                     </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all">
                    <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1.5" />
                    Download PDF
                  </button>
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
        <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No reports found.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;