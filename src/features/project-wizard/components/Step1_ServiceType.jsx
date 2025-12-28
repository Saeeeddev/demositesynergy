import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { 
  MapIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  active, 
  onClick, 
  features 
}) => (
  <button 
    onClick={onClick}
    className={`
      relative flex flex-col items-start text-right p-6 rounded-2xl border-2 transition-all duration-300 w-full h-full group
      ${active 
        ? 'bg-primary-blue/5 border-primary-blue shadow-lg scale-[1.02]' 
        : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
      }
    `}
  >
    <div className={`p-3 rounded-xl mb-4 transition-colors ${active ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary-blue'}`}>
      <Icon className="w-8 h-8" />
    </div>

    <h3 className={`text-lg font-bold mb-2 ${active ? 'text-primary-blue' : 'text-gray-800'}`}>
      {title}
    </h3>
    
    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
      {description}
    </p>

    <div className="mt-auto w-full">
      <div className="space-y-2 mb-6">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <CheckCircleIcon className={`w-4 h-4 ${active ? 'text-primary-blue' : 'text-gray-300'}`} />
            <span>{feat}</span>
          </div>
        ))}
      </div>
      
      <div className={`w-full py-2 rounded-lg text-center text-sm font-bold transition-colors ${
        active 
          ? 'bg-primary-blue text-white' 
          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
      }`}>
        {active ? 'انتخاب شده' : 'انتخاب کنید'}
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
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">نوع خدمات مورد نیاز</h2>
            <p className="text-gray-500">لطفاً سطح تحلیل مورد نظر خود را انتخاب کنید</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option 1: Full Analysis */}
            <ServiceCard 
              icon={MapIcon}
              title="مکان‌یابی + گزارش جامع"
              description="تحلیل کامل شامل شناسایی بهترین لکه‌های زمین بر اساس معیارهای تعیین شده و تولید گزارش امکان‌سنجی کامل."
              active={currentSelection === 'full'}
              onClick={() => setServiceType('full')}
              features={[
                'تحلیل لایه‌های مکانی (GIS)',
                'پیشنهاد بهترین نقاط احداث',
                'محاسبات مالی و فنی دقیق',
                'خروجی نقشه و گزارش PDF'
              ]}
            />

            {/* Option 2: Report Only */}
            <ServiceCard 
              icon={DocumentTextIcon}
              title="فقط گزارش امکان‌سنجی"
              description="مناسب برای زمانی که زمین پروژه مشخص است و تنها نیاز به تحلیل‌های فنی، مالی و تولید گزارش دارید."
              active={currentSelection === 'report'}
              onClick={() => setServiceType('report')}
              features={[
                'تحلیل فنی سایت مشخص شده',
                'مدل‌سازی مالی (CAPEX/OPEX)',
                'تحلیل ریسک و حساسیت',
                'خروجی گزارش استاندارد'
              ]}
            />

          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            {currentSelection === 'report' ? 
              'تذکر: در این حالت مرحله "مکان‌یابی" ساده‌تر خواهد بود.' : 
              'حالت استاندارد با تمام قابلیت‌ها.'
            }
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
