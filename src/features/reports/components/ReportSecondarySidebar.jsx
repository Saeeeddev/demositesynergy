import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp, IoDownloadOutline } from 'react-icons/io5';

const ReportSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: reports = [] } = useQuery({
    queryKey: ['recentReports'],
    queryFn: async () => (await api.get('/reports?_limit=5')).data
  });

  return (
    <div className="w-full pt-4">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Reports</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isOpen ? <IoChevronUp className="w-4 h-4 text-gray-400" /> : <IoChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-1">
          {reports.length > 0 ? (
            reports.map((report) => (
                <button 
                    key={report.id} 
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-all duration-200 text-left"
                >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-blue transition-colors truncate flex-1 pr-2">
                        {report.title}
                    </span>
                    <IoDownloadOutline className="w-4 h-4 text-gray-300 group-hover:text-primary-blue transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
                </button>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1">No recent reports.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportSecondarySidebar;