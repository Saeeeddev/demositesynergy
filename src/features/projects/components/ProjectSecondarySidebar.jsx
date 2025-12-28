import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp, IoEyeOutline } from 'react-icons/io5';

const ProjectSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // FIX: Fetch from real 'projects' collection, sorted by date (newest first), limit 5
  const { data: recentProjects = [] } = useQuery({
    queryKey: ['projects', 'recent'], // Unique key for caching
    queryFn: async () => {
      // Fetching real projects dynamically
      const { data } = await api.get('/projects?_sort=createdDate&_order=desc&_limit=5'); 
      return data;
    }
  });

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}/result`);
  };

  return (
    <div className="w-full pt-4 text-right" dir="rtl">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">پروژه‌های اخیر</h3>
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <IoChevronUp className="w-4 h-4 text-gray-400" /> : <IoChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-1">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => handleProjectClick(project.id)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-all duration-200"
                >
                    <div className="flex-1 min-w-0 ps-2">
                        <span className="block text-sm font-medium text-gray-700 group-hover:text-primary-blue transition-colors truncate text-right">
                            {project.name}
                        </span>
                        <div className="flex justify-between items-center mt-0.5">
                           <span className="block text-[10px] text-gray-400">
                               {new Date(project.createdDate).toLocaleDateString('fa-IR')}
                           </span>
                        </div>
                    </div>
                    {/* Icon on the Left (End) */}
                    <IoEyeOutline className="w-4 h-4 text-gray-300 group-hover:text-primary-blue transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
                </div>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1 text-right">پروژه‌ای یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectSecondarySidebar;
