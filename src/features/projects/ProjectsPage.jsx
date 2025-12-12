import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectCard from './components/ProjectCard';
import Pagination from '../../components/common/Pagination';

// Fetch function for Projects
const fetchProjects = async () => {
  const { data } = await api.get('/projects?_sort=createdDate&_order=desc');
  return data;
};

// Fetch function for Project Stats
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

  // Fetch Header Stats from DB
  // Removing default '0' values in initialData to allow UI to react to loaded data or loading state if preferred,
  // but keeping structure to prevent crash.
  const { data: projectStats = { total: 0, completed: 0, inProgress: 0, pending: 0, totalCapacity: 0, estimatedGeneration: 0, totalArea: 0, avgROI: 0 } } = useQuery({
      queryKey: ['projectStats'],
      queryFn: fetchProjectStats,
  });

  // Client-side pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  }, [projects, currentPage]);

  if (isLoadingProjects) {
    return (
        <div className="flex items-center justify-center h-full p-8 text-gray-500 font-medium">
            Loading...
        </div>
    );
  }

  if (isError) {
    return (
        <div className="text-center py-10">
             <div className="text-red-500">Error loading projects: {error.message}</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      {/* 1. Header with Stats (fetched from DB) */}
      <ProjectsHeader projectStats={projectStats} />
      
      {/* 2. Project Grid */}
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
          <h3 className="text-lg font-medium text-gray-800">No Projects Found</h3>
          <p className="text-sm text-gray-500 mt-1">Please adjust your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;