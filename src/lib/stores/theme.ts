import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light' | 'system';

function createThemeStore() {
  const isBrowser = typeof window !== 'undefined';
  const initialTheme: Theme = isBrowser
    ? (localStorage.getItem('gezymath_theme') as Theme) || 'dark'
    : 'dark';

  const { subscribe, set } = writable<Theme>(initialTheme);

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      set(theme);
      if (isBrowser) {
        localStorage.setItem('gezymath_theme', theme);
        const root = document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }
    },
    initTheme: () => {
      if (isBrowser) {
        const stored = (localStorage.getItem('gezymath_theme') as Theme) || 'dark';
        const root = document.documentElement;
        if (stored === 'dark' || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
        set(stored);
      }
    }
  };
}

export const themeStore = createThemeStore();
