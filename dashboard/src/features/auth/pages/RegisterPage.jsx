import { Link } from 'react-router-dom';
import logoColored from '../../../assets/images/sitesynergy_logo_colored.png';
import loginIllustration from '../../../assets/images/loginbackground1.png';

export default function RegisterPage() {
  return <div className="min-h-screen w-full lg:grid lg:grid-cols-2" dir="rtl">
    <div className="flex min-h-screen items-center justify-center bg-white p-6 sm:p-12">
      <div className="w-full max-w-sm">
        <Link to="/login"><img src={logoColored} alt="سایت سینرژی" className="mb-8 h-16" /></Link>
        <h1 className="text-3xl font-bold text-gray-900">ثبت‌نام</h1>
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
          <p className="font-bold">سامانه در حال به‌روزرسانی است</p>
          <p className="mt-2">ثبت‌نام فعلاً غیرفعال است و فقط حساب آزمایشی در دسترس است. برای مشاهده داشبورد، از اطلاعات زیر در صفحه ورود استفاده کنید.</p>
          <p className="mt-3 font-mono text-base font-semibold" dir="ltr">09123456789 / demo1234</p>
        </div>
        <Link to="/login" className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary-blue px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700">
          ورود با حساب آزمایشی
        </Link>
      </div>
    </div>
    <div className="hidden items-center justify-center bg-transparent p-10 lg:flex">
      <img src={loginIllustration} alt="نمای لایه‌های نقشه و زمین" className="max-h-[82vh] w-full max-w-2xl object-contain" />
    </div>
  </div>;
}
