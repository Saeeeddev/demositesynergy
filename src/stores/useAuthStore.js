import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  // Example login action
  login: (userData, token) => set({
    user: userData,
    token: token,
  }),

  // Example logout action
  logout: () => set({
    user: null,
    token: null,
  }),
}));