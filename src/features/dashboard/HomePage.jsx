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
        <div className="ml-3">
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
      {change && (
        <p className={`text-xs mt-2 ${changeColor}`}>
          {change} from last month
        </p>
      )}
    </div>
  );
};

const QuickLinkCard = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick} 
    className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
  >
    <div className="p-2 bg-gray-100 rounded-md flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
       {React.cloneElement(icon, { className: "h-5 w-5 text-gray-600" })}
    </div>
    <div className="ml-4 flex-1 min-w-0">
      <h3 className="font-medium text-gray-800 text-sm group-hover:text-primary-blue transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
    </div>
    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-primary-blue transition-all flex-shrink-0 ml-2" />
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

const RecentActivityItem = ({ notification }) => (
  <li className="flex items-start space-x-3 py-3 first:pt-0 last:pb-0">
    <div className="p-1.5 bg-gray-100 rounded-full mt-0.5 flex-shrink-0">
      {getNotificationIcon(notification.type)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-700 leading-snug">
         <span className="font-semibold">{notification.userName}</span> {notification.action} {notification.target && <strong>"{notification.target}"</strong>}
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
      return <div className="p-8 flex justify-center text-gray-500 font-medium">Loading Dashboard...</div>;
  }

  const { 
      user = {}, 
      stats = {}, // Stats now come from DB
      notifications = [] 
  } = dashboardData || {};

  // Render Network Error State if fetch failed
  if (isError) {
      return (
        <div className="p-8 flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Connection Error</h3>
            <p className="text-sm text-gray-500 max-w-md">
                Could not connect to the database server.
            </p>
            <p className="text-xs text-red-400 mt-4 font-mono bg-red-50 px-3 py-2 rounded">
                {error?.message || "Network Error"}
            </p>
        </div>
      );
  }

  // Safe defaults if stats are missing
  const { 
      activeProjects = 0, 
      activeProjectsChange = '', 
      reportsGenerated = 0, 
      reportsChange = '', 
      completedProjects = 0, 
      actionNeededAmount = 0 
  } = stats;

  const userName = user?.fullName?.split(' ')[0] || 'User';

  return (
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-full">
      {/* --- Header --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {userName}!</h1>
        <p className="text-gray-500 text-sm mt-1">Here's a snapshot of your workspace.</p>
      </div>

      {/* --- Stat Cards (Data from DB) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
            icon={<FolderIcon />} 
            title="Active Projects" 
            value={activeProjects} 
            change={activeProjectsChange} 
            changeType={activeProjectsChange.includes('+') ? "increase" : "decrease"} 
        />
        <StatCard 
            icon={<ChartBarIcon />} 
            title="Reports Generated" 
            value={reportsGenerated} 
            change={reportsChange} 
            changeType={reportsChange.includes('+') ? "increase" : "decrease"} 
        />
        <StatCard 
            icon={<CheckCircleIcon />} 
            title="Completed Projects" 
            value={completedProjects} 
        />
        <StatCard 
            icon={<CreditCardIcon />} 
            title="Action Needed" 
            value={`$${(actionNeededAmount || 0).toLocaleString()}`} 
            change="Invoices" 
            changeType="decrease" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Quick Actions --- */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            <QuickLinkCard 
              onClick={() => navigate('/projects')}
              icon={<FolderIcon />} 
              title="Browse Projects" 
              description="View and manage all ongoing and completed projects."
            />
            <QuickLinkCard 
              onClick={() => navigate('/reports')}
              icon={<DocumentTextIcon />} 
              title="Access Report Library" 
              description="Find and download technical, financial, and environmental reports."
            />
            <QuickLinkCard 
              onClick={() => navigate('/payments')}
              icon={<CreditCardIcon />} 
              title="Manage Payments" 
              description="Review your purchase history and download invoices."
            />
          </div>
        </div>

        {/* --- Recent Activity (Notifications from DB) --- */}
        <div>
           <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h2>
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <ul className="divide-y divide-gray-100">
               {notifications.length > 0 ? (
                 notifications.map(notif => (
                    <RecentActivityItem key={notif.id} notification={notif} />
                 ))
               ) : (
                 <p className="text-sm text-gray-400 italic">No recent activity.</p>
               )}
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;