import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectCard from './components/ProjectCard';
import Pagination from '../../components/common/Pagination';

// Fetch function: Ensure sorting is DESCENDING by Date (Newest first)
const fetchProjects = async () => {
  const { data } = await api.get('/projects?_sort=createdDate&_order=desc');
  return data;
};

const fetchProjectStats = async () => {
    const { data } = await api.get('/projectStats');
    return data;
};

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch Projects List
  const { data: projects = [], isLoading: isLoadingProjects, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Fetch Header Stats
  const { data: projectStats = { total: 0, completed: 0, inProgress: 0, pending: 0, totalCapacity: 0, estimatedGeneration: 0, totalArea: 0, avgROI: 0 } } = useQuery({
      queryKey: ['projectStats'],
      queryFn: fetchProjectStats,
  });

  // Pagination Logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  }, [projects, currentPage]);

  if (isLoadingProjects) {
    return (
        <div className="flex items-center justify-center h-full p-8 text-gray-500 font-medium">
            در حال بارگذاری پروژه‌ها...
        </div>
    );
  }

  if (isError) {
    return (
        <div className="text-center py-10">
             <div className="text-red-500">خطا در بارگذاری پروژه‌ها: {error.message}</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-right" dir="rtl">
      {/* 1. Header with Stats */}
      <ProjectsHeader projectStats={projectStats} />
      
      {/* 2. Project Grid */}
      {/* 
          Grid Flow in RTL:
          First item (Newest) starts at the Top-Right.
          Subsequent items fill to the Left.
      */}
      {projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* 3. Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-800">پروژه‌ای یافت نشد</h3>
          <p className="text-sm text-gray-500 mt-1">هنوز پروژه‌ای ثبت نکرده‌اید.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
