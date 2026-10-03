import React, { useEffect } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  BoltIcon, 
  BuildingOfficeIcon, 
  UserIcon, 
  MapPinIcon, 
  AdjustmentsHorizontalIcon, 
  PencilSquareIcon,
  ArrowRightIcon,
  LockClosedIcon // Added Lock Icon
} from '@heroicons/react/24/outline';

const FormInput = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="group">
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ms-1 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
      </div>
      <input
        type={type}
        {...props}
        className="block w-full ps-10 pe-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all shadow-sm hover:bg-white text-right"
      />
    </div>
  </div>
);

const Step2_Details = () => {
  const { projectDetails, updateProjectDetails, handleAnalysisModeSelection, nextStep } = useWizardStore();

  const isReportOnly = projectDetails.serviceType === 'report';

  // Auto-set Analysis Mode to 'standard' if Report Only is active
  useEffect(() => {
    if (isReportOnly && projectDetails.analysisMode !== 'standard') {
      handleAnalysisModeSelection('standard');
    }
  }, [isReportOnly, projectDetails.analysisMode, handleAnalysisModeSelection]);

  const isFormValid = projectDetails.name && projectDetails.company && projectDetails.owner && projectDetails.capacity && projectDetails.location && projectDetails.analysisMode;

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
      <div className="flex-1 p-5 lg:p-6 overflow-y-auto">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          
          {/* Row 1: High Level Info */}
          <div className="md:col-span-2">
            <FormInput 
                label="نام پروژه" 
                name="name" 
                value={projectDetails.name} 
                onChange={updateProjectDetails} 
                placeholder="مثال: نیروگاه خورشیدی آلفا" 
                icon={BoltIcon} 
            />
          </div>
          <div className="md:col-span-2">
            <FormInput 
                label="شرکت" 
                name="company" 
                value={projectDetails.company} 
                onChange={updateProjectDetails} 
                placeholder="مثال: شرکت انرژی سبز" 
                icon={BuildingOfficeIcon} 
            />
          </div>

          {/* Row 2: Stakeholders & Capacity */}
          <FormInput 
            label="کارفرما (مشتری)" 
            name="owner" 
            value={projectDetails.owner} 
            onChange={updateProjectDetails} 
            placeholder="نام کارفرما" 
            icon={UserIcon} 
          />
          <FormInput 
            label="مدیر پروژه" 
            name="manager" 
            value={projectDetails.manager} 
            onChange={updateProjectDetails} 
            placeholder="نام مدیر" 
            icon={UserIcon} 
          />
          <FormInput 
            label="ظرفیت (مگاوات)" 
            name="capacity" 
            type="number" 
            step="0.1" 
            value={projectDetails.capacity} 
            onChange={updateProjectDetails} 
            placeholder="0.0 MW" 
            icon={BoltIcon} 
          />
          <FormInput 
            label="آدرس سایت" 
            name="location" 
            value={projectDetails.location} 
            onChange={updateProjectDetails} 
            placeholder="آدرس محل احداث" 
            icon={MapPinIcon} 
          />

          {/* Row 3: Analysis Mode */}
          <div className="md:col-span-2 mt-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 ms-1 uppercase tracking-wide">
              حالت تحلیل
            </label>
            
            {isReportOnly ? (
              // --- LOCKED STATE DESIGN (Report Only) ---
              <div className="w-full h-[72px] rounded-xl border border-gray-200 bg-gray-50/80 flex items-center px-4 relative overflow-hidden select-none">
                 {/* Right Accent Line */}
                 <div className="absolute inset-y-0 right-0 w-1 bg-gray-300"></div>

                 <div className="flex items-center gap-3 w-full">
                   {/* Lock Icon Box */}
                   <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <LockClosedIcon className="w-5 h-5 text-gray-400" />
                   </div>
                   
                   {/* Text Content */}
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                         <span className="text-sm font-bold text-gray-700">تحلیل استاندارد</span>
                         <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium tracking-tight">
                           خودکار
                         </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight">
                         در حالت «فقط گزارش»، مکان پابی صورت نمیگیرد     .
                      </p>
                   </div>
                 </div>
              </div>
            ) : (
              // --- NORMAL STATE (Standard / Custom Buttons) ---
              <div className="grid grid-cols-2 gap-3 h-[72px]">
                
                <button 
                  onClick={() => handleAnalysisModeSelection('standard')} 
                  className={`relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200 w-full text-right h-full group ${
                      projectDetails.analysisMode === 'standard' 
                      ? 'bg-primary-blue/5 border-primary-blue ring-1 ring-primary-blue/20' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AdjustmentsHorizontalIcon className={`h-5 w-5 transition-colors ${projectDetails.analysisMode === 'standard' ? 'text-primary-blue' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className={`text-sm font-semibold ${projectDetails.analysisMode === 'standard' ? 'text-gray-900' : 'text-gray-700'}`}>استاندارد</span>
                  </div>
                  <span className="text-xs text-gray-500 leading-tight">استفاده از وزن‌دهی پیش‌فرض</span>
                </button>

                <button 
                  onClick={() => handleAnalysisModeSelection('custom')} 
                  className={`relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200 w-full text-right h-full group ${
                      projectDetails.analysisMode === 'custom' 
                      ? 'bg-primary-blue/5 border-primary-blue ring-1 ring-primary-blue/20' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <PencilSquareIcon className={`h-5 w-5 transition-colors ${projectDetails.analysisMode === 'custom' ? 'text-primary-blue' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className={`text-sm font-semibold ${projectDetails.analysisMode === 'custom' ? 'text-gray-900' : 'text-gray-700'}`}>سفارشی</span>
                  </div>
                  <span className="text-xs text-gray-500 leading-tight">تعریف پارامترها توسط کاربر</span>
                </button>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            {!isFormValid ? "* تمام فیلدها الزامی هستند" : ""}
          </div>
          <button 
            onClick={nextStep} 
            disabled={!isFormValid}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isReportOnly ? 'ادامه به اطلاعات مالی' : 'ادامه به معیارها'}
            <ArrowRightIcon className="w-4 h-4 transform scale-x-[-1]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2_Details;


