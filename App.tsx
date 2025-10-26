
// App.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from './store/settingsStore.ts';
import { useAppStore } from './store/appStore.ts';
import LockScreen from './components/LockScreen.tsx';
import Desktop from './Desktop.tsx';
import { APP_CONFIGS } from './constants.tsx'; // Ensure APP_CONFIGS is imported

const App: React.FC = () => {
  const { isLoggedIn, theme, wallpaper, accentColor, setTheme, setAccentColor } = useSettingsStore();
  const { openApp } = useAppStore(); // Use openApp for desktop icons

  useEffect(() => {
    // Apply theme class and accent color to HTML element on mount and theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.style.setProperty('--accent-color-1', accentColor);
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const rgb = hexToRgb(accentColor);
    const darkRgb = `rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 50)})`;
    document.documentElement.style.setProperty('--accent-color-2', darkRgb);
  }, [theme, accentColor]);

  // Handle desktop icons
  const desktopIcons = APP_CONFIGS.filter(app => !app.isSingleton); // Example: non-singleton apps on desktop
  // Note: For a full desktop experience, you'd likely want to manage desktop icon positions
  // and potentially allow users to add/remove them. For this iteration, they are static.

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-colors duration-500`}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AnimatePresence>
        {!isLoggedIn ? (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LockScreen />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} // Smooth fade-in after login
            className="absolute inset-0"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;