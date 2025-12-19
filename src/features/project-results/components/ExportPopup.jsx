import React from 'react';

const ExportPopup = ({ onClose }) => {
  return (
    <div className="absolute top-16 right-4 z-50 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200 animate-in fade-in zoom-in-95">
      <h3 className="text-sm font-bold text-gray-700 mb-2">Export Data</h3>
      <p className="text-xs text-gray-500 mb-4">Select format to download:</p>
      <div className="space-y-2">
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">PDF Report</button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">CSV Data</button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">GeoJSON</button>
      </div>
      <button onClick={onClose} className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline w-full text-center">
        Close
      </button>
    </div>
  );
};

export default ExportPopup;
