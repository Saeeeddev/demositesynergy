import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Create an account</h3>
        <p className="mt-2 text-sm text-gray-500">Start your journey with SiteSynergy</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="text" required className="pl-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border" placeholder="John Doe"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EnvelopeIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="email" required className="pl-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border" placeholder="you@example.com"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="password" required className="pl-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border" placeholder="••••••••"/>
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-button-action-blue hover:bg-primary-blue transition-colors">
            Register
            <ArrowRightIcon className="ml-2 h-4 w-4"/>
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link to="/auth/login" className="font-medium text-primary-blue hover:text-indigo-700">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;