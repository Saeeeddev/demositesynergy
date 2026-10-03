import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useAuthStore } from '../../../stores/useAuthStore';

// --- LOGO IMPORT ---
import LogoImage from '../../../assets/images/sitesynergy_logo_colored.png';

const AuthPage = () => {
    const navigate = useNavigate();
    const { login, register, isLoading, error } = useAuthStore();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // Added for Register
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (newEmail === '') {
            setIsValidEmail(null);
        } else {
            setIsValidEmail(emailRegex.test(newEmail));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let success = false;
        if (isSignUp) {
            success = await register(email, password, fullName);
        } else {
            success = await login(email, password);
        }

        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gray-50" dir="rtl">
            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-6 sm:p-12 h-full bg-white shadow-xl lg:shadow-none z-10">
                <div className="w-full max-w-sm">
                    <div className="mb-10 flex justify-center lg:justify-start">
                        <img 
                            src={LogoImage} 
                            alt="SiteSynergy" 
                            className="h-12 w-auto"
                            onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {isSignUp ? 'ایجاد حساب کاربری' : 'خوش آمدید!'}
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm">
                        {isSignUp ? 'اطلاعات خود را برای شروع وارد کنید' : 'برای دسترسی به داشبورد وارد شوید'}
                    </p>

                    {/* --- ERROR MESSAGE --- */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {error}
                        </div>
                    )}

                    {/* --- TOGGLE --- */}
                    <div className="mt-8">
                        <div className="relative flex w-full p-1 bg-gray-100 rounded-xl border border-gray-200">
                            <span
                                className={clsx(
                                    'absolute top-1 h-[calc(100%-0.5rem)] w-1/2 bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out border border-gray-100',
                                    {
                                        'translate-x-0': !isSignUp, // RTL: Login (Right) -> 0
                                        '-translate-x-full': isSignUp, // RTL: Signup (Left) -> Full Left
                                    }
                                )}
                                aria-hidden="true"
                            />
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)}
                                className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${!isSignUp ? 'text-gray-900' : 'text-gray-500'}`}
                            >
                                ورود
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${isSignUp ? 'text-gray-900' : 'text-gray-500'}`}
                            >
                                ثبت‌نام
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        
                        {/* Full Name (Register Only) */}
                        {isSignUp && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="block w-full pr-10 pl-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue text-sm transition-all text-right"
                                        placeholder="مثال: علی محمدی"
                                        required={isSignUp}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">آدرس ایمیل</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={`block w-full pr-10 pl-10 py-2.5 border rounded-lg shadow-sm text-sm transition-colors text-left dir-ltr ${
                                        isValidEmail === true ? 'border-emerald-500 focus:ring-emerald-500' :
                                        isValidEmail === false ? 'border-red-500 focus:ring-red-500' :
                                        'border-gray-300 focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue'
                                    }`}
                                    placeholder="name@company.com"
                                    required
                                    dir="ltr"
                                />
                                {isValidEmail && (
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pr-10 pl-10 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors text-left"
                                    placeholder="••••••••"
                                    required
                                    minLength="3"
                                    dir="ltr"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-primary-blue cursor-pointer"
                                    tabIndex="-1"
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>در حال پردازش...</span>
                                </>
                            ) : (
                                isSignUp ? 'ثبت‌نام رایگان' : 'ورود به حساب'
                            )}
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-xs text-gray-400">
                        با ورود به سیستم، <span className="text-primary-blue cursor-pointer hover:underline">قوانین و مقررات</span> سایت‌سینرژی را می‌پذیرید.
                    </p>
                </div>
            </div>

            {/* Left Side: Visuals */}
            <div className="hidden lg:block relative bg-[#F8F9FC] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                     {/* 
                       You can replace this placeholder with:
                       <img src="/assets/images/login-bg.png" className="w-full h-full object-cover" />
                     */}
                     <div className="text-center opacity-10">
                        <div className="text-9xl font-black text-gray-300 select-none">GIS</div>
                        <div className="text-4xl font-bold text-gray-400 mt-4">Site Selection</div>
                     </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
        </div>
    );
};

export default AuthPage;
