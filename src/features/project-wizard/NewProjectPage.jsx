import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../stores/useWizardStore';
import { 
  ArrowLeftIcon, 
  BuildingOfficeIcon, 
  CheckIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

// Sub-Components
import ProjectTypeSelection from './components/ProjectTypeSelection';
import Step1_Details from './components/Step1_Details';
import Step2_Criteria from './components/Step2_Criteria';
import Step3_Location from './components/Step3_Location';
import Step4_Financial from './components/Step4_Financial';
import ReviewPage from './components/ReviewPage';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const { 
    currentStep, projectType, setProjectType, prevStep 
  } = useWizardStore();

  const handleBack = () => {
    if (currentStep === 1) {
        setProjectType(null); // Go back to type selection
    } else {
        prevStep();
    }
  };

  const handleExit = () => {
      navigate('/projects');
  };

  // 1. Show Type Selection if no type
  if (!projectType) {
    return <ProjectTypeSelection onBack={handleExit} />;
  }

  // 2. Render Main Wizard Steps
  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4">
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
            <button 
                onClick={handleBack} 
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <BuildingOfficeIcon className="h-6 w-6 text-primary-blue" />
            <div>
                <h1 className="text-xl font-bold text-gray-900">New Project</h1>
                <p className="text-xs text-gray-500">Step {currentStep} of 4</p>
            </div>
        </div>

        {/* Breadcrumb Steps */}
        <div className="flex items-center text-xs gap-2">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-blue' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm ${currentStep >= 1 ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {currentStep > 1 ? <CheckIcon className="w-3 h-3" /> : '1'}
                </div>
                <span className={`ml-1.5 font-medium hidden sm:inline ${currentStep === 1 ? 'text-gray-900' : ''}`}>Details</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400" />
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-blue' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm ${currentStep >= 2 ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {currentStep > 2 ? <CheckIcon className="w-3 h-3" /> : '2'}
                </div>
                <span className={`ml-1.5 font-medium hidden sm:inline ${currentStep === 2 ? 'text-gray-900' : ''}`}>Criteria</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400" />
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-blue' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm ${currentStep >= 3 ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {currentStep > 3 ? <CheckIcon className="w-3 h-3" /> : '3'}
                </div>
                <span className={`ml-1.5 font-medium hidden sm:inline ${currentStep === 3 ? 'text-gray-900' : ''}`}>Location</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400" />
            
            <div className={`flex items-center ${currentStep >= 4 ? 'text-primary-blue' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm ${currentStep >= 4 ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                    4
                </div>
                <span className={`ml-1.5 font-medium hidden sm:inline ${currentStep === 4 ? 'text-gray-900' : ''}`}>Financial</span>
            </div>
        </div>
      </div>

      {/* Wizard Content Container */}
      <div className="flex-1 min-h-0"> 
        {currentStep === 1 && <Step1_Details />}
        {currentStep === 2 && <Step2_Criteria />}
        {currentStep === 3 && <Step3_Location />}
        {currentStep === 4 && <Step4_Financial />}
        {currentStep === 5 && <ReviewPage />}
      </div>
    </div>
  );
};

export default NewProjectPage;