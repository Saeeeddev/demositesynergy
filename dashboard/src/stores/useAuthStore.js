import { create } from 'zustand';

const ACCOUNTS_KEY = 'site-synergy-demo-accounts-v1';
const SESSION_KEY = 'site-synergy-demo-session-v1';
const DEMO_PHONE = '09123456789';
const DEMO_PASSWORD = 'demo1234';

const normalizePhone = (phone) => phone.replace(/\s/g, '');
const hashPassword = async (password, salt) => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};
const readAccounts = () => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY));
    return Array.isArray(accounts) ? accounts : [];
  }
  catch { return []; }
};
const readSession = () => {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    return session?.phone === DEMO_PHONE ? { fullName: 'کاربر آزمایشی', phone: DEMO_PHONE } : null;
  }
  catch { return null; }
};

export const useAuthStore = create((set) => ({
  user: readSession(),
  isLoading: false,
  error: null,
  clearError: () => set({ error: null }),
  login: async (phone, password) => {
    set({ isLoading: true, error: null });
    const normalized = normalizePhone(phone);
    const user = normalized === DEMO_PHONE && password === DEMO_PASSWORD
      ? { fullName: 'کاربر آزمایشی', phone: DEMO_PHONE }
      : null;
    if (!user) {
      set({ isLoading: false, error: 'سامانه در حال به‌روزرسانی است و فعلاً فقط ورود آزمایشی فعال است. شماره 09123456789 و رمز demo1234 را وارد کنید.' });
      return false;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ user, isLoading: false });
    return true;
  },
  register: async (fullName, phone, password) => {
    void fullName;
    void phone;
    void password;
    set({ error: 'ثبت‌نام در زمان به‌روزرسانی سامانه غیرفعال است. لطفاً از حساب آزمایشی استفاده کنید.' });
    return false;
  },
  changePassword: async (currentPassword, newPassword) => {
    const user = readSession();
    const accounts = readAccounts();
    const accountIndex = accounts.findIndex((account) => account.phone === user?.phone);
    if (accountIndex < 0) return { success: false, error: 'برای تغییر رمز، یک حساب محلی ثبت کنید. رمز حساب آزمایشی ثابت است.' };
    const account = accounts[accountIndex];
    if (account.passwordHash !== await hashPassword(currentPassword, account.salt)) {
      return { success: false, error: 'رمز عبور فعلی نادرست است.' };
    }
    const salt = crypto.randomUUID();
    accounts[accountIndex] = { ...account, salt, passwordHash: await hashPassword(newPassword, salt) };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    return { success: true };
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ user: null, error: null });
  },
}));
