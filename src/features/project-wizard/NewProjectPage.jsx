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
import ReviewPage from './components/ReviewPage'; // We will create this in Batch 6

const StepIndicator = ({ stepNumber, label, currentStep, isCompleted }) => {
  let colorClass = "text-gray-400";
  let iconContent = stepNumber;

  if (isCompleted) {
    colorClass = "text-emerald-600";
    iconContent = <CheckIcon className="w-3 h-3" />;
  } else if (currentStep === stepNumber) {
    colorClass = "text-primary-blue";
  }

  return (
    <div className={`flex items-center text-xs font-medium ${colorClass}`}>
      <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium border shadow-sm mr-1.5 transition-colors
        ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
        ${currentStep === stepNumber ? 'bg-primary-blue border-primary-blue text-white' : ''}
        ${!isCompleted && currentStep !== stepNumber ? 'bg-white border-gray-200 text-gray-500' : ''}
      `}>
        {iconContent}
      </div>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
};

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
      // confirm logic if needed
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
            <div className="p-2 bg-primary-blue/10 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-900">New Project</h1>
                <p className="text-xs text-gray-500">Step {currentStep} of 4</p>
            </div>
        </div>

        {/* Breadcrumb Steps */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <StepIndicator stepNumber={1} label="Details" currentStep={currentStep} isCompleted={currentStep > 1} />
            <ArrowRightIcon className="w-3 h-3 text-gray-300" />
            <StepIndicator stepNumber={2} label="Criteria" currentStep={currentStep} isCompleted={currentStep > 2} />
            <ArrowRightIcon className="w-3 h-3 text-gray-300" />
            <StepIndicator stepNumber={3} label="Location" currentStep={currentStep} isCompleted={currentStep > 3} />
            <ArrowRightIcon className="w-3 h-3 text-gray-300" />
            <StepIndicator stepNumber={4} label="Financial" currentStep={currentStep} isCompleted={currentStep > 4} />
        </div>
      </div>

      {/* Wizard Content Container */}
      {/* IMPORTANT: Step components themselves are responsible for their internal layout (scrolling/footers) to allow for step-specific designs like Maps */}
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