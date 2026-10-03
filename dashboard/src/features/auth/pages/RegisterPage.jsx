import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
  return (
    <div dir="rtl">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">ایجاد حساب کاربری</h3>
        <p className="mt-2 text-sm text-gray-500">سفر خود را با SiteSynergy آغاز کنید</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right">نام کامل</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="text" required className="ps-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border text-right" placeholder="مثال: علی محمدی"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-right">آدرس ایمیل</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"><EnvelopeIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="email" required className="ps-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border text-left" placeholder="you@example.com" dir="ltr"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-right">رمز عبور</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"><LockClosedIcon className="h-5 w-5 text-gray-400"/></div>
            <input type="password" required className="ps-10 block w-full sm:text-sm border-gray-300 rounded-lg p-2.5 border text-left" placeholder="••••••••" dir="ltr"/>
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-button-action-blue hover:bg-primary-blue transition-colors">
            <ArrowRightIcon className="me-2 h-4 w-4 transform scale-x-[-1]"/>
            ثبت‌نام
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">قبلاً ثبت‌نام کرده‌اید؟ </span>
        {/* CORRECTED LINK */}
        <Link to="/login" className="font-medium text-primary-blue hover:text-indigo-700">وارد شوید</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
