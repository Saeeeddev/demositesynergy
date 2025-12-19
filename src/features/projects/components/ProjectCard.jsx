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
          badgeClasses: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'تکمیل شده'
        };
      case 'in-progress':
        return { 
          icon: <ClockIcon className="w-4 h-4 text-amber-500" />, 
          color: 'bg-amber-500',
          badgeClasses: 'bg-amber-50 text-amber-700 border-amber-200',
          label: 'در حال اجرا'
        };
      case 'pending':
        return { 
          icon: <ExclamationTriangleIcon className="w-4 h-4 text-sky-500" />, 
          color: 'bg-sky-500',
          badgeClasses: 'bg-sky-50 text-sky-700 border-sky-200',
          label: 'در انتظار'
        };
      default:
        return { 
          icon: <ClockIcon className="w-4 h-4 text-gray-400" />, 
          color: 'bg-gray-400',
          badgeClasses: 'bg-gray-50 text-gray-700 border-gray-200',
          label: 'نامشخص'
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'نامشخص';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const projectManager = project.projectManager;
  const managerName = projectManager ? projectManager.name : 'تعیین نشده';
  
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
      className="bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-card-hover overflow-hidden transition-all duration-200 flex flex-col cursor-pointer group text-right"
      dir="rtl"
    >
      <div className="relative">
        <div className="h-40 bg-gray-100 flex items-center justify-center relative">
          <div className="absolute top-3 left-3"> {/* Badge moved to Left (End) */}
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.badgeClasses}`}
            >
              {statusInfo.icon}
              <span className="ms-1.5">{statusInfo.label}</span>
            </span>
          </div>
          {/* Display Project ID */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-mono" dir="ltr">
            {project.id}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg line-clamp-1 group-hover:text-primary-blue transition-colors">
          {project.name}
        </h3>
        
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPinIcon className="ms-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span className="truncate">{project.location?.region || 'مکان نامشخص'}</span>
        </div>

        <div className="mt-3 flex items-center text-sm">
          <UserCircleIcon className="h-6 w-6 text-gray-400 ms-2" />
          <span className="text-gray-500">مدیر: </span>
          <span className="font-medium text-gray-800 me-1">{managerName}</span>
        </div>
        
        <div className="mt-2 text-sm">
          <span className="text-gray-500">کارفرما: </span>
          <span className="font-medium text-gray-800">{project.clientName || 'نامشخص'}</span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-500">ظرفیت</div>
            <div className="font-medium text-gray-800">{project.capacity} مگاوات</div>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-500">مساحت</div>
            <div className="font-medium text-gray-800">{project.area} هکتار</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs">
          <div>
            <div className="text-gray-500">کاهش CO2</div>
            <div className="font-medium text-gray-800">{metrics.co2Reduction || 0} تن/سال</div>
          </div>
          <div>
            <div className="text-gray-500">تابش میانگین</div>
            <div className="font-medium text-gray-800">{metrics.ghiAvg || '-'}</div>
          </div>
           <div>
            <div className="text-gray-500">تولید تخمینی</div>
            <div className="font-medium text-gray-800">{estGen} مگاوات/سال</div>
          </div>
          <div>
            <div className="text-gray-500">نرخ بازده (IRR)</div>
            <div className="font-medium text-gray-800">{metrics.irr || metrics.roi || 0}%</div>
          </div>
          <div>
            <div className="text-gray-500">ارزش خالص (NPV)</div>
            <div className="font-medium text-gray-800">${metrics.npv || 0}M</div>
          </div>
          <div>
            <div className="text-gray-500">بازگشت سرمایه</div>
            <div className="font-medium text-gray-800">{metrics.paybackPeriod || '-'} سال</div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="ms-1 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span>ایجاد شده: {formatDate(project.createdDate)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between group-hover:bg-blue-50/30 transition-colors">
        <div className="flex space-x-2 relative">
          {/* Notification Popover */}
          {showEditNote && (
            <div className="absolute bottom-full mb-2 right-0 w-max bg-gray-800 text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg z-20 animate-fade-in-up">
              ویرایش در بروزرسانی بعدی
              <div className="absolute top-full right-3 -mt-[1px] border-4 border-transparent border-t-gray-800"></div>
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
          <span>مشاهده جزئیات</span>
          {/* Flipped Chevron for RTL (Points Left) */}
          <ChevronRightIcon className="me-1 h-4 w-4 transform scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
