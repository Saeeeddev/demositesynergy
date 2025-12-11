import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { IoChevronDown, IoChevronUp, IoEyeOutline } from 'react-icons/io5';

const ProjectSecondarySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: projects = [] } = useQuery({
    // Different key if we want specifically active ones, or same if we just want "Recent"
    queryKey: ['recentActiveProjects'], 
    queryFn: async () => (await api.get('/projects?status=in-progress&_limit=5&_sort=createdDate&_order=desc')).data
  });

  return (
    <div className="w-full pt-4">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Projects</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isOpen ? <IoChevronUp className="w-4 h-4 text-gray-400" /> : <IoChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-1">
          {projects.length > 0 ? (
            projects.map((project) => (
                <a 
                    href={`#`} 
                    key={project.id} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={(e) => e.preventDefault()} // prevent default for demo
                >
                    <div className="flex-1 min-w-0 pr-2">
                        <span className="block text-sm font-medium text-gray-700 group-hover:text-primary-blue transition-colors truncate">
                            {project.name}
                        </span>
                        <span className="block text-[10px] text-gray-400">
                            {project.reference}
                        </span>
                    </div>
                    <IoEyeOutline className="w-4 h-4 text-gray-300 group-hover:text-primary-blue transition-colors opacity-0 group-hover:opacity-100" />
                </a>
            ))
          ) : (
              <p className="text-xs text-gray-400 italic p-1">No active projects.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectSecondarySidebar;