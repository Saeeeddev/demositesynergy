import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  ArrowLeftIcon, 
  SquaresPlusIcon,
  SunIcon 
} from '@heroicons/react/24/outline';
import { Wind, BatteryCharging, Flame, Trash2 } from 'lucide-react';

const TypeCard = ({ icon: Icon, title, description, active, onClick, colorClass, bgClass }) => (
  <div 
    onClick={active ? onClick : undefined}
    className={`
      relative group rounded-xl p-6 border transition-all duration-300 ease-out
      flex flex-col items-start gap-4 h-full
      ${active 
        ? 'bg-white border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-primary-blue/50' 
        : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed grayscale-[0.8] hover:grayscale-0 hover:opacity-80'
      }
    `}
  >
    {/* Icon Container */}
    <div className={`p-4 rounded-xl ${active ? bgClass : 'bg-gray-200'} transition-colors duration-300`}>
      <Icon className={`w-8 h-8 ${active ? colorClass : 'text-gray-500'}`} />
    </div>

    {/* Content */}
    <div className="flex-1">
      <h3 className={`text-lg font-bold mb-1 ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Action / Badge */}
    <div className="w-full mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
      {!active ? (
         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-1 rounded">
           Coming Soon
         </span>
      ) : (
        <span className="text-xs font-semibold text-primary-blue flex items-center group-hover:translate-x-1 transition-transform">
          Select Type &rarr;
        </span>
      )}
    </div>
  </div>
);

const ProjectTypeSelection = ({ onBack }) => {
  const setProjectType = useWizardStore(state => state.setProjectType);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack} 
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <SquaresPlusIcon className="h-6 w-6 text-primary-blue" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Project Category</h1>
          <p className="text-xs text-gray-500">Select the Category for your new project</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                What type of energy project are you building?
            </h2>
            <p className="text-center text-gray-500 mb-10 text-sm max-w-2xl mx-auto">
                Choose a category below to configure standard parameters, automation criteria, and financial models specific to that industry.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TypeCard 
                    icon={SunIcon} 
                    title="Solar PV Plant" 
                    description="Photovoltaic systems analysis including irradiance data, land slope, distance constraints, and CAPEX/OPEX modeling." 
                    colorClass="text-amber-500" 
                    bgClass="bg-amber-50" 
                    active={true} 
                    onClick={() => setProjectType('solar')} 
                />
                <TypeCard 
                    icon={Wind} 
                    title="Wind Farm" 
                    description="Onshore wind turbine placement, wind speed analysis, turbine spacing, and noise constraint validation." 
                    colorClass="text-sky-500" 
                    bgClass="bg-sky-50" 
                    active={false} 
                />
                <TypeCard 
                    icon={BatteryCharging} 
                    title="Hybrid System" 
                    description="Combined Solar PV and BESS (Battery Storage) or Wind generation for optimized grid stability and output." 
                    colorClass="text-purple-500" 
                    bgClass="bg-purple-50" 
                    active={false} 
                />
                 <TypeCard 
                    icon={Flame} 
                    title="Geothermal" 
                    description="Heat extraction analysis, reservoir potential, drilling costs, and environmental impact assessments." 
                    colorClass="text-red-500" 
                    bgClass="bg-red-50" 
                    active={false} 
                />
                 <TypeCard 
                    icon={Trash2} 
                    title="Biomass & Landfill" 
                    description="Waste-to-energy conversion projects, methane capture analysis, and organic material sourcing logistics." 
                    colorClass="text-emerald-500" 
                    bgClass="bg-emerald-50" 
                    active={false} 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeSelection;