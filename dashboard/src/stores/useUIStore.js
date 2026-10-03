import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isNavOpen: true,
  isNotificationOpen: false,
  isProfileOpen: false,
  
  // --- NEW: Initial App Loading State ---
  isAppReady: false, 
  setAppReady: (status) => set({ isAppReady: status }),

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  toggleNotifications: () => set((state) => ({
    isNotificationOpen: !state.isNotificationOpen,
    isProfileOpen: false, 
  })),
  toggleProfile: () => set((state) => ({
    isProfileOpen: !state.isProfileOpen,
    isNotificationOpen: false, 
  })),
  closeAllPanels: () => set({
    isNotificationOpen: false,
    isProfileOpen: false,
  }),
  
}));
