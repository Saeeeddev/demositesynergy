import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy Load Pages
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../features/auth/pages/RegisterPage'));
const HomePage = React.lazy(() => import('../features/dashboard/HomePage'));
const ProjectsPage = React.lazy(() => import('../features/projects/ProjectsPage'));
const NewProjectPage = React.lazy(() => import('../features/project-wizard/NewProjectPage'));
const ReportsPage = React.lazy(() => import('../features/reports/ReportsPage'));
const PaymentsPage = React.lazy(() => import('../features/payments/PaymentsPage'));
const ProfilePage = React.lazy(() => import('../features/settings/ProfilePage'));
const ResultPage = React.lazy(() => import('../features/project-results/components/Layout/ResultPageLayout'));

const Loading = () => <div className="h-full w-full flex items-center justify-center text-gray-500 font-medium">در حال بارگذاری...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  
  // --- CORRECTED AUTH ROUTES ---
  // Use a layout route to wrap both login and register
  {
    element: <AuthLayout />,
    children: [
      { 
        path: '/login', // Direct path to login
        element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> 
      },
      { 
        path: '/register', // Direct path to register
        element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> 
      },
    ]
  },

  // Main Dashboard Routes (No changes here)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { 
        path: 'projects', 
        children: [
          { index: true, element: <Suspense fallback={<Loading />}><ProjectsPage /></Suspense> },
          { path: 'new', element: <Suspense fallback={<Loading />}><NewProjectPage /></Suspense> },
          { path: ':id/result', element: <Suspense fallback={<Loading />}><ResultPage /></Suspense> }
        ]
      },
      { path: 'reports', element: <Suspense fallback={<Loading />}><ReportsPage /></Suspense> },
      { path: 'payments', element: <Suspense fallback={<Loading />}><PaymentsPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
    ]
  }
]);