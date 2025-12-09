import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectCard from './components/ProjectCard';
import Pagination from '../../components/common/Pagination';

// Data fetching function for TanStack Query
const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const projectStats = useMemo(() => {
    if (!projects || projects.length === 0) {
      return { total: 0, completed: 0, inProgress: 0, pending: 0, totalCapacity: 0, estimatedGeneration: 0, totalArea: 0, avgROI: 0 };
    }
    const total = projects.length;
    const totalCapacity = projects.reduce((sum, p) => sum + p.capacity, 0);
    const totalArea = projects.reduce((sum, p) => sum + p.area, 0);
    const totalROI = projects.reduce((sum, p) => sum + (p.metrics.roi || 0), 0);
    const avgROI = total > 0 ? totalROI / total : 0;
    // Simplified estimated generation for example purposes
    const estimatedGeneration = projects.reduce((sum, p) => sum + (p.capacity * 1800), 0);

    return { total, totalCapacity, totalArea, avgROI, estimatedGeneration };
  }, [projects]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  }, [projects, currentPage]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full p-8">
            <p>Loading projects...</p>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex items-center justify-center h-full p-8">
            <p className="text-red-600">Error fetching projects: {error.message}</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6">
      <ProjectsHeader projectStats={projectStats} />
      
      <div className="mt-8">
        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(projects.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">No Projects Found</h3>
            <p className="text-sm text-gray-500 mt-1">Start by creating a new project.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;