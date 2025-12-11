import React, { useState } from 'react';
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
  const [showEditNote, setShowEditNote] = useState(false);

  // Status Styling Logic
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircleIcon className="w-4 h-4 text-emerald-600" />, 
          badgeClasses: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20'
        };
      case 'in-progress':
        return { 
          icon: <ClockIcon className="w-4 h-4 text-amber-600" />, 
          badgeClasses: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20'
        };
      case 'pending':
        return { 
          icon: <ExclamationTriangleIcon className="w-4 h-4 text-sky-600" />, 
          badgeClasses: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/20'
        };
      default:
        return { 
          icon: <ClockIcon className="w-4 h-4 text-gray-400" />, 
          badgeClasses: 'bg-gray-50 text-gray-600 border-gray-200 ring-gray-500/20'
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Safe access for metrics (default to 0 if missing)
  const metrics = project.metrics || {};
  const estGen = metrics.estimatedGeneration ? metrics.estimatedGeneration : (project.capacity * 1800).toFixed(0); 

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditNote(true);
    setTimeout(() => setShowEditNote(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* --- Card Header / Image --- */}
      <div className="relative h-44 bg-gray-100 border-b border-gray-50 flex items-center justify-center overflow-hidden rounded-t-2xl">
        
        {/* Placeholder Map Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 bg-primary-blue/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md ring-1 ${statusInfo.badgeClasses}`}
          >
            {statusInfo.icon}
            <span className="ml-1.5 capitalize">{project.status.replace('-', ' ')}</span>
          </span>
        </div>

        {/* Project Reference Chip */}
        <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur text-gray-600 text-[10px] font-mono font-medium px-2 py-1 rounded shadow-sm border border-gray-200/50">
          {project.reference || `REF-${project.id}`}
        </div>
      </div>
      
      {/* --- Card Body --- */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title & Region */}
        <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 group-hover:text-primary-blue transition-colors">
                {project.name}
            </h3>
            <div className="mt-1.5 flex items-center text-xs text-gray-500">
                <MapPinIcon className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <span className="truncate">{project.location?.region || 'Unknown Location'}</span>
            </div>
        </div>

        {/* Stakeholders */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
            <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-2 ring-2 ring-white shadow-sm">
                    {project.projectManager?.avatarUrl ? (
                        <img src={project.projectManager.avatarUrl} alt="PM" className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <UserCircleIcon className="h-4 w-4" />
                    )}
                </div>
                <div>
                    <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wide">Manager</span>
                    <span className="font-semibold text-gray-900">{project.projectManager?.name || 'Unassigned'}</span>
                </div>
            </div>
            <div className="text-right">
                <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wide">Client</span>
                <span className="font-semibold text-gray-900">{project.clientName || 'Internal'}</span>
            </div>
        </div>
        
        {/* Key Metrics Grid - Dense 3-Column */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-center mb-4">
          <MetricItem label="Capacity" value={`${project.capacity} MW`} />
          <MetricItem label="Area" value={`${project.area} ha`} />
          <MetricItem label="IRR" value={`${metrics.irr || 0}%`} highlight />
          
          <MetricItem label="CO₂ Saved" value={`${metrics.co2Reduction || 0} t`} />
          <MetricItem label="Est. Gen" value={`${(estGen / 1000).toFixed(1)} GWh`} />
          <MetricItem label="ROI" value={`${metrics.roi || 0}%`} highlight />
        </div>
        
        {/* Footer Meta */}
        <div className="mt-auto pt-4 flex items-center text-xs text-gray-400">
            <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
            <span>Created: {formatDate(project.createdDate)}</span>
        </div>
      </div>
      
      {/* --- Action Bar --- */}
      <div className="border-t border-gray-100 px-5 py-3.5 bg-gray-50/50 flex items-center justify-between rounded-b-2xl">
        <div className="flex space-x-2 relative">
          {/* "Coming Soon" Tooltip */}
          {showEditNote && (
            <div className="absolute bottom-full left-0 mb-2 w-max px-2.5 py-1.5 bg-gray-800 text-white text-[10px] font-semibold rounded shadow-lg z-20 animate-fade-in-up">
              Feature available in next update
              <div className="absolute top-full left-3 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
          
          <button 
            onClick={handleEditClick}
            className="p-1.5 text-gray-400 hover:text-primary-blue hover:bg-white rounded-md transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
            title="Edit Project"
          >
            <PencilIcon className="h-4 w-4" /> 
          </button>
        </div>

        <button 
            className="flex items-center text-xs font-bold text-primary-blue hover:text-indigo-700 transition-colors group"
            onClick={(e) => { e.preventDefault(); /* Navigate logic would be here */ }}
        >
          <span>View Dashboard</span>
          <ChevronRightIcon className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Helper for metrics
const MetricItem = ({ label, value, highlight }) => (
    <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
        <span className={`text-xs font-bold mt-0.5 truncate ${highlight ? 'text-emerald-600' : 'text-gray-800'}`}>
            {value}
        </span>
    </div>
);

export default ProjectCard;