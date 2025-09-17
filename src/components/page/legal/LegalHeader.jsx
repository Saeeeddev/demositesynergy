import React from 'react';
import { Link } from 'react-router-dom';

const LegalHeader = () => {
  return (
    <header className="w-full fixed top-0 z-45 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2 md:py-4">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-6 w-auto sm:h-8 md:h-9"
                src="/src/assets/sitesynergy_logo_colored.png"
                alt="SiteSynergy"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium"
            >
            
            </Link>
            <button className="text-gray-700 bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:transform hover:-translate-y-0.5 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;