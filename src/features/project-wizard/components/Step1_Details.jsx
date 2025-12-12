import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  BoltIcon, 
  BuildingOfficeIcon, 
  UserIcon, 
  MapPinIcon, 
  AdjustmentsHorizontalIcon, 
  PencilSquareIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const FormInput = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="group">
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
      </div>
      <input
        type={type}
        {...props}
        className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all shadow-sm hover:bg-white"
      />
    </div>
  </div>
);

const Step1_Details = () => {
  const { projectDetails, updateProjectDetails, handleAnalysisModeSelection, nextStep } = useWizardStore();

  const isFormValid = projectDetails.name && projectDetails.company && projectDetails.owner && projectDetails.capacity && projectDetails.location && projectDetails.analysisMode;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
      <div className="flex-1 p-5 lg:p-6 overflow-y-auto">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          
          {/* Row 1: High Level Info */}
          <div className="md:col-span-2">
            <FormInput 
                label="Project Name" 
                name="name" 
                value={projectDetails.name} 
                onChange={updateProjectDetails} 
                placeholder="e.g. Solar Farm Alpha" 
                icon={BoltIcon} 
            />
          </div>
          <div className="md:col-span-2">
            <FormInput 
                label="Company" 
                name="company" 
                value={projectDetails.company} 
                onChange={updateProjectDetails} 
                placeholder="e.g. Green Energy Corp" 
                icon={BuildingOfficeIcon} 
            />
          </div>

          {/* Row 2: Stakeholders & Capacity */}
          <FormInput 
            label="Owner (Client)" 
            name="owner" 
            value={projectDetails.owner} 
            onChange={updateProjectDetails} 
            placeholder="Client Name" 
            icon={UserIcon} 
          />
          <FormInput 
            label="Project Manager" 
            name="manager" 
            value={projectDetails.manager} 
            onChange={updateProjectDetails} 
            placeholder="Manager Name" 
            icon={UserIcon} 
          />
          <FormInput 
            label="Capacity (MW)" 
            name="capacity" 
            type="number" 
            step="0.1" 
            value={projectDetails.capacity} 
            onChange={updateProjectDetails} 
            placeholder="0.0 MW" 
            icon={BoltIcon} 
          />
          <FormInput 
            label="Address" 
            name="location" 
            value={projectDetails.location} 
            onChange={updateProjectDetails} 
            placeholder="Site Address" 
            icon={MapPinIcon} 
          />

          {/* Row 3: Analysis Mode */}
          <div className="md:col-span-2 mt-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1 uppercase tracking-wide">Analysis Mode</label>
            <div className="grid grid-cols-2 gap-3 h-[72px]">
              
              <button 
                onClick={() => handleAnalysisModeSelection('standard')} 
                className={`relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200 w-full text-left h-full ${
                    projectDetails.analysisMode === 'standard' 
                    ? 'bg-primary-blue/5 border-primary-blue ring-1 ring-primary-blue/20' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AdjustmentsHorizontalIcon className={`h-5 w-5 ${projectDetails.analysisMode === 'standard' ? 'text-primary-blue' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${projectDetails.analysisMode === 'standard' ? 'text-gray-900' : 'text-gray-700'}`}>Standard</span>
                </div>
                <span className="text-xs text-gray-500 leading-tight">Use preset weights</span>
              </button>

              <button 
                onClick={() => handleAnalysisModeSelection('custom')} 
                className={`relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200 w-full text-left h-full ${
                    projectDetails.analysisMode === 'custom' 
                    ? 'bg-primary-blue/5 border-primary-blue ring-1 ring-primary-blue/20' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <PencilSquareIcon className={`h-5 w-5 ${projectDetails.analysisMode === 'custom' ? 'text-primary-blue' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${projectDetails.analysisMode === 'custom' ? 'text-gray-900' : 'text-gray-700'}`}>Custom</span>
                </div>
                <span className="text-xs text-gray-500 leading-tight">Define your own</span>
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            {!isFormValid ? "* All fields are required" : ""}
          </div>
          <button 
            onClick={nextStep} 
            disabled={!isFormValid}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
          >
            Continue to Criteria
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1_Details;