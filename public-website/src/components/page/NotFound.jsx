import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background-secondary">
    
      <main className="w-full flex-grow flex flex-col items-center justify-center text-center px-4">
        
        <div className="max-w-md">
          <p className="text-6xl font-bold text-primary-dark tracking-tighter">404</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Page Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">
            Oops! It seems the page you're looking for has been moved or doesn't exist.
          </p>
          <Link 
            to="/"
            className="mt-8 inline-block h-[42px] py-2 px-8 bg-primary-dark text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-px hover:shadow-action-btn-hover shadow-action-btn"
          >
            Go Back Home
          </Link>
        </div>

      </main>
 
    </div>
  );
};

export default NotFound;