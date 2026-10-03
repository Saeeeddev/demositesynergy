import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background-secondary">
    
      <main className="w-full flex-grow flex flex-col items-center justify-center text-center px-4">

        <div className="max-w-lg">
          {/* Optional Icon */}
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Something went wrong</h1>
          <p className="mt-4 text-lg text-gray-600">
            We're sorry for the inconvenience. An unexpected error occurred on our end. Our team has been notified, please try again later.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/"
              className="inline-block h-[42px] py-2 px-8 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn"
            >
              Go Back Home
            </Link>
            <Link
              to="/support"
              className="inline-block h-[42px] py-2 px-8 bg-surface-light text-primary-dark font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </main>
 
    </div>
  );
};

export default ErrorPage;