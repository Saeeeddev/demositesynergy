import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../stores/useWizardStore';
import { 
  ArrowLeftIcon, 
  BuildingOfficeIcon, 
  CheckIcon, 
  ArrowRightIcon,
  CheckCircleIcon // Added for the success modal
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 1. New Success State

  const { 
    currentStep, projectType, setProjectType, prevStep 
  } = useWizardStore();

  const handleBack = () => {
    if (currentStep === 1) {
        setProjectType(null);
    } else {
        prevStep();
    }
  };

  const handleExit = () => {
      navigate('/projects');
  };

  // --- 2. Updated Handler for Submission ---
  const handleProjectSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      // Simulate API Call
      console.log("Sending data to API...", payload);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // Success! Open the modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Submission failed", error);
      alert("خطا در ثبت پروژه");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for closing modal and redirecting
  const handleSuccessRedirect = () => {
    navigate('/projects');
  };

  if (!projectType) {
    return <ProjectTypeSelection onBack={handleExit} />;
  }

  const getStepStyle = (stepNum) => {
    if (currentStep > stepNum) return 'bg-primary-blue text-white';
    if (currentStep === stepNum) return 'bg-primary-blue text-white';
    return 'bg-gray-100 text-gray-500';
  };

  const getStepTextStyle = (stepNum) => {
    if (currentStep >= stepNum) return 'text-primary-blue font-bold';
    return 'text-gray-400';
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4 relative" dir="rtl">
      
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
            <button 
                onClick={handleBack} 
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="بازگشت"
            >
                <ArrowLeftIcon className="w-5 h-5 transform scale-x-[-1]" />
            </button>
            <BuildingOfficeIcon className="h-6 w-6 text-primary-blue" />
            <div>
                <h1 className="text-xl font-bold text-gray-900">پروژه جدید</h1>
                <p className="text-xs text-gray-500">مرحله {currentStep} از ۴</p>
            </div>
        </div>

        {/* Breadcrumb Steps */}
        <div className="flex items-center text-xs gap-2">
            <div className={`flex items-center ${getStepTextStyle(1)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(1)}`}>
                    {currentStep > 1 ? <CheckIcon className="w-3 h-3" /> : '۱'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 1 ? 'text-gray-900' : ''}`}>مشخصات</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
            <div className={`flex items-center ${getStepTextStyle(2)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(2)}`}>
                    {currentStep > 2 ? <CheckIcon className="w-3 h-3" /> : '۲'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 2 ? 'text-gray-900' : ''}`}>معیارها</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
            <div className={`flex items-center ${getStepTextStyle(3)}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(3)}`}>
                    {currentStep > 3 ? <CheckIcon className="w-3 h-3" /> : '۳'}
                </div>
                <span className={`ms-1.5 hidden sm:inline ${currentStep === 3 ? 'text-gray-900' : ''}`}>مکان‌یابی</span>
            </div>
            <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1]" />
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
        
        {currentStep === 5 && (
            <ReviewPage 
                onBack={prevStep} 
                onConfirm={handleProjectSubmit}
                isSubmitting={isSubmitting}
            />
        )}
      </div>

      {/* --- 3. Success Modal Overlay --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                پروژه با موفقیت ثبت شد
              </h3>
              
              <p className="text-sm text-gray-500 mb-6">
                اطلاعات پروژه شما با موفقیت در سیستم ذخیره گردید و هم‌اکنون در لیست پروژه‌ها قابل مشاهده است.
              </p>
              
              <button
                onClick={handleSuccessRedirect}
                className="w-full py-2.5 px-4 bg-primary-blue hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:ring-4 focus:ring-blue-100"
              >
                بازگشت به لیست پروژه‌ها
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewProjectPage;
