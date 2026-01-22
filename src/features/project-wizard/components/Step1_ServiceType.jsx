import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  MapIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ChartBarIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  active, 
  onClick, 
  features,
  badge 
}) => (
  <button 
    onClick={onClick}
    className={`
      relative flex flex-col items-start text-right p-6 rounded-2xl border-2 transition-all duration-300 w-full h-full group
      ${active 
        ? 'bg-primary-blue/5 border-primary-blue shadow-lg scale-[1.02] ring-1 ring-primary-blue/20' 
        : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
      }
    `}
  >
    <div className="flex justify-between w-full items-start mb-4">
        <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary-blue'}`}>
            <Icon className="w-8 h-8" />
        </div>
        {badge && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${active ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                {badge}
            </span>
        )}
    </div>

    <h3 className={`text-lg font-bold mb-2 ${active ? 'text-primary-blue' : 'text-gray-800'}`}>
      {title}
    </h3>
    
    <p className="text-sm text-gray-500 mb-6 leading-relaxed min-h-[40px]">
      {description}
    </p>

    <div className="w-full border-t border-gray-100 pt-4 mb-6">
      <p className="text-xs font-bold text-gray-400 uppercase mb-3">شامل موارد زیر:</p>
      <div className="grid grid-cols-1 gap-y-2.5">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs font-medium text-gray-600">
            <CheckCircleIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${active ? 'text-emerald-500' : 'text-gray-300'}`} />
            <span className="leading-5">{feat}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-auto w-full">
      <div className={`w-full py-2.5 rounded-xl text-center text-sm font-bold transition-all flex items-center justify-center gap-2 ${
        active 
          ? 'bg-primary-blue text-white shadow-md shadow-blue-200' 
          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
      }`}>
        {active ? (
            <>
                <span>انتخاب شده</span>
                <CheckCircleIcon className="w-5 h-5" />
            </>
        ) : 'انتخاب کنید'}
      </div>
    </div>
  </button>
);

const Step1_ServiceType = () => {
  const { projectDetails, setServiceType, nextStep } = useWizardStore();
  const currentSelection = projectDetails.serviceType;

  const handleContinue = () => {
    if (currentSelection) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Content Area */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">نوع خدمات مورد نیاز</h2>
            <p className="text-gray-500">لطفاً سطح تحلیل و خروجی مورد نظر خود را انتخاب کنید</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Option 1: Full Analysis */}
            <ServiceCard 
              icon={MapIcon}
              title="مکان‌یابی + گزارش جامع"
              description="پکیج کامل شامل تحلیل GIS برای یافتن بهترین زمین به همراه تمامی محاسبات مالی و فنی."
              badge="پیشنهادی"
              active={currentSelection === 'full'}
              onClick={() => setServiceType('full')}
              features={[
                'تحلیل فضایی و سایت‌سلکشن (GIS)',
                'نقشه‌های تابش، شیب، توپوگرافی و کاربری اراضی',
                'تحلیل زیرساخت‌ها (فاصله تا پست برق، جاده، راه)',
                'مدل‌سازی مالی کامل (IRR, NPV, Cash Flow)',
                'تحلیل حساسیت و ریسک سرمایه‌گذاری',
                'گزارش جامع مدیریتی (فنی، حقوقی، بازار)'
              ]}
            />

            {/* Option 2: Report Only */}
            <ServiceCard 
              icon={DocumentTextIcon}
              title="فقط گزارش امکان‌سنجی"
              description="مناسب برای زمانی که زمین مشخص است و تنها نیاز به محاسبات دقیق مالی، فنی و گزارش بانکی دارید."
              badge="بدون GIS"
              active={currentSelection === 'report'}
              onClick={() => setServiceType('report')}
              features={[
                'مدل‌سازی مالی پیشرفته (صورتحساب سود و زیان)',
                'برآورد دقیق هزینه‌ها (CAPEX & OPEX)',
                'تحلیل نقطه سر‌به‌سر و شاخص‌های سودآوری',
                'تحلیل ریسک و آنالیز حساسیت (Sensitivity)',
                'مطالعات بازار، قوانین و محیط حقوقی (SWOT)',
                'برنامه زمان‌بندی اجرا و استانداردهای فنی'
              ]}
            />

          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
             {currentSelection === 'report' && (
                 <>
                    <ScaleIcon className="w-4 h-4 text-amber-500" />
                    <span>توجه: در این حالت، تحلیل‌های مکانی (سایت‌سلکشن) انجام نمی‌شود.</span>
                 </>
             )}
          </div>
          <button 
            onClick={handleContinue} 
            disabled={!currentSelection}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
          >
            ادامه
            <ArrowRightIcon className="w-4 h-4 transform scale-x-[-1]" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Step1_ServiceType;
