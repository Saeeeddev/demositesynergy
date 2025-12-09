import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ResultLayout from '../layouts/ResultLayout';

// Lazy Load Pages (This allows you to add files one by one without breaking the build)
// AUTH
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../features/auth/pages/RegisterPage'));

// DASHBOARD
const HomePage = React.lazy(() => import('../features/dashboard/HomePage'));

// PROJECTS
const ProjectsPage = React.lazy(() => import('../features/projects/ProjectsPage'));
const NewProjectPage = React.lazy(() => import('../features/project-wizard/NewProjectPage'));

// RESULTS
const OverviewPage = React.lazy(() => import('../features/project-results/pages/OverviewPage'));
const LocationLayersPage = React.lazy(() => import('../features/project-results/pages/LocationLayersPage'));
const FinancialPage = React.lazy(() => import('../features/project-results/pages/FinancialPage'));

// OTHERS
const ReportsPage = React.lazy(() => import('../features/reports/ReportsPage'));
const PaymentsPage = React.lazy(() => import('../features/payments/PaymentsPage'));
const ProfilePage = React.lazy(() => import('../features/settings/ProfilePage'));

// Loading Fallback
const Loading = () => <div className="h-screen w-full flex items-center justify-center">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  
  // --- AUTH ROUTES ---
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> },
      { path: 'register', element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> },
      { index: true, element: <Navigate to="login" replace /> }
    ]
  },

  // --- MAIN APP ROUTES ---
  {
    path: '/',
    element: <MainLayout />, // Contains Sidebar + Header
    children: [
      { 
        path: 'dashboard', 
        element: <Suspense fallback={<Loading />}><HomePage /></Suspense> 
      },
      { 
        path: 'projects', 
        children: [
          { index: true, element: <Suspense fallback={<Loading />}><ProjectsPage /></Suspense> },
          { path: 'new', element: <Suspense fallback={<Loading />}><NewProjectPage /></Suspense> }
        ]
      },
      { 
        path: 'reports', 
        element: <Suspense fallback={<Loading />}><ReportsPage /></Suspense> 
      },
      { 
        path: 'payments', 
        element: <Suspense fallback={<Loading />}><PaymentsPage /></Suspense> 
      },
      { 
        path: 'settings', 
        element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> 
      },
    ]
  },

  // --- RESULT ROUTES (Separate Layout) ---
  {
    path: 'results/:projectId',
    element: <ResultLayout />, // Special Sidebar for Results
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <Suspense fallback={<Loading />}><OverviewPage /></Suspense> },
      { path: 'location', element: <Suspense fallback={<Loading />}><LocationLayersPage /></Suspense> },
      { path: 'financial', element: <Suspense fallback={<Loading />}><FinancialPage /></Suspense> },
    ]
  }
]);