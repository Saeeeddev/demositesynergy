import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center">
           <img 
            src="/assets/images/sitesynergy_logo_colored.png" 
            alt="SiteSynergy" 
            className="h-10 object-contain mb-2"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">SiteSynergy</h2>
        </div>

        {/* Card Container for Forms */}
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-xl sm:px-10 border border-gray-100">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} SiteSynergy. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
