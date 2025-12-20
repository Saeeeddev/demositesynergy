import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useProjectData } from '../../hooks/useResultQueries';
import ExportPopup from './../ExportPopup'; // Make sure the path is correct

const ResultPageHeader = ({ onBack }) => {
  const [showExportPopup, setShowExportPopup] = useState(false);

  // Fetch Data
  const { data: projectData, isLoading } = useProjectData();

  const project = projectData || {
    name: 'در حال بارگذاری پروژه...',
    reference: '...',
    location: { region: '...' },
    clientName: '...'
  };

  return (
    <>
      <header className="h-[85px] w-full flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-[#6D7F9F] to-[#5a6b89] shadow-md border-b border-[#6D7F9F]/30 sticky top-0 z-50 text-white">
        
        {/* RIGHT SIDE: Back Button & Project Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-all shrink-0 border border-white/10"
            aria-label="بازگشت"
          >
            <ArrowLeftIcon className="w-5 h-5 text-white transform scale-x-[-1]" />
          </button>

          <div className="flex flex-col min-w-0">
            {isLoading ? (
               <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
            ) : (
               <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide truncate pl-2">
                 {project.name}
               </h1>
            )}

            <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-blue-100/90 overflow-hidden">
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono text-xs border border-white/10 tracking-wider">
                {project.reference || 'REF-LOADING'}
              </span>
              <div className="flex items-center gap-1 truncate">
                <MapPinIcon className="w-3.5 h-3.5 opacity-70" />
                <span className="truncate">{project.location?.region}</span>
              </div>
              <span className="hidden sm:inline-block opacity-40">|</span>
              <div className="hidden sm:flex items-center gap-1 truncate">
                <BuildingOfficeIcon className="w-3.5 h-3.5 opacity-70" />
                <span className="truncate">{project.clientName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE: Export Button */}
        <div className="ms-4 shrink-0">
          <button
            onClick={() => setShowExportPopup(true)}
            className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm group"
          >
            <DocumentArrowDownIcon className="w-4 h-4 group-hover:animate-bounce" />
            <span className="hidden sm:inline ms-2 text-sm">خروجی</span>
          </button>
        </div>
      </header>

      {/* Render the Popup outside the header content flow but inside the component logic */}
      {showExportPopup && (
        <ExportPopup onClose={() => setShowExportPopup(false)} />
      )}
    </>
  );
};

export default ResultPageHeader;
