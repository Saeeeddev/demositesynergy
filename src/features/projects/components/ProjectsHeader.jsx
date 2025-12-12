import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  BuildingOfficeIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const NewProjectButton = ({ navigate }) => {
  return (
    <button
      className="bg-primary-blue hover:bg-primary-light-blue text-white px-3 py-2 rounded-lg flex items-center transition-colors w-full sm:w-auto"
      onClick={() => navigate('/projects/new')}
    >
      <PlusIcon className="mr-1.5 h-5 w-5" />
      <span>New Project</span>
    </button>
  );
};

const ProjectsSearchPlaceholder = () => {
  const [showNote, setShowNote] = useState(false);

  const handleClick = () => {
    setShowNote(true);
    setTimeout(() => setShowNote(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 w-full md:max-w-lg">
      <div className="relative flex-grow">
        {/* Notification Tooltip */}
        {showNote && (
          <div className="absolute bottom-full mb-2 left-0 z-20 w-max px-2 py-1 text-[11px] font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
            Module coming in next update
            <div className="absolute top-full left-4 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}

        {/* Search Input Placeholder */}
        <div 
          onClick={handleClick}
          className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="pl-3 text-gray-400">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            readOnly // Prevents typing
            className="w-full py-2 px-2 bg-white border-0 focus:outline-none focus:ring-0 text-sm text-gray-500 cursor-pointer"
            placeholder="Search projects..."
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      
      {/* Label/Badge beside search */}
      <div className="flex-shrink-0">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
          Advanced Search & Edit available in next update
        </span>
      </div>
    </div>
  );
};

const ProjectsHeader = ({ projectStats }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6">
      {/* Top Header */}
      <div className="px-4 sm:px-6 py-5">
        {/* Title and Button Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-6 w-6 text-primary-blue mr-3" />
            <h2 className="text-xl font-medium text-gray-800">Project Management</h2>
          </div>
          <NewProjectButton navigate={navigate} />
        </div>

        {/* Search Bar Row with Label */}
        <ProjectsSearchPlaceholder />
      </div>
      
      {/* Full Project Statistics Banner */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-sm text-gray-500">Projects</div>
            <div className="mt-1 font-semibold text-gray-800 flex items-baseline flex-wrap">
              <span className="text-xl">{projectStats.total}</span>
              <div className="ml-2 text-xs flex flex-wrap gap-1 mt-1 sm:mt-0">
                <span className="px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded">
                  {projectStats.pending} Pending
                </span>
                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
                  {projectStats.inProgress} In Progress
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded">
                  {projectStats.completed} Completed
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Total Capacity</div>
            <div className="mt-1 font-semibold text-gray-800">
              <span className="text-xl">{projectStats.totalCapacity}</span>
              <span className="text-sm ml-1">MW</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Est. Generation</div>
            <div className="mt-1 font-semibold text-gray-800">
              <span className="text-xl">{(projectStats.estimatedGeneration / 1000).toFixed(1)}</span>
              <span className="text-sm ml-1">GWh/year</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="text-sm text-gray-500">Land Area</div>
            <div className="mt-1 font-semibold text-gray-800">
              <span className="text-xl">{projectStats.totalArea}</span>
              <span className="text-sm ml-1">hectares</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Avg. ROI</div>
            <div className="mt-1 font-semibold text-gray-800">
              <span className="text-xl">{(projectStats.avgROI || 0).toFixed(1)}</span>
              <span className="text-sm ml-1">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;