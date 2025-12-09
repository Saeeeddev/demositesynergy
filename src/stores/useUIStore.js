import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isNavOpen: true, // Corresponds to the desktop secondary sidebar
  isNotificationOpen: false,
  isProfileOpen: false,

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),

  toggleNotifications: () => set((state) => ({
    isNotificationOpen: !state.isNotificationOpen,
    isProfileOpen: false, // Ensure profile panel is closed
  })),

  toggleProfile: () => set((state) => ({
    isProfileOpen: !state.isProfileOpen,
    isNotificationOpen: false, // Ensure notification panel is closed
  })),

  closeAllPanels: () => set({
    isNotificationOpen: false,
    isProfileOpen: false,
  }),
}));