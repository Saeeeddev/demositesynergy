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

const Loading = () => <div className="h-screen w-full flex items-center justify-center text-gray-500 font-medium">Loading Application...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  
  // --- ADD THIS TO FIX 404 ON LOGIN ---
  {
    path: '/login',
    element: <Navigate to="/auth/login" replace />,
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> },
      { path: 'register', element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> },
      { index: true, element: <Navigate to="login" replace /> }
    ]
  },

  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { 
        path: 'projects', 
        children: [
          { index: true, element: <Suspense fallback={<Loading />}><ProjectsPage /></Suspense> },
          // IMPORTANT: If this file is missing, the app will crash when you click "New Project"
          { path: 'new', element: <Suspense fallback={<Loading />}><NewProjectPage /></Suspense> }
        ]
      },
      { path: 'reports', element: <Suspense fallback={<Loading />}><ReportsPage /></Suspense> },
      { path: 'payments', element: <Suspense fallback={<Loading />}><PaymentsPage /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
    ]
  }
]);