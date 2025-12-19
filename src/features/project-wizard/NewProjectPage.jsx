import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../stores/useWizardStore';
import { 
  ArrowLeftIcon, // We'll flip this for RTL Back
  BuildingOfficeIcon, 
  CheckIcon, 
  ArrowRightIcon // We'll flip this for RTL Breadcrumb separator
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

  // Helper to determine step status styles
  const getStepStyle = (stepNum) => {
    if (currentStep > stepNum) return 'bg-primary-blue text-white'; // Completed
    if (currentStep === stepNum) return 'bg-primary-blue text-white'; // Active
    return 'bg-gray-100 text-gray-500'; // Pending
  };

  const getStepTextStyle = (stepNum) => {
    if (currentStep >= stepNum) return 'text-primary-blue font-bold';
    return 'text-gray-400';
  };

  // 2. Render Main Wizard Steps
  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4" dir="rtl">
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
            <button 
                onClick={handleBack} 
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="بازگشت"
            >
                {/* Flip ArrowLeft to point Right for RTL Back */}
                <ArrowLeftIcon className="w-5 h-5 transform scale-x-[-1]" />
            </button>
            <BuildingOfficeIcon className="h-6 w-6 text-primary-blue" />
            <div>
                <h1 className="text-xl font-bold text-gray-900">پروژه جدید</h1>
                <p className="text-xs text-gray-500">مرحله {currentStep} از ۴</p>
            </div>
        </div>

        {/* Breadcrumb Steps (RTL Flow) */}
        <div className="flex items-center text-xs gap-2">
            
            {/* Step 1 */}
            <div className={`flex items-center ${getStepTextStyle(1)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(1)}`}>
                    {currentStep > 1 ? <CheckIcon className="w-3 h-3" /> : '۱'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 1 ? 'text-gray-900' : ''}`}>مشخصات</span>
            </div>
            
            {/* Separator: Flip ArrowRight to point Left */}
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
            
            {/* Step 2 */}
            <div className={`flex items-center ${getStepTextStyle(2)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(2)}`}>
                    {currentStep > 2 ? <CheckIcon className="w-3 h-3" /> : '۲'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 2 ? 'text-gray-900' : ''}`}>معیارها</span>
            </div>
            
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
            
            {/* Step 3 */}
            <div className={`flex items-center ${getStepTextStyle(3)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(3)}`}>
                    {currentStep > 3 ? <CheckIcon className="w-3 h-3" /> : '۳'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 3 ? 'text-gray-900' : ''}`}>مکان‌یابی</span>
            </div>
            
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
            
            {/* Step 4 */}
            <div className={`flex items-center ${getStepTextStyle(4)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(4)}`}>
                    {currentStep > 4 ? <CheckIcon className="w-3 h-3" /> : '۴'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 4 ? 'text-gray-900' : ''}`}>مالی</span>
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
