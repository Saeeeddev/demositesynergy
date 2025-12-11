import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectCard from './components/ProjectCard';
import Pagination from '../../components/common/Pagination';

// Fetch function
const fetchProjects = async () => {
  const { data } = await api.get('/projects?_sort=createdDate&_order=desc');
  return data;
};

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Calculate stats for the Header based on ALL fetched projects
  const projectStats = useMemo(() => {
    if (!projects || projects.length === 0) {
      return { total: 0, completed: 0, inProgress: 0, pending: 0, totalCapacity: 0, estimatedGeneration: 0, totalArea: 0, avgROI: 0 };
    }
    
    const completedProjects = projects.filter(p => p.status === 'completed');
    const total = projects.length;
    const inProgress = projects.filter(p => p.status === 'in-progress').length;
    const completed = completedProjects.length;
    const pending = projects.filter(p => p.status === 'pending').length;
    
    // Aggregations
    const totalCapacity = projects.reduce((sum, p) => sum + (parseFloat(p.capacity) || 0), 0);
    const totalArea = projects.reduce((sum, p) => sum + (parseFloat(p.area) || 0), 0);
    
    // ROI Calculation (average of completed only, or all if none completed)
    const roiSource = completed > 0 ? completedProjects : projects;
    const totalROI = roiSource.reduce((sum, p) => sum + (p.metrics?.roi || 0), 0);
    const avgROI = roiSource.length > 0 ? totalROI / roiSource.length : 0;

    // Estimation: If backend provides estimatedGen use it, otherwise simple formula capacity * 1800h
    const estimatedGeneration = projects.reduce((sum, p) => {
        const val = p.metrics?.estimatedGeneration ? p.metrics.estimatedGeneration : (p.capacity || 0) * 1800;
        return sum + val;
    }, 0);

    return {
      total,
      completed,
      inProgress,
      pending,
      totalCapacity,
      totalArea,
      estimatedGeneration,
      avgROI
    };
  }, [projects]);

  // Client-side pagination logic
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  }, [projects, currentPage]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full p-8 text-gray-500 font-medium">
            Loading Project Data...
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="bg-red-50 p-4 rounded-lg text-red-700 border border-red-100 text-sm">
                Error fetching projects: {error.message}
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Header with Stats and Filters */}
      <ProjectsHeader projectStats={projectStats} />
      
      {/* 2. Project Grid */}
      <div className="mt-2 flex-grow">
        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* 3. Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(projects.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Projects Found</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">Get started by creating a new feasibility study for your next renewable energy site.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;