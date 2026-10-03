// src/components/page/AuthPage.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import logoColored from '../../assets/LogoIconImages/sitesynergy_logo_colored.png';
import loginBg from '../../assets/loginbackground1.png';


const AuthPage = () => {
    const { t, i18n } = useTranslation('Auth');
    const isFarsi = i18n.language === 'fa';

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            mode: isSignUp ? 'Sign Up' : 'Sign In',
            email,
            password
        });
        alert('Submission logic goes here. Check the console.');
    };

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* Left Side: Form */}
            <div className="flex items-center justify-center p-6 sm:p-12 h-full bg-white">
                <div className="w-full max-w-sm">
                    <Link to="/" className="inline-block mb-12">
                        <img src={logoColored} alt={t('logoAlt')} className="h-20 w-auto" />
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900">{isSignUp ? t('welcomeNew') : t('welcomeBack')}</h1>
                    <p className="mt-2 text-gray-600">{t('subtitle')}</p>

                    {/* --- START: RTL-AWARE ANIMATED TOGGLE --- */}
                    <div className="mt-8">
                        <div className="relative flex w-full p-1 bg-gray-100 rounded-lg border border-gray-200">
                            <span
                                className={clsx(
                                    'absolute top-1 h-[calc(100%-0.5rem)] w-1/2 bg-primary-blue rounded-md shadow-sm transition-transform duration-300 ease-in-out',
                                    {
                                        'translate-x-full rtl:-translate-x-full': isSignUp,
                                        'translate-x-0 rtl:-translate-x-0': !isSignUp,
                                    },
                                    isFarsi ? 'right-1' : 'left-1' // Set initial position based on language
                                )}
                                aria-hidden="true"
                            />
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${!isSignUp ? 'text-white' : 'text-gray-600'}`}
                            >
                                {t('signIn')}
                            </button>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${isSignUp ? 'text-white' : 'text-gray-600'}`}
                            >
                                {t('signUp')}
                            </button>
                        </div>
                    </div>
                    {/* --- END: RTL-AWARE ANIMATED TOGGLE --- */}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium text-gray-700 ${isFarsi ? 'text-right' : 'text-left'}`}>{t('emailLabel')}</label>
                            <div className="relative mt-1">
                                <span className={`absolute inset-y-0 flex items-center pointer-events-none ${isFarsi ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className={`w-full p-3 border rounded-lg shadow-sm text-sm transition-colors ${
                                        isValidEmail === true ? 'border-emerald-500 focus:ring-emerald-500' :
                                        isValidEmail === false ? 'border-red-500 focus:ring-red-500' :
                                        'border-gray-300 focus:ring-primary-blue'
                                    } ${isFarsi ? 'pr-10 text-right' : 'pl-10 text-left'}`}
                                    placeholder="name@company.com"
                                    required
                                />
                                {isValidEmail && (
                                    <span className={`absolute inset-y-0 flex items-center ${isFarsi ? 'left-0 pl-3' : 'right-0 pr-3'}`}>
                                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* --- START: UPDATED PASSWORD FIELD --- */}
                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium text-gray-700 ${isFarsi ? 'text-right' : 'text-left'}`}>{t('passwordLabel')}</label>
                            <div className="relative mt-1">
                                <span className={`absolute inset-y-0 flex items-center pointer-events-none ${isFarsi ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-primary-blue transition-colors ${isFarsi ? 'pr-10 text-right' : 'pl-10 text-left'}`}
                                    placeholder={t('passwordPlaceholder')}
                                    required
                                    minLength="8"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute inset-y-0 flex items-center px-3 text-gray-500 hover:text-primary-blue ${isFarsi ? 'left-0' : 'right-0'}`}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {/* --- END: UPDATED PASSWORD FIELD --- */}

                        <button type="submit" className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg text-sm font-semibold hover:bg-primary-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {t('continue')}
                        </button>
                    </form>
                    
                    <p className="mt-10 text-center text-xs text-gray-500">
                        {t('termsPrefix')} <Link to="/terms" className="font-medium text-primary-blue hover:underline">{t('termsLink')}</Link> {t('and')} <Link to="/privacy" className="font-medium text-primary-blue hover:underline">{t('privacyLink')}</Link>.
                    </p>
                </div>
            </div>

            {/* Right Side: Image  <div className="hidden lg:block bg-gradient-to-br from-blue-100 to-cyan-100 relative"> */}
            <div className="hidden lg:block bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={loginBg}
                        alt="Layered data map visualization"
                        className="max-w w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;