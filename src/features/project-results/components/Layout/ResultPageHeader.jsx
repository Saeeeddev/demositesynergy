import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  TableCellsIcon,
  MapIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useProjectData } from '../../hooks/useResultQueries';

// Custom Hook to detect clicks outside
const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });
  return domNode;
};

const ResultPageHeader = ({ onBack }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const exportMenuRef = useClickOutside(() => setShowExportOptions(false));

  // Fetch Data (Batch 2 Hook)
  const { data: projectData, isLoading } = useProjectData();

  const project = projectData || {
    name: 'Loading Project...',
    reference: '...',
    location: { region: '...' },
    clientName: '...'
  };

  return (
    <header className="h-[85px] w-full flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-[#6D7F9F] to-[#5a6b89] shadow-md border-b border-[#6D7F9F]/30 sticky top-0 z-50 text-white">
      
      {/* LEFT: Back Button & Project Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-all shrink-0 border border-white/10"
          aria-label="Go Back"
        >
          <ArrowLeftIcon className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col min-w-0">
          {/* Top Row: Title */}
          {isLoading ? (
             <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
          ) : (
             <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide truncate">
               {project.name}
             </h1>
          )}

          {/* Bottom Row: Metadata Tags */}
          <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-blue-100/90 overflow-hidden">
            <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono text-xs border border-white/10 tracking-wider">
              {project.reference || 'REF-Loading'}
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

      {/* RIGHT: Export Options */}
      <div className="relative ml-4 shrink-0" ref={exportMenuRef}>
        <button
          onClick={() => setShowExportOptions(!showExportOptions)}
          className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm"
        >
          <DocumentArrowDownIcon className="w-4 h-4" />
          <span className="hidden sm:inline ml-2 text-sm">Export</span>
          <ChevronDownIcon className={`w-3 h-3 ml-2 transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
        </button>

        {showExportOptions && (
          <div className="absolute right-0 mt-2 w-[300px] sm:w-[320px] rounded-xl bg-white text-gray-800 shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
             <div className="p-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Download Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg"><DocumentIcon className="w-5 h-5" /></div>
                      <div><div className="text-sm font-semibold">PDF Report</div><div className="text-xs text-gray-500">Summary & Charts</div></div>
                    </div>
                  </div>
                  
                  {/* CSV Data */}
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <TableCellsIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-gray-900">CSV Data</div>
                        <div className="text-xs text-gray-500">Raw calculation data</div>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 border-gray-300" />
                  </div>

                  {/* GeoJSON */}
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <MapIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-gray-900">GeoJSON</div>
                        <div className="text-xs text-gray-500">Map boundaries</div>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button onClick={() => setShowExportOptions(false)} className="text-xs font-medium text-gray-500 hover:text-gray-800">Cancel</button>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#6D7F9F] hover:bg-[#5a6b89] rounded-lg transition-colors shadow-sm">
                    <DocumentDuplicateIcon className="w-4 h-4" />
                    Download ZIP
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResultPageHeader;