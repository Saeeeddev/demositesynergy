import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, BuildingOfficeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ProjectsHeader = ({ projectStats }) => {
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(false);

  const handleSearchClick = () => {
    setShowNote(true);
    setTimeout(() => setShowNote(false), 2000);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 sm:px-6 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-6 w-6 text-primary-blue mr-3" />
            <h2 className="text-xl font-medium text-gray-800">Project Management</h2>
          </div>
          <button
            onClick={() => navigate('/projects/new')}
            className="bg-primary-blue hover:bg-primary-blue/90 text-white px-3 py-2 rounded-lg flex items-center transition-colors w-full sm:w-auto"
          >
            <PlusIcon className="mr-1.5 h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 w-full md:max-w-lg">
          <div className="relative flex-grow">
            {showNote && (
              <div className="absolute bottom-full mb-2 z-20 w-max px-2 py-1 text-[11px] font-medium text-white bg-gray-800 rounded shadow-lg">Module coming in next update</div>
            )}
            <div onClick={handleSearchClick} className="flex items-center border border-gray-300 rounded-lg bg-white cursor-pointer">
              <div className="pl-3 text-gray-400"><MagnifyingGlassIcon className="h-5 w-5" /></div>
              <input type="text" readOnly className="w-full py-2 px-2 bg-white border-0 focus:ring-0 text-sm text-gray-500 cursor-pointer" placeholder="Search projects..." />
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
              Advanced Search available in next update
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-100 px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
          <div>
            <div className="text-sm text-gray-500">Total Projects</div>
            <div className="mt-1 font-semibold text-gray-800 text-xl">{projectStats.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Capacity</div>
            <div className="mt-1 font-semibold text-gray-800"><span className="text-xl">{projectStats.totalCapacity}</span><span className="text-sm ml-1">MW</span></div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Est. Generation</div>
            <div className="mt-1 font-semibold text-gray-800"><span className="text-xl">{(projectStats.estimatedGeneration / 1000).toFixed(1)}</span><span className="text-sm ml-1">GWh/yr</span></div>
          </div>
          <div className="hidden lg:block">
            <div className="text-sm text-gray-500">Land Area</div>
            <div className="mt-1 font-semibold text-gray-800"><span className="text-xl">{projectStats.totalArea}</span><span className="text-sm ml-1">hectares</span></div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Avg. ROI</div>
            <div className="mt-1 font-semibold text-gray-800"><span className="text-xl">{(projectStats.avgROI || 0).toFixed(1)}</span><span className="text-sm ml-1">%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;