import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../stores/useWizardStore';
import { 
  ArrowLeftIcon, 
  BuildingOfficeIcon, 
  CheckIcon, 
  ArrowRightIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

// Sub-Components
import ProjectTypeSelection from './components/ProjectTypeSelection';
import Step1_ServiceType from './components/Step1_ServiceType';
import Step2_Details from './components/Step2_Details';
import Step3_Criteria from './components/Step3_Criteria';
import Step4_Location from './components/Step4_Location';
import Step5_Financial from './components/Step5_Financial';
import ReviewPage from './components/ReviewPage';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { 
    currentStep, projectType, projectDetails, setProjectType, prevStep, reset 
  } = useWizardStore();

  const handleBack = () => {
    if (currentStep === 1) {
        setProjectType(null);
    } else {
        prevStep();
    }
  };

  const handleExit = () => {
      reset(); 
      navigate('/projects');
  };

  const handleProjectSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      console.log("Sending data to API...", payload);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Submission failed", error);
      alert("خطا در ثبت پروژه");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessRedirect = () => {
    reset(); 
    navigate('/projects');
  };

  if (!projectType) {
    return <ProjectTypeSelection onBack={handleExit} />;
  }

  // --- Dynamic Stepper Logic ---
  const isReportOnly = projectDetails.serviceType === 'report';

  const steps = isReportOnly 
    ? [
        { id: 1, label: 'خدمات', displayNum: '۱' },
        { id: 2, label: 'مشخصات', displayNum: '۲' },
        { id: 5, label: 'مالی', displayNum: '۳' } // Jump to Financial
      ]
    : [
        { id: 1, label: 'خدمات', displayNum: '۱' },
        { id: 2, label: 'مشخصات', displayNum: '۲' },
        { id: 3, label: 'معیارها', displayNum: '۳' },
        { id: 4, label: 'مکان‌یابی', displayNum: '۴' },
        { id: 5, label: 'مالی', displayNum: '۵' }
      ];

  const getStepStyle = (stepId) => {
    // If currentStep is 6 (Review), all steps are "done"
    if (currentStep === 6) return 'bg-primary-blue text-white';
    
    if (currentStep > stepId) return 'bg-primary-blue text-white';
    if (currentStep === stepId) return 'bg-primary-blue text-white';
    return 'bg-gray-100 text-gray-500';
  };

  const getStepTextStyle = (stepId) => {
    if (currentStep === 6) return 'text-primary-blue font-bold';
    if (currentStep >= stepId) return 'text-primary-blue font-bold';
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
                <p className="text-xs text-gray-500">
                  {currentStep === 6 
                    ? 'بررسی نهایی' 
                    : `مرحله ${isReportOnly ? (currentStep === 5 ? 3 : currentStep) : currentStep} از ${steps.length}`
                  }
                </p>
            </div>
        </div>

        {/* Dynamic Breadcrumb Steps */}
        <div className="hidden md:flex items-center text-xs gap-2 overflow-x-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center ${getStepTextStyle(step.id)}`}>
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full font-medium shadow-sm transition-colors ${getStepStyle(step.id)}`}>
                        {currentStep > step.id || currentStep === 6 ? <CheckIcon className="w-3 h-3" /> : step.displayNum}
                    </div>
                    <span className={`ms-1.5 whitespace-nowrap ${currentStep === step.id ? 'text-gray-900' : ''}`}>
                      {step.label}
                    </span>
                </div>
                {index < steps.length - 1 && (
                   <ArrowRightIcon className="w-3 h-3 text-gray-400 transform scale-x-[-1] flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Wizard Content Container */}
      <div className="flex-1 min-h-0"> 
        {currentStep === 1 && <Step1_ServiceType />}
        {currentStep === 2 && <Step2_Details />}
        {currentStep === 3 && <Step3_Criteria />}
        {currentStep === 4 && <Step4_Location />}
        {currentStep === 5 && <Step5_Financial />}
        
        {currentStep === 6 && (
            <ReviewPage 
                onBack={prevStep} 
                onConfirm={handleProjectSubmit}
                isSubmitting={isSubmitting}
            />
        )}
      </div>

      {/* Success Modal */}
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
