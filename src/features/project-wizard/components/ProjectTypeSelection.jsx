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
      relative group rounded-xl p-6 border transition-all duration-300 ease-out
      flex flex-col items-start gap-4 h-full text-right
      ${active 
        ? 'bg-white border-gray-200 cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-primary-blue/50' 
        : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed grayscale-[0.8] hover:grayscale-0 hover:opacity-80'
      }
    `}
  >
    {/* Icon Container */}
    <div className={`p-4 rounded-xl ${active ? bgClass : 'bg-gray-200'} transition-colors duration-300`}>
      <Icon className={`w-8 h-8 ${active ? colorClass : 'text-gray-500'}`} />
    </div>

    {/* Content */}
    <div className="flex-1 w-full">
      <h3 className={`text-lg font-bold mb-1 ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Action / Badge */}
    <div className="w-full mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
      {!active ? (
         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-1 rounded">
           بزودی
         </span>
      ) : (
        <span className="text-xs font-semibold text-primary-blue flex items-center group-hover:-translate-x-1 transition-transform">
          انتخاب کنید &larr; {/* Left arrow for "Select" in RTL */}
        </span>
      )}
    </div>
  </div>
);

const ProjectTypeSelection = ({ onBack }) => {
  const setProjectType = useWizardStore(state => state.setProjectType);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack} 
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {/* Flip ArrowLeft to point Right for RTL Back */}
          <ArrowLeftIcon className="w-5 h-5 transform scale-x-[-1]" />
        </button>
        <SquaresPlusIcon className="h-6 w-6 text-primary-blue" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">دسته‌بندی پروژه</h1>
          <p className="text-xs text-gray-500">نوع پروژه جدید خود را انتخاب کنید</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                قصد ساخت چه نوع پروژه انرژی را دارید؟
            </h2>
            <p className="text-center text-gray-500 mb-10 text-sm max-w-2xl mx-auto leading-relaxed">
                یکی از دسته‌بندی‌های زیر را انتخاب کنید تا پارامترهای استاندارد، معیارهای خودکارسازی و مدل‌های مالی مخصوص آن صنعت پیکربندی شود.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TypeCard 
                    icon={SunIcon} 
                    title="نیروگاه خورشیدی (PV)" 
                    description="تحلیل سیستم‌های فتوولتائیک شامل داده‌های تابش، شیب زمین، محدودیت‌های فاصله و مدل‌سازی هزینه‌های سرمایه‌ای/عملیاتی." 
                    colorClass="text-amber-500" 
                    bgClass="bg-amber-50" 
                    active={true} 
                    onClick={() => setProjectType('solar')} 
                />
                <TypeCard 
                    icon={Wind} 
                    title="مزرعه بادی" 
                    description="جایگذاری توربین‌های بادی در خشکی، تحلیل سرعت باد، فاصله‌گذاری توربین‌ها و اعتبارسنجی محدودیت‌های صوتی." 
                    colorClass="text-sky-500" 
                    bgClass="bg-sky-50" 
                    active={false} 
                />
                <TypeCard 
                    icon={BatteryCharging} 
                    title="سیستم ترکیبی (هیبرید)" 
                    description="ترکیب انرژی خورشیدی با ذخیره‌ساز باتری (BESS) یا تولید بادی برای پایداری شبکه و بهینه‌سازی خروجی." 
                    colorClass="text-purple-500" 
                    bgClass="bg-purple-50" 
                    active={false} 
                />
                 <TypeCard 
                    icon={Flame} 
                    title="زمین‌گرمایی" 
                    description="تحلیل استخراج حرارت، پتانسیل مخزن، هزینه‌های حفاری و ارزیابی اثرات زیست‌محیطی." 
                    colorClass="text-red-500" 
                    bgClass="bg-red-50" 
                    active={false} 
                />
                 <TypeCard 
                    icon={Trash2} 
                    title="زیست‌توده (Biomass)" 
                    description="پروژه‌های تبدیل زباله به انرژی، تحلیل جذب متان و لجستیک تأمین مواد آلی." 
                    colorClass="text-emerald-500" 
                    bgClass="bg-emerald-50" 
                    active={false} 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeSelection;