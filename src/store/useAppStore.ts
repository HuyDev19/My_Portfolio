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
  // Khởi tạo theme từ localStorage hoặc system preference
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    if (saved) return saved;
    // Fallback: system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const initialTheme = getInitialTheme();

  // Apply ngay khi khởi tạo store
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }

  return {
    theme: initialTheme,
    isMenuOpen: false,

    toggleTheme: () =>
      set((state) => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        return { theme: next };
      }),

    setTheme: (theme) =>
      set(() => {
        localStorage.setItem('portfolio-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
        return { theme };
      }),

    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  };
});
