import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export default function SecurityPage() {
  const user = useAuthStore((state) => state.user);
  const changePassword = useAuthStore((state) => state.changePassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const isDemo = user?.phone === '09123456789';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('رمز جدید و تکرار آن یکسان نیستند.');
      setIsError(true);
      return;
    }
    const result = await changePassword(currentPassword, newPassword);
    setIsError(!result.success);
    setMessage(result.success ? 'رمز عبور در این مرورگر تغییر کرد.' : result.error);
    if (result.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return <div className="p-6 text-right" dir="rtl">
    <div className="max-w-xl rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">ورود و امنیت</h1>
      <p className="mt-3 text-sm text-gray-600">حساب فعال: <span dir="ltr">{user?.phone}</span></p>
      {isDemo ? <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-blue-900">
        سامانه در حال به‌روزرسانی است و فعلاً فقط حساب آزمایشی فعال است. رمز این حساب ثابت است و امکان تغییر آن وجود ندارد.
      </div> : <>
        <p className="mt-3 text-sm text-gray-600">رمز حساب محلی فقط در همین مرورگر تغییر می‌کند.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">رمز فعلی
            <input type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium">رمز جدید
            <input type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium">تکرار رمز جدید
            <input type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <button type="submit" className="rounded-lg bg-primary-blue px-5 py-2.5 font-semibold text-white">ذخیره رمز جدید</button>
        </form>
        {message && <p role="status" className={`mt-4 text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>{message}</p>}
      </>}
      <Link to="/settings" className="mt-6 block font-semibold text-primary-blue">بازگشت به پروفایل</Link>
    </div>
  </div>;
}
