import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPinIcon, CalendarIcon, PencilIcon, ChevronRightIcon,
  CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, UserCircleIcon
} from '@heroicons/react/24/outline';

const getStatusInfo = (status) => {
  // Same status logic as your original file
  switch (status) {
    case 'completed': return { icon: <CheckCircleIcon className="w-4 h-4 text-emerald-500" />, badgeClasses: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'in-progress': return { icon: <ClockIcon className="w-4 h-4 text-amber-500" />, badgeClasses: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'pending': return { icon: <ExclamationTriangleIcon className="w-4 h-4 text-sky-500" />, badgeClasses: 'bg-sky-50 text-sky-700 border-sky-200' };
    default: return { icon: <ClockIcon className="w-4 h-4 text-gray-400" />, badgeClasses: 'bg-gray-50 text-gray-700 border-gray-200' };
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [showEditNote, setShowEditNote] = useState(false);

  const statusInfo = getStatusInfo(project.status);
  const managerName = project.projectManager?.name || 'Unassigned';

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowEditNote(true);
    setTimeout(() => setShowEditNote(false), 2000);
  };

  const handleViewDetails = () => {
    // This will navigate to the future results page for this project
    // navigate(`/results/${project.id}`);
    alert(`Navigating to details for project ID: ${project.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-lg overflow-hidden transition-all duration-200 flex flex-col">
      <div className="relative h-40 bg-gray-100 flex items-center justify-center">
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.badgeClasses}`}>
            {statusInfo.icon}
            <span className="ml-1.5 capitalize">{project.status.replace('-', ' ')}</span>
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {project.reference}
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{project.name}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span className="truncate">{project.location.region}</span>
        </div>
        <div className="mt-3 flex items-center text-sm">
          <UserCircleIcon className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-gray-500">Manager: </span>
          <span className="font-medium text-gray-800 ml-1">{managerName}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-md p-2"><div className="text-xs text-gray-500">Capacity</div><div className="font-medium text-gray-800">{project.capacity} MW</div></div>
          <div className="bg-gray-50 rounded-md p-2"><div className="text-xs text-gray-500">Area</div><div className="font-medium text-gray-800">{project.area} ha</div></div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center"><CalendarIcon className="mr-1 h-4 w-4" /><span>Created: {formatDate(project.createdDate)}</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between">
        <div className="relative">
          {showEditNote && (
            <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg z-20">Feature available in next update</div>
          )}
          <button onClick={handleEditClick} className="p-1 text-gray-500 hover:text-primary-blue rounded-full bg-white hover:bg-gray-100 transition-colors"><PencilIcon className="h-5 w-5" /></button>
        </div>
        <button onClick={handleViewDetails} className="flex items-center text-sm font-medium text-gray-500 hover:text-primary-blue transition-colors">
          <span>View Details</span>
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;