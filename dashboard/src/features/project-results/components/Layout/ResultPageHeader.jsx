import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
// We reuse the main hook because our JSON structure combines basic info & results
import { useProjectData } from '../../hooks/useResultQueries';
import ExportPopup from './../ExportPopup'; 

const ResultPageHeader = ({ projectId, onBack }) => {
  const [showExportPopup, setShowExportPopup] = useState(false);

  // Fetch Project Data based on ID
  const { data: projectData, isLoading } = useProjectData(projectId);

  // Default Fallback
  const projectInfo = projectData ? {
    name: "پروژه انرژی خورشیدی", // Fallback name if missing in 'projectResults', usually would fetch from 'projects' list
    // If the data structure has basicInfo separate:
    // ...projectData.basicInfo 
    // BUT since db.json structure puts name/client inside projects list usually, 
    // let's assume we read from the detailed result object we created:
    ...projectData, 
  } : {
     name: 'در حال دریافت اطلاعات...',
     reference: '...',
     location: { region: '...' },
     clientName: '...'
  };

  // Safe accessor helper in case keys differ in detailed result vs project list
  // Looking at Batch 1 db.json structure: 
  // Result object has 'basicInfo' -> { ProjectId, coordinates... } but maybe missing Name/Client?
  // If db.json "projectResults" doesn't have "name", we might display "Loading" or the ProjectId.
  // Ideally, 'projectResults' in db.json should mirror necessary header info or we fetch '/projects/:id'.
  // Assuming 'projectResults' might imply the data is result-specific.
  
  // Quick Fix for Display Name: 
  // If 'name' is missing in result blob, fallback to ID or "Solar Project".
  const displayTitle = projectInfo.name || `پروژه ${projectId}`; 
  const displayRef = projectInfo.basicInfo?.ProjectId || projectInfo.id || 'N/A';
  const displayRegion = projectInfo.basicInfo?.nearestCity || projectInfo.location?.region || 'نامشخص';
  const displayClient = projectInfo.clientName || projectInfo.basicInfo?.ownership || '-';

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
               <div className="flex flex-col gap-1">
                 <div className="h-5 w-48 bg-white/20 rounded animate-pulse"></div>
                 <div className="h-3 w-32 bg-white/20 rounded animate-pulse opacity-70"></div>
               </div>
            ) : (
               <>
                 <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide truncate pl-2" title={displayTitle}>
                   {displayTitle}
                 </h1>
                 <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-blue-100/90 overflow-hidden">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono text-xs border border-white/10 tracking-wider">
                      {displayRef}
                    </span>
                    <div className="flex items-center gap-1 truncate">
                      <MapPinIcon className="w-3.5 h-3.5 opacity-70" />
                      <span className="truncate">{displayRegion}</span>
                    </div>
                    <span className="hidden sm:inline-block opacity-40">|</span>
                    <div className="hidden sm:flex items-center gap-1 truncate">
                      <BuildingOfficeIcon className="w-3.5 h-3.5 opacity-70" />
                      <span className="truncate">{displayClient}</span>
                    </div>
                 </div>
               </>
            )}
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

      {/* Export Popup Modal */}
      {showExportPopup && (
        <ExportPopup onClose={() => setShowExportPopup(false)} />
      )}
    </>
  );
};

export default ResultPageHeader;
