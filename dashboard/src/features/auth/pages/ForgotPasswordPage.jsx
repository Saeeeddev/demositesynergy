import { Link } from 'react-router-dom';
import logoColored from '../../../assets/images/sitesynergy_logo_colored.png';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6" dir="rtl">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <img src={logoColored} alt="سایت سینرژی" className="mb-6 h-14" />
        <h1 className="text-2xl font-bold">بازیابی رمز عبور</h1>
        <p className="mt-4 text-gray-600">
          این نسخه به‌صورت محلی در مرورگر اجرا می‌شود و سرویس پیامک ندارد.
          برای ورود آزمایشی از شماره 09123456789 و رمز demo1234 استفاده کنید.
        </p>
        <Link to="/login" className="mt-6 inline-block font-semibold text-primary-blue">بازگشت به ورود</Link>
      </div>
    </div>
  );
}
