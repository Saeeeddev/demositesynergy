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
      onClick={() => navigate('/projects/new')}
      className="bg-primary-blue hover:bg-primary-blue/90 text-white px-4 py-2 rounded-lg flex items-center transition-all shadow-sm hover:shadow w-full sm:w-auto text-sm font-medium"
    >
      <PlusIcon className="mr-1.5 h-5 w-5" />
      <span>New Project</span>
    </button>
  );
};

// Re-implemented Search with a side label tooltip logic
const ProjectsSearchPlaceholder = () => {
  const [showNote, setShowNote] = useState(false);

  const handleClick = () => {
    setShowNote(true);
    setTimeout(() => setShowNote(false), 2000);
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 w-full md:max-w-lg">
      <div className="relative flex-grow">
        {/* Notification Tooltip */}
        {showNote && (
          <div className="absolute bottom-full mb-2 left-0 z-20 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded shadow-lg animate-fade-in-up">
            Module coming in next update
            <div className="absolute top-full left-4 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}

        {/* Search Input Placeholder */}
        <div 
          onClick={handleClick}
          className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
        >
          <div className="pl-3 text-gray-400">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            readOnly
            className="w-full py-2.5 px-3 bg-white border-0 focus:outline-none focus:ring-0 text-sm text-gray-500 cursor-pointer placeholder-gray-400"
            placeholder="Search projects by name, region, or manager..."
          />
        </div>
      </div>
      
      {/* Label/Badge beside search */}
      <div className="flex-shrink-0">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
          Advanced Search available in next update
        </span>
      </div>
    </div>
  );
};

const ProjectsHeader = ({ projectStats }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm rounded-xl mb-8 border border-gray-200/60 overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-5">
        {/* Title and Button Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div className="p-2 bg-primary-blue/10 rounded-lg mr-3">
               <BuildingOfficeIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Project Management</h2>
              <p className="text-xs text-gray-500 mt-0.5">Overview of all active and archival sites</p>
            </div>
          </div>
          <NewProjectButton navigate={navigate} />
        </div>

        {/* Search Bar Row */}
        <ProjectsSearchPlaceholder />
      </div>
      
      {/* Full Project Statistics Banner */}
      <div className="bg-gray-50/50 border-t border-gray-100 px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
          
          {/* Col 1: Total & Breakdown */}
          <div className="col-span-2 sm:col-span-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Projects</div>
            <div className="mt-1 flex items-baseline flex-wrap gap-2">
              <span className="text-2xl font-bold text-gray-900">{projectStats.total}</span>
              <div className="flex gap-1.5">
                {projectStats.inProgress > 0 && (
                    <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] border border-amber-100 font-medium">
                    {projectStats.inProgress} Active
                    </span>
                )}
                {projectStats.completed > 0 && (
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] border border-emerald-100 font-medium">
                    {projectStats.completed} Done
                    </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Col 2: Capacity */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Capacity</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{projectStats.totalCapacity.toLocaleString()}</span>
              <span className="text-xs text-gray-500 ml-1 font-medium">MW</span>
            </div>
          </div>
          
          {/* Col 3: Generation */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Generation</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{(projectStats.estimatedGeneration / 1000).toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1 font-medium">GWh/yr</span>
            </div>
          </div>
          
          {/* Col 4: Area */}
          <div className="hidden lg:block">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Land Area</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{projectStats.totalArea.toLocaleString()}</span>
              <span className="text-xs text-gray-500 ml-1 font-medium">ha</span>
            </div>
          </div>
          
          {/* Col 5: ROI */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. ROI</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{(projectStats.avgROI || 0).toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1 font-medium">%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;