import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChartPieIcon, MapIcon, CurrencyDollarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ResultSecondarySidebar = () => {
  const { projectId } = useParams();

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
          isActive ? 'bg-button-action-blue text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3 text-sm font-medium">{label}</span>
    </NavLink>
  );

  return (
    <div className="w-full h-full text-gray-800 pt-3">
      <nav>
        <div className="mb-4">
            <NavLink to="/projects" className="flex items-center text-sm text-gray-500 hover:text-gray-800 px-2">
                <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Projects
            </NavLink>
        </div>
        <div className="mt-2">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Analysis Results</h3>
          <ul className="space-y-1">
            <li><NavItem to={`/results/${projectId}/overview`} icon={ChartPieIcon} label="Overview" /></li>
            <li><NavItem to={`/results/${projectId}/location`} icon={MapIcon} label="Location & Layers" /></li>
            <li><NavItem to={`/results/${projectId}/financial`} icon={CurrencyDollarIcon} label="Financials" /></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ResultSecondarySidebar;