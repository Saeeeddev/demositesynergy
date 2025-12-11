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
      relative group rounded-2xl p-6 border transition-all duration-300 ease-out flex flex-col gap-4 h-full
      ${active 
        ? 'bg-white border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.01] hover:border-primary-blue/30 ring-0 hover:ring-2 hover:ring-primary-blue/10' 
        : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed grayscale-[0.5] hover:grayscale-0 transition-all'
      }
    `}
  >
    <div className={`p-4 rounded-xl w-fit ${active ? bgClass : 'bg-gray-200'}`}>
      <Icon className={`w-8 h-8 ${active ? colorClass : 'text-gray-500'}`} />
    </div>
    
    <div className="flex-1">
      <h3 className={`text-lg font-bold mb-2 ${active ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between w-full">
      {!active ? (
         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
      ) : (
        <span className="text-xs font-bold text-primary-blue flex items-center group-hover:translate-x-1 transition-transform">
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
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="p-2 bg-indigo-50 rounded-lg">
            <SquaresPlusIcon className="h-6 w-6 text-primary-blue" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Project Category</h1>
          <p className="text-xs text-gray-500">Select the technology type to configure the automation engine.</p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-10">
            {/* Solar - Active */}
            <TypeCard 
                icon={SunIcon} 
                title="Solar PV Plant" 
                description="Photovoltaic systems analysis including irradiance data, land slope, distance constraints, and CAPEX/OPEX modeling." 
                colorClass="text-amber-500" 
                bgClass="bg-amber-50" 
                active={true} 
                onClick={() => setProjectType('solar')} 
            />
            {/* Wind */}
            <TypeCard 
                icon={Wind} 
                title="Wind Farm" 
                description="Onshore wind turbine placement, wind speed analysis, turbine spacing, and noise constraint validation." 
                colorClass="text-sky-500" 
                bgClass="bg-sky-50" 
                active={false} 
            />
            {/* Hybrid */}
            <TypeCard 
                icon={BatteryCharging} 
                title="Hybrid System" 
                description="Combined Solar PV and BESS (Battery Storage) or Wind generation for optimized grid stability and output." 
                colorClass="text-purple-500" 
                bgClass="bg-purple-50" 
                active={false} 
            />
             {/* Geothermal */}
             <TypeCard 
                icon={Flame} 
                title="Geothermal" 
                description="Heat extraction analysis, reservoir potential, drilling costs, and environmental impact assessments." 
                colorClass="text-red-500" 
                bgClass="bg-red-50" 
                active={false} 
            />
             {/* Biomass */}
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
  );
};

export default ProjectTypeSelection;