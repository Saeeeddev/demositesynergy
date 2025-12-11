import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isNavOpen: true, // Corresponds to the secondary sidebar visibility
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
    // Note: We typically don't auto-close nav on panel interaction unless on mobile, 
    // but preserving desktop state is better UX.
  }),
}));