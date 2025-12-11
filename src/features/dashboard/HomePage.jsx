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
  ExclamationCircleIcon
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

const RecentActivityItem = ({ icon, text, time }) => (
  <li className="flex items-start space-x-3 py-3 first:pt-0 last:pb-0">
    <div className="p-1.5 bg-gray-100 rounded-full mt-0.5 flex-shrink-0">
      {React.cloneElement(icon, { className: "h-4 w-4 text-gray-500" })}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-700 leading-snug">{text}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  </li>
);

const HomePage = () => {
  const navigate = useNavigate();

  // Parallel data fetching with Error State Handling
  const { data: dashboardData, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
        // Attempt fetch
        const [userRes, projectsRes, paymentsRes] = await Promise.all([
            api.get('/user'),
            api.get('/projects'),
            api.get('/payments')
        ]);
        return {
            user: userRes.data,
            projects: projectsRes.data,
            payments: paymentsRes.data
        };
    }
  });

  if (isLoading) {
      return <div className="p-8 flex justify-center text-gray-500 font-medium">Loading Dashboard...</div>;
  }

  // --- SAFE DESTUCTURING FIX ---
  // If connection fails, dashboardData might be undefined even if we handle isError below.
  // We defaults to empty objects/arrays to prevent the crash.
  const { user = {}, projects = [], payments = [] } = dashboardData || {};

  // Render Network Error State if fetch failed
  if (isError) {
      return (
        <div className="p-8 flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Connection Error</h3>
            <p className="text-sm text-gray-500 max-w-md">
                Could not connect to the database server. Please ensure <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">npm run server</code> is running on port 3000.
            </p>
            <p className="text-xs text-red-400 mt-4 font-mono bg-red-50 px-3 py-2 rounded">
                {error?.message || "Network Error"}
            </p>
        </div>
      );
  }

  // Calculate Stats safely
  const activeProjects = Array.isArray(projects) 
    ? projects.filter(p => p.status === 'in-progress' || p.status === 'pending').length 
    : 0;
    
  const completedProjects = Array.isArray(projects) 
    ? projects.filter(p => p.status === 'completed').length 
    : 0;
    
  const pendingPaymentsAmount = Array.isArray(payments)
    ? payments
        .filter(p => p.status === 'Failed' || p.status === 'Pending')
        .reduce((sum, p) => sum + (p.cost || 0), 0)
    : 0;

  const userName = user?.fullName?.split(' ')[0] || 'User';

  return (
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-full">
      {/* --- Header --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {userName}!</h1>
        <p className="text-gray-500 text-sm mt-1">Here's a snapshot of your workspace.</p>
      </div>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
            icon={<FolderIcon />} 
            title="Active Projects" 
            value={activeProjects} 
            change="+2" 
            changeType="increase" 
        />
        <StatCard 
            icon={<ChartBarIcon />} 
            title="Reports Generated" 
            value="8" 
            change="+5%" 
            changeType="increase" 
        />
        <StatCard 
            icon={<CheckCircleIcon />} 
            title="Completed Projects" 
            value={completedProjects} 
        />
        <StatCard 
            icon={<CreditCardIcon />} 
            title="Action Needed" 
            value={`$${pendingPaymentsAmount.toLocaleString()}`} 
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

        {/* --- Recent Activity --- */}
        <div>
           <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h2>
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <ul className="divide-y divide-gray-100">
               <RecentActivityItem 
                 icon={<CheckCircleIcon className="text-emerald-500" />} 
                 text={<><strong>Project "Desert Flats"</strong> has been marked as complete.</>}
                 time="2 hours ago"
               />
               <RecentActivityItem 
                 icon={<DocumentTextIcon className="text-primary-blue" />} 
                 text={<>A new financial report for <strong>"Valley View"</strong> was uploaded.</>}
                 time="1 day ago"
               />
               <RecentActivityItem 
                 icon={<ClockIcon className="text-amber-500" />} 
                 text={<>The deadline for <strong>"Highland Mesa"</strong> has been updated.</>}
                 time="3 days ago"
               />
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;