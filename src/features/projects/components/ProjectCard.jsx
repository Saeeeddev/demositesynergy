import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  CalendarIcon, 
  PencilIcon, 
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon, 
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [showEditNote, setShowEditNote] = useState(false);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircleIcon className="w-4 h-4 text-emerald-500" />, 
          color: 'bg-emerald-500',
          badgeClasses: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'in-progress':
        return { 
          icon: <ClockIcon className="w-4 h-4 text-amber-500" />, 
          color: 'bg-amber-500',
          badgeClasses: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'pending':
        return { 
          icon: <ExclamationTriangleIcon className="w-4 h-4 text-sky-500" />, 
          color: 'bg-sky-500',
          badgeClasses: 'bg-sky-50 text-sky-700 border-sky-200'
        };
      default:
        return { 
          icon: <ClockIcon className="w-4 h-4 text-gray-400" />, 
          color: 'bg-gray-400',
          badgeClasses: 'bg-gray-50 text-gray-700 border-gray-200'
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const projectManager = project.projectManager;
  const managerName = projectManager ? projectManager.name : 'Unassigned';
  
  // Handling metrics safely
  const metrics = project.metrics || {};
  const estGen = metrics.estimatedGeneration || (project.capacity * 1800).toFixed(0);

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowEditNote(true);
    setTimeout(() => {
      setShowEditNote(false);
    }, 2000);
  };

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}/result`);
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-card-hover overflow-hidden transition-all duration-200 flex flex-col cursor-pointer group"
    >
      <div className="relative">
        <div className="h-40 bg-gray-100 flex items-center justify-center relative">
          <div className="absolute top-3 right-3">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.badgeClasses}`}
            >
              {statusInfo.icon}
              <span className="ml-1.5 capitalize">{project.status.replace('-', ' ')}</span>
            </span>
          </div>
          {/* Display Project ID */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-mono">
            {project.id}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg line-clamp-1 group-hover:text-primary-blue transition-colors">
          {project.name}
        </h3>
        
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span className="truncate">{project.location?.region || 'Unknown Location'}</span>
        </div>

        <div className="mt-3 flex items-center text-sm">
          <UserCircleIcon className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-gray-500">Manager: </span>
          <span className="font-medium text-gray-800 ml-1">{managerName}</span>
        </div>
        
        <div className="mt-2 text-sm">
          <span className="text-gray-500">Client: </span>
          <span className="font-medium text-gray-800">{project.clientName || 'N/A'}</span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-500">Capacity</div>
            <div className="font-medium text-gray-800">{project.capacity} MW</div>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-500">Area</div>
            <div className="font-medium text-gray-800">{project.area} ha</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-4">
          <div>
            <div className="text-xs text-gray-500">CO2 Reduction</div>
            <div className="font-medium text-gray-800">{metrics.co2Reduction || 0} t/y</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">GHI Avg</div>
            <div className="font-medium text-gray-800">{metrics.ghiAvg || '-'}</div>
          </div>
           <div>
            <div className="text-xs text-gray-500">Est. Generation</div>
            <div className="font-medium text-gray-800">{estGen} MWh/yr</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">IRR</div>
            <div className="font-medium text-gray-800">{metrics.irr || metrics.roi || 0}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">NPV</div>
            <div className="font-medium text-gray-800">${metrics.npv || 0}M</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Payback Period</div>
            <div className="font-medium text-gray-800">{metrics.paybackPeriod || '-'} Years</div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>Created: {formatDate(project.createdDate)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between group-hover:bg-blue-50/30 transition-colors">
        <div className="flex space-x-2 relative">
          {/* Notification Popover */}
          {showEditNote && (
            <div className="absolute bottom-full mb-2 left-0 w-max bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg z-20 animate-fade-in-up">
              Feature available in next update
              <div className="absolute top-full left-3 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
          
          <button 
            onClick={handleEditClick}
            className="p-1 text-gray-500 hover:text-primary-blue rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            <PencilIcon className="h-5 w-5" /> 
          </button>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
          className="flex items-center text-sm font-bold text-gray-500 hover:text-primary-blue transition-colors"
        >
          <span>View Details</span>
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
