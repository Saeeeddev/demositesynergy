import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp, IoEyeOutline } from 'react-icons/io5';

const HomeSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  const { data: recentProjects = [] } = useQuery({
    queryKey: ['recentProjects'],
    queryFn: async () => {
      const { data } = await api.get('/recentProjects'); 
      return data;
    }
  });

  // Handler to navigate to project result page
  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}/result`);
  };

  return (
    <div className="w-full pt-4">
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
                    // Add onClick handler here
                    onClick={() => handleProjectClick(project.id)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-all duration-200"
                >
                <div className="flex-1 min-w-0 pe-2">
                    <span className="block text-sm font-medium text-gray-700 group-hover:text-primary-blue transition-colors truncate text-right">
                        {project.name}
                    </span>
                    <span className="block text-[10px] text-gray-400 text-right">
                        {new Date(project.createdDate).toLocaleDateString('fa-IR')}
                    </span>
                </div>
                <IoEyeOutline className="w-4 h-4 text-gray-300 group-hover:text-primary-blue transition-colors opacity-0 group-hover:opacity-100" />
                </div>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1">پروژه‌ای یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSecondarySidebar;
