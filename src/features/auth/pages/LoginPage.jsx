import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/useAuthStore';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API Call
    setTimeout(() => {
        // Mock successful login
        login({ id: 1, name: 'Saeed Dolati', email: formData.email }, 'fake-jwt-token');
        setIsLoading(false);
        navigate('/dashboard');
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Sign in to your account</h3>
        <p className="mt-2 text-sm text-gray-500">
          Enter your details to access the dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-blue hover:text-indigo-700">Forgot password?</a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-button-action-blue hover:bg-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : (
                <>
                    Sign in
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link to="/auth/register" className="font-medium text-primary-blue hover:text-indigo-700">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;