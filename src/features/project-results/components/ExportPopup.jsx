import React from 'react';
import { 
  XMarkIcon, 
  DocumentCheckIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  MapIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const ExportPopup = ({ onClose }) => {

  return (
    // Z-Index 9999 ensures it's above everything
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in font-sans" dir="rtl">
      
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Main Modal - Fixed Size 1500x690 */}
      <div className="relative bg-[#F8F9FC] w-[1500px] h-[690px] max-w-[98vw] max-h-[95vh] rounded-[2rem] shadow-2xl flex flex-col border border-white/50 overflow-hidden ring-1 ring-white/20">
        
        {/* --- Header --- */}
        <div className="h-20 px-8 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/10 p-3 rounded-2xl text-blue-700">
              <DocumentCheckIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">گزارش جامع امکان‌سنجی فنی و اقتصادی</h2>
              <p className="text-sm text-gray-500 mt-0.5">پکیج کامل مطالعات نیروگاه خورشیدی (فرمت PDF)</p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="group p-2 rounded-full hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
          >
            <XMarkIcon className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* --- Content Grid --- */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* COLUMN 1: General & Management */}
            <div className="col-span-3 bg-white rounded-3xl border border-gray-100 p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <ClipboardDocumentListIcon className="w-6 h-6 text-gray-600" />
                <h3 className="font-bold text-gray-700">اطلاعات مدیریتی و اجرایی</h3>
              </div>
              
              <ul className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
                {[
                  '۱. چکیده مدیریتی و شاخص‌های کلیدی',
                  '۲. مقدمه و اهداف پروژه',
                  '۳. فرآیند قانونی احداث در ایران',
                  '۴. مراحل اجرایی و زمان‌بندی کلان',
                  '۶. استانداردهای لازم‌الاجرا (فنی/ایمنی)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4 flex justify-center">
                 <div className="bg-gray-50 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-200">
                    بخش‌های عمومی و قانونی
                 </div>
              </div>
            </div>

            {/* COLUMN 2: Site Selection */}
            <div className="col-span-5 bg-gradient-to-b from-blue-50/50 to-white rounded-3xl border border-blue-100 p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <MapIcon className="absolute -left-10 -bottom-10 w-64 h-64 text-blue-100/50 rotate-12 pointer-events-none" />

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-100/50 relative z-10">
                <MapIcon className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-gray-800"> بررسی فنی و موقعیت (سایت سلکشن)</h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 relative z-10 overflow-y-auto custom-scrollbar pr-1 h-full content-start">
                <ListItem text="شماتیک سایت سلکشن" strong />
                <ListItem text="وزن‌دهی و امتیازدهی معیارها" strong />
                <ListItem text="مختصات UTM و بافر (محدودیت‌ها)" colSpan2 />
                
                <div className="col-span-2 mt-2 mb-1 text-xs font-bold text-blue-500 uppercase tracking-wider">پتانسیل اقتصادی</div>
                <ListItem text="نقشه شبکه برق" small />
                <ListItem text="نقشه راه‌ها و دسترسی" small />
                <ListItem text="نقشه شهر و فرودگاه" small />
                <ListItem text="نقشه راه‌آهن" small />

                <div className="col-span-2 mt-2 mb-1 text-xs font-bold text-blue-500 uppercase tracking-wider">پتانسیل فنی</div>
                <ListItem text="نقشه تابش خورشیدی (GHI)" strong highlight />
                <ListItem text="نقشه شیب و توپوگرافی" small />
                <ListItem text="نقشه کاربری اراضی" small />

                <div className="col-span-2 mt-2 mb-1 text-xs font-bold text-blue-500 uppercase tracking-wider">سایر پتانسیل‌ها</div>
                <ListItem text="منابع آبی و مناطق حفاظت‌شده" small />
                <ListItem text="نقشه گسل (زمین‌شناسی)" small />
                <ListItem text="زمین تخصیص یافته (ظرفیت‌سنجی)" strong />
              </div>
            </div>

            {/* COLUMN 3: Financial - FIXED (No Scrollbar) */}
            <div className="col-span-4 bg-white rounded-3xl border border-gray-100 p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100 shrink-0">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-800">تحلیل اقتصادی و مالی</h3>
              </div>

              {/* Removed overflow-y-auto, added justify-center, tightened spacing */}
              <ul className="flex flex-col justify-center gap-y-2 flex-1 w-full">
                 <ListItem text="مفروضات اساسی تحلیل" />
                 
                 {/* Compacted Green Box */}
                 <li className="bg-green-50/50 rounded-lg p-1.5 border border-green-100">
                    <div className="flex items-center gap-2">
                      <ChartBarIcon className="w-5 h-5 text-green-600" />
                      <div className="flex flex-row items-center gap-2">
                        <span className="text-sm font-bold text-gray-800">هزینه‌های سرمایه‌گذاری</span>
                        <span className="text-[10px] text-gray-500">(CAPEX & OPEX)</span>
                      </div>
                    </div>
                 </li>

                 <ListItem text="ساختار تأمین مالی پروژه" />
                 <ListItem text="تحلیل بازار و محیط قانونی (SWOT)" />
                 <ListItem text="برنامه مدیریت و زمان‌بندی (O&M)" />
                 <ListItem text="صورتحساب سود و زیان (P&L)" strong />
                 <ListItem text="تحلیل جریان نقدی (Cash Flow)" strong />
                 <ListItem text="نقطه سر به سر (Break-Even)" />
                 <ListItem text="شاخص‌های نهایی (IRR, NPV)" highlight strong />
                 <ListItem text="تحلیل حساسیت و ماتریس ریسک" />
                 <ListItem text="نتیجه‌گیری نهایی مالی" />
              </ul>
            </div>

          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="h-20 bg-gray-50 border-t border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500">حجم تقریبی فایل PDF</span>
             <span className="text-lg font-bold text-gray-800 font-mono">~12.4 MB</span>
          </div>

          <div className="flex gap-4">
             <button onClick={onClose} className="px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-200 font-medium transition-colors">
                انصراف
             </button>
             <button className="flex items-center gap-3 bg-[#6D7F9F] hover:bg-[#5a6b89] text-white px-10 py-3 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all">
                <ArrowDownTrayIcon className="w-6 h-6 animate-bounce" />
                <div className="flex flex-col items-start">
                   <span className="text-sm font-bold">دانلود گزارش کامل</span>
                   <span className="text-[10px] opacity-80 font-light">شامل تمام بخش‌های بالا</span>
                </div>
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for List Items
const ListItem = ({ text, strong = false, small = false, highlight = false, colSpan2 = false }) => (
  <div className={`flex items-center gap-2 ${colSpan2 ? 'col-span-2' : ''} ${highlight ? 'bg-blue-50 rounded-lg p-1 -mx-1' : ''}`}>
    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${highlight ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
    <span className={`${strong ? 'font-bold text-gray-800' : 'text-gray-600'} ${small ? 'text-xs' : 'text-sm'} truncate`}>
      {text}
    </span>
  </div>
);

export default ExportPopup;
