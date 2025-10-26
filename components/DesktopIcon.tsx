
// components/DesktopIcon.tsx
import React from 'react';
import { AppConfig } from '../types.ts';
import { useAppStore } from '../store/appStore.ts';
import { useSettingsStore } from '../store/settingsStore.ts';
import { motion } from 'framer-motion';
import { APP_CONFIGS } from '../constants.tsx';

interface DesktopIconProps {
  appConfig: AppConfig;
  size?: 'small' | 'medium' | 'large'; // small for taskbar, medium for start menu, large for desktop
  className?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = React.memo(({ appConfig, size = 'large', className }) => {
  const openApp = useAppStore((state) => state.openApp);
  const { theme } = useSettingsStore();

  const handleClick = () => {
    openApp(appConfig.id);
  };

  const iconSizeClass =
    size === 'small' ? 'w-5 h-5' : size === 'medium' ? 'w-8 h-8' : 'w-12 h-12';
  const textSizeClass =
    size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base';
  const paddingClass =
    size === 'small' ? 'p-2' : size === 'medium' ? 'p-2' : 'p-3'; // padding for the clickable area

  const iconBaseClasses = `flex flex-col items-center justify-center cursor-pointer select-none
                           ${paddingClass} rounded-lg transition-colors duration-150`;

  const hoverEffectClasses =
    theme === 'light'
      ? 'hover:bg-gray-200 active:bg-gray-300'
      : 'hover:bg-gray-700 active:bg-gray-600';

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`${iconBaseClasses} ${hoverEffectClasses} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Open ${appConfig.name}`}
    >
      <div className={`${iconSizeClass} ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        {appConfig.icon}
      </div>
      {size !== 'small' && (
        <span className={`mt-1 ${textSizeClass} text-center ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
          {appConfig.name}
        </span>
      )}
    </motion.div>
  );
});

export default DesktopIcon;