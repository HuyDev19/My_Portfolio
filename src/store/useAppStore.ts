import { create } from 'zustand';

interface AppState {
  /** Current theme: 'light' | 'dark' */
  theme: 'light' | 'dark';
  /** Full-screen menu state */
  isMenuOpen: boolean;

  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: 'light' | 'dark') => void;

  /** Toggle mobile/fullscreen menu */
  toggleMenu: () => void;
  /** Set menu state */
  setMenuOpen: (isOpen: boolean) => void;
}

/**
 * Global app store — Zustand
 * Quản lý Dark/Light mode và trạng thái Menu Overlay
 */
export const useAppStore = create<AppState>((set) => {
  // Always lock theme to 'dark' to preserve the cinematic cyberpunk aesthetics
  const initialTheme: 'light' | 'dark' = 'dark';

  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
  }

  return {
    theme: initialTheme,
    isMenuOpen: false,

    toggleTheme: () => set(() => ({ theme: 'dark' })),
    setTheme: () => set(() => ({ theme: 'dark' })),

    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  };
});
