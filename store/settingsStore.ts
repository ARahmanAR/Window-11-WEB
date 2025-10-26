
// store/settingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SettingsState } from '../types.ts';
import { DEFAULT_WALLPAPERS, ACCENT_COLORS } from '../constants.tsx';

interface SettingsStore extends SettingsState {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setWallpaper: (wallpaper: string) => void;
  setAccentColor: (color: string) => void;
  login: () => void;
  logout: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      theme: 'light', // Default theme
      wallpaper: DEFAULT_WALLPAPERS[0], // Default wallpaper
      accentColor: ACCENT_COLORS[0], // Default accent color
      isLoggedIn: false, // Default login state

      setTheme: (theme) => {
        set({ theme });
        // Update HTML class for Tailwind dark mode
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(newTheme);
          return { theme: newTheme };
        });
      },
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setAccentColor: (color) => {
        set({ accentColor: color });
        document.documentElement.style.setProperty('--accent-color-1', color);
        // A slightly darker shade for interaction
        const hexToRgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return { r, g, b };
        };
        const rgb = hexToRgb(color);
        const darkRgb = `rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 50)})`;
        document.documentElement.style.setProperty('--accent-color-2', darkRgb);
      },
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'win11-os-settings-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
      onRehydrateStorage: (state) => {
        if (state) {
          // Apply theme and accent color immediately on rehydration
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(state.theme);
          document.documentElement.style.setProperty('--accent-color-1', state.accentColor);

          const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
          };
          const rgb = hexToRgb(state.accentColor);
          const darkRgb = `rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 50)})`;
          document.documentElement.style.setProperty('--accent-color-2', darkRgb);
        }
      },
    }
  )
);

// Initialize HTML class and accent color on first load (even before rehydration)
document.documentElement.classList.add(useSettingsStore.getState().theme);
document.documentElement.style.setProperty('--accent-color-1', useSettingsStore.getState().accentColor);
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};
const rgb = hexToRgb(useSettingsStore.getState().accentColor);
const darkRgb = `rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 50)})`;
document.documentElement.style.setProperty('--accent-color-2', darkRgb);