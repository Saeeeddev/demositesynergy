import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';
import { 
  FolderIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ArrowRightIcon, 
  ChartBarIcon, 
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ icon, title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-emerald-500' : 'text-rose-500';
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 rounded-md">
          {React.cloneElement(icon, { className: "h-5 w-5 text-gray-600" })}
        </div>
        <div className="ms-3">
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
      {change && (
        <p className={`text-xs mt-2 ${changeColor}`}>
          {change} نسبت به ماه قبل
        </p>
      )}
    </div>
  );
};

const QuickLinkCard = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick} 
    className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-right"
  >
    <div className="p-2 bg-gray-100 rounded-md flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
       {React.cloneElement(icon, { className: "h-5 w-5 text-gray-600" })}
    </div>
    <div className="ms-4 flex-1 min-w-0">
      <h3 className="font-medium text-gray-800 text-sm group-hover:text-primary-blue transition-colors tracking-wide">{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-1 tracking-wide">{description}</p>
    </div>
    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:-translate-x-0.5 transition-all flex-shrink-0 ms-2 transform scale-x-[-1]" />
  </button>
);

const getNotificationIcon = (type) => {
    switch (type) {
        case 'success': return <CheckCircleIcon className="h-4 w-4 text-emerald-500" />;
        case 'mention': return <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-sky-500" />;
        case 'failed': return <ExclamationTriangleIcon className="h-4 w-4 text-rose-500" />;
        default: return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
};

// --- CORRECTED COMPONENT ---
const RecentActivityItem = ({ notification }) => (
  <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
    <div className="p-1.5 bg-gray-100 rounded-full mt-0.5 flex-shrink-0">
      {getNotificationIcon(notification.type)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-700 leading-snug">
        {/* 
          This logic now correctly displays the full notification text.
          It handles 'mentions' differently from other system messages.
        */}
        {notification.type === 'mention' ? (
          <>
            <span className="font-semibold">{notification.userName}</span>
            {' '}{notification.action}{' '}
            {notification.target && <strong>"{notification.target}"</strong>}
          </>
        ) : (
          <>
            <span className="font-semibold">{notification.userName}:</span>
            {' '}{notification.action}
          </>
        )}
      </p>
      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
    </div>
  </li>
);


const HomePage = () => {
  const navigate = useNavigate();

  // Fetch Dashboard Data from DB
  const { data: dashboardData, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
        const [userRes, statsRes, notifRes] = await Promise.all([
            api.get('/user'),
            api.get('/dashboardStats'),
            api.get('/notifications?_limit=4&_sort=id&_order=desc')
        ]);
        return {
            user: userRes.data,
            stats: statsRes.data,
            notifications: notifRes.data
        };
    }
  });

  if (isLoading) {
      return <div className="p-8 flex justify-center text-gray-500 font-medium">در حال بارگذاری داشبورد...</div>;
  }

  const { 
      user = {}, 
      stats = {}, 
      notifications = [] 
  } = dashboardData || {};

  if (isError) {
      return (
        <div className="p-8 flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">خطای ارتباط</h3>
            <p className="text-sm text-gray-500 max-w-md">
                ارتباط با سرور پایگاه داده برقرار نشد.
            </p>
            <p className="text-xs text-red-400 mt-4 font-mono bg-red-50 px-3 py-2 rounded" dir="ltr">
                {error?.message || "Network Error"}
            </p>
        </div>
      );
  }

  const { 
      activeProjects = 0, 
      activeProjectsChange = '', 
      reportsGenerated = 0, 
      reportsChange = '', 
      completedProjects = 0, 
      actionNeededAmount = 0 
  } = stats;

  const userName = user?.fullName?.split(' ')[0] || 'کاربر';

  return (
     <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6 text-right" dir="rtl">
  
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-full">
      {/* --- Header --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">خوش آمدید، {userName}!</h1>
        <p className="text-gray-500 text-sm mt-1">نگاهی کلی به وضعیت پروژه‌ها و فعالیت‌های اخیر.</p>
      </div>

      {/* --- Stat Cards (Data from DB) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
            icon={<FolderIcon />} 
            title="پروژه‌های فعال" 
            value={activeProjects} 
            change={activeProjectsChange} 
            changeType={activeProjectsChange.includes('+') ? "increase" : "decrease"} 
        />
        <StatCard 
            icon={<ChartBarIcon />} 
            title="گزارش‌های تولید شده" 
            value={reportsGenerated} 
            change={reportsChange} 
            changeType={reportsChange.includes('+') ? "increase" : "decrease"} 
        />
        <StatCard 
            icon={<CheckCircleIcon />} 
            title="پروژه‌های تکمیل شده" 
            value={completedProjects} 
        />
        <StatCard 
            icon={<CreditCardIcon />} 
            title="نیازمند اقدام" 
            value={`$${(actionNeededAmount || 0).toLocaleString()}`} 
            change="فاکتورها" 
            changeType="decrease" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Quick Actions --- */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">دسترسی سریع</h2>
          <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            <QuickLinkCard 
              onClick={() => navigate('/projects')}
              icon={<FolderIcon />} 
              title="مرور پروژه‌ها" 
              description="مدیریت و مشاهده تمام پروژه‌های جاری و تکمیل شده."
            />
            <QuickLinkCard 
              onClick={() => navigate('/reports')}
              icon={<DocumentTextIcon />} 
              title="کتابخانه گزارش‌ها" 
              description="دسترسی و دانلود گزارش‌های فنی، مالی و محیط‌زیستی."
            />
            <QuickLinkCard 
              onClick={() => navigate('/payments')}
              icon={<CreditCardIcon />} 
              title="مدیریت پرداخت‌ها" 
              description="بررسی تاریخچه خریدها و دانلود فاکتورها."
            />
          </div>
        </div>

        {/* --- Recent Activity (Notifications from DB) --- */}
        <div>
           <h2 className="text-lg font-semibold text-gray-800 mb-3">فعالیت‌های اخیر</h2>
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <ul className="divide-y divide-gray-100">
               {notifications.length > 0 ? (
                 notifications.map(notif => (
                    <RecentActivityItem key={notif.id} notification={notif} />
                 ))
               ) : (
                 <p className="text-sm text-gray-400 italic">فعالیتی ثبت نشده است.</p>
               )}
             </ul>
           </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
