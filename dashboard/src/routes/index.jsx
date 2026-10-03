import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// ... existing imports ...
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { useAuthStore } from '../stores/useAuthStore';

// Lazy Load Pages
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../features/auth/pages/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const HomePage = React.lazy(() => import('../features/dashboard/HomePage'));
const ProjectsPage = React.lazy(() => import('../features/projects/ProjectsPage'));
const NewProjectPage = React.lazy(() => import('../features/project-wizard/NewProjectPage'));
const ReportsPage = React.lazy(() => import('../features/reports/ReportsPage'));
const PaymentsPage = React.lazy(() => import('../features/payments/PaymentsPage'));
const ProfilePage = React.lazy(() => import('../features/settings/ProfilePage'));
const SecurityPage = React.lazy(() => import('../features/settings/SecurityPage'));

// Lazy Load Result Pages
const ResultPageLayout = React.lazy(() => import('../features/project-results/components/Layout/ResultPageLayout'));
const LayersPage = React.lazy(() => import('../features/project-results/pages/LayersPage'));
const ProjectOverviewPage = React.lazy(() => import('../features/project-results/pages/ProjectOverviewPage'));
const FinancialPage = React.lazy(() => import('../features/project-results/pages/FinancialPage'));

const ProtectedLayout = () => {
  const user = useAuthStore((state) => state.user);
  return user ? <MainLayout /> : <Navigate to="/login" replace />;
};

// --- NEW APPEALING LOADING COMPONENT ---
const Loading = () => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50/60 backdrop-blur-[2px] min-h-[400px]" dir="rtl">
    {/* Spinner Container */}
    <div className="relative flex items-center justify-center h-20 w-20">
      
      {/* 1. Outer Ping Effect (Subtle Pulse) */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75 animate-ping duration-1000"></span>
      
      {/* 2. Static Ring Background */}
      <div className="absolute h-14 w-14 rounded-full border-4 border-gray-200"></div>

      {/* 3. Spinning Ring (Brand Color) */}
      <div className="absolute h-14 w-14 rounded-full border-4 border-t-transparent border-r-transparent border-primary-blue animate-spin"></div>
      
      {/* 4. Center Dot (Optional Tech Feel) */}
    
    </div>

    {/* Text Section */}
    <div className="mt-6 flex flex-col items-center gap-2">
      <h3 className="text-gray-800 font-bold text-lg tracking-tight font-display">
        سایت‌سینرژی
      </h3>
      <div className="flex items-center gap-1.5 direction-ltr">
        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
        <p className="text-gray-500 text-sm font-medium">در حال دریافت اطلاعات</p>
      </div>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  
  // --- AUTH ROUTES ---
  {
    element: <AuthLayout />,
    children: [
      { 
        path: '/login', 
        element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> 
      },
      { 
        path: '/register', 
        element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> 
      },
      {
        path: '/forgot-password',
        element: <Suspense fallback={<Loading />}><ForgotPasswordPage /></Suspense>
      },
    ]
  },

  // --- DASHBOARD ROUTES ---
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { path: 'dashboard', element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { 
        path: 'projects', 
        children: [
          { index: true, element: <Suspense fallback={<Loading />}><ProjectsPage /></Suspense> },
          { path: 'new', element: <Suspense fallback={<Loading />}><NewProjectPage /></Suspense> },
          
          // --- RESULT MODULE ---
          { 
            path: ':id/result', 
            // When ResultPageLayout is fetching, show Loading
            element: <Suspense fallback={<Loading />}><ResultPageLayout /></Suspense>,
            children: [
              { index: true, element: <Navigate to="map" replace /> }, 
              
              // When switching tabs (e.g., Map -> Financial), show Loading inside the layout
              { path: 'map', element: <Suspense fallback={<Loading />}><LayersPage /></Suspense> },
              { path: 'overview', element: <Suspense fallback={<Loading />}><ProjectOverviewPage /></Suspense> },
              { path: 'financial', element: <Suspense fallback={<Loading />}><FinancialPage /></Suspense> }
            ]
          }
        ]
      },
      { path: 'reports', element: <Suspense fallback={<Loading />}><ReportsPage /></Suspense> },
      { path: 'payments', element: <Suspense fallback={<Loading />}><PaymentsPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
      { path: 'settings/security', element: <Suspense fallback={<Loading />}><SecurityPage /></Suspense> },
    ]
  }
]);
