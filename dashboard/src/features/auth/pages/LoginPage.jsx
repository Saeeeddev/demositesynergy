import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, DevicePhoneMobileIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../../stores/useAuthStore';
import { ButtonSpinner, InlineErrorBanner } from '../../../components/common/UIStates';
import logoColored from '../../../assets/images/sitesynergy_logo_colored.png';
import loginIllustration from '../../../assets/images/loginbackground1.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const copyDemoCredentials = async () => {
    try {
      await navigator.clipboard.writeText('09123456789 / demo1234');
      setCopyMessage('اطلاعات ورود کپی شد');
    } catch {
      setCopyMessage('کپی انجام نشد؛ از دکمه پر کردن فرم استفاده کنید.');
    }
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handlePhoneChange = (event) => {
    const nextPhone = event.target.value;
    setPhone(nextPhone);
    setIsValidPhone(nextPhone ? /^\+?\d{10,15}$/.test(nextPhone.replace(/\s/g, '')) : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    const success = await login(phone, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2" dir="rtl">
      <div className="flex min-h-screen items-center justify-center bg-white p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 inline-block">
            <img src={logoColored} alt="سایت سینرژی" className="h-16 w-auto" />
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">ورود به حساب</h1>
          <p className="mt-2 text-sm text-gray-600">
            سامانه در حال به‌روزرسانی است. فعلاً فقط با حساب آزمایشی زیر می‌توانید وارد شوید.
          </p>
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
            <p className="font-semibold">شماره و رمز عبور حساب آزمایشی</p>
            <p className="mt-1 font-mono" dir="ltr">09123456789 / demo1234</p>
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={copyDemoCredentials} className="rounded-md bg-white px-3 py-1.5 font-semibold text-primary-blue shadow-sm">کپی با یک کلیک</button>
              <button type="button" onClick={() => { setPhone('09123456789'); setPassword('demo1234'); setIsValidPhone(true); }} className="rounded-md bg-white px-3 py-1.5 font-semibold text-primary-blue shadow-sm">پر کردن فرم</button>
            </div>
            {copyMessage && <p role="status" className="mt-2">{copyMessage}</p>}
          </div>

          {error && (
            <InlineErrorBanner className="mt-4" title="ورود ناموفق بود" message={error} />
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="phone" className="block text-right text-sm font-medium text-gray-700">شماره موبایل</label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-lg border p-3 pr-10 text-left text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:ring-2 ${isValidPhone ? 'pl-10' : 'pl-3'} ${
                      isValidPhone === true
                        ? 'border-emerald-500 focus:ring-emerald-500'
                        : isValidPhone === false
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-primary-blue'
                    }`}
                    placeholder="مثلاً 09123456789"
                    required
                    dir="ltr"
                  />
                  {isValidPhone && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-right text-sm font-medium text-gray-700">رمز عبور</label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 pl-12 pr-10 text-left text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-primary-blue"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                    minLength={6}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500 hover:text-primary-blue"
                    aria-label={showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-semibold text-primary-blue transition-colors hover:text-blue-800">
                  فراموشی رمز عبور؟
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-primary-blue px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <ButtonSpinner className="me-2 h-4 w-4" />
                    در حال ورود...
                  </>
                ) : (
                  'ورود به داشبورد'
                )}
              </button>
            </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            حساب کاربری ندارید؟{' '}
            <Link to="/register" className="font-bold text-primary-blue hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-gray-500">
            با ورود به سیستم، قوانین و مقررات سایت سینرژی را می‌پذیرید.
          </p>
        </div>
      </div>

      <div className="hidden items-center justify-center bg-transparent p-10 lg:flex">
        <img src={loginIllustration} alt="نمای لایه‌های نقشه و زمین" className="max-h-[82vh] w-full max-w-2xl object-contain" />
      </div>
    </div>
  );
};

export default LoginPage;
