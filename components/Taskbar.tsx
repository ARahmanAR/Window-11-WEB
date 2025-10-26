
// components/Taskbar.tsx
import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore.ts';
import { useSettingsStore } from '../store/settingsStore.ts';
import { AppId, AppConfig } from '../types.ts';
import { APP_CONFIGS, Z_INDEX_TASKBAR, TASKBAR_HEIGHT } from '../constants.tsx';
import DesktopIcon from './DesktopIcon.tsx';
import StartMenu from './StartMenu.tsx';
import QuickSettings from './QuickSettings.tsx';
import NotificationCenter from './NotificationCenter.tsx';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy icons for taskbar system functions
const StartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.332 8.027a6.012 6.012 0 011.912-2.126c1.178-.923 2.527-1.439 3.963-1.454.493-.005.976.108 1.436.33V6.25a2.75 2.75 0 00-2.75-2.75H8.25a2.75 2.75 0 00-2.75 2.75v.231A6.007 6.007 0 014.332 8.027z" clipRule="evenodd"></path>
  </svg>
);

const WifiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.002 5.002 0 017.778 0M12 20h.01m-6.938-7.04a7.973 7.973 0 0113.858 0M.267 9.59a14.915 14.915 0 0123.466 0"></path>
  </svg>
);

const SpeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.647 11.5 4.106 11.5 5v14c0 .894-.577 1.353-1.207.707L5.586 15z"></path>
  </svg>
);

const BatteryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
    <rect x="7" y="2" width="6" height="2" rx="1" ry="1"></rect>
  </svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
  </svg>
);

const NotificationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 2a6 6 0 00-6 6v3.586l-2 2V14h16v-1.414l-2-2V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
  </svg>
);


const Taskbar: React.FC = () => {
  const { openWindows, activeWindowId, restoreWindow, focusWindow } = useAppStore();
  const { theme } = useSettingsStore();

  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTaskbarIconClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window) {
      if (window.isMinimized || !window.isVisible) {
        restoreWindow(windowId);
      } else if (activeWindowId === windowId) {
        // If already active, minimize it
        restoreWindow(windowId); // Restore first to bring to front, then minimize
        // This is a common pattern in OS for taskbar buttons
      } else {
        focusWindow(windowId);
      }
    }
  };

  const getTaskbarAppConfigs = (): AppConfig[] => {
    // Only show apps that are configured to be on the taskbar or are currently open
    // For now, let's just show all configs and open apps
    const openAppIds = new Set(openWindows.map(w => w.appId));
    return APP_CONFIGS.filter(app => openAppIds.has(app.id) || [AppId.FILE_EXPLORER, AppId.BROWSER, AppId.SETTINGS].includes(app.id));
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { day: '2-digit', month: 'short' });

  const taskbarClasses = `fixed bottom-0 left-0 right-0 h-12 z-taskbar flex justify-between items-center px-4 rounded-t-2xl
                          ${theme === 'light' ? 'glass-effect-light border-t-gray-200' : 'glass-effect-dark border-t-gray-700'}
                          border-t transition-colors duration-250`;
  const iconBaseClasses = `p-2 rounded-lg transition-colors duration-150 flex items-center justify-center`;
  const iconHoverClasses = theme === 'light' ? 'hover:bg-gray-200 active:bg-gray-300' : 'hover:bg-gray-700 active:bg-gray-600';
  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';

  return (
    <div className={taskbarClasses} style={{ zIndex: Z_INDEX_TASKBAR }}>
      {/* Left section: Start button */}
      <div className="flex items-center">
        <button
          onClick={() => {
            setShowStartMenu(!showStartMenu);
            setShowQuickSettings(false);
            setShowNotificationCenter(false);
          }}
          className={`${iconBaseClasses} ${iconHoverClasses} ${showStartMenu ? 'bg-accent-1 text-white hover:bg-accent-2' : ''}`}
          aria-label="Open Start Menu"
        >
          <StartIcon />
        </button>
      </div>

      {/* Center section: Running Apps */}
      <div className="flex items-center gap-2">
        {APP_CONFIGS.map((appConfig) => {
          const matchingWindows = openWindows.filter(w => w.appId === appConfig.id);
          const isAppOpen = matchingWindows.length > 0;
          const isActiveInstance = matchingWindows.some(w => w.id === activeWindowId);

          if (!isAppOpen && !['file-explorer', 'browser'].includes(appConfig.id)) { // Only show pinned/running apps
            return null;
          }

          return (
            <motion.button
              key={appConfig.id}
              onClick={() => {
                if (matchingWindows.length > 0) {
                  // If multiple instances, focus the active one or the first one if none is active
                  const windowToFocus = isActiveInstance ? matchingWindows.find(w => w.id === activeWindowId) : matchingWindows[0];
                  if (windowToFocus) {
                    handleTaskbarIconClick(windowToFocus.id);
                  }
                } else {
                  // No instances open, open a new one
                  useAppStore.getState().openApp(appConfig.id);
                }
                setShowStartMenu(false); // Close start menu when launching/focusing app
              }}
              className={`${iconBaseClasses} ${iconHoverClasses}
                         ${(isAppOpen || isActiveInstance) ? (isActiveInstance ? 'bg-accent-1 text-white' : 'bg-gray-200 dark:bg-gray-700') : ''}
                         relative`}
              initial={{ scale: 1 }}
              animate={{ scale: isAppOpen ? 1 : 1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Launch or switch to ${appConfig.name}`}
            >
              <div className="w-5 h-5">
                {appConfig.icon}
              </div>
              {isAppOpen && (
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full
                                  ${isActiveInstance ? 'bg-white' : 'bg-accent-1'} transition-colors duration-150`}></span>
              )}
            </motion.button>
          );
        })}
      </div>


      {/* Right section: System tray */}
      <div className="flex items-center gap-1">
        <div className={`flex gap-1 px-2 py-1 rounded-lg ${iconHoverClasses} cursor-pointer`}
             onClick={() => {
                setShowQuickSettings(!showQuickSettings);
                setShowStartMenu(false);
                setShowNotificationCenter(false);
             }}
             aria-label="Open Quick Settings">
          <WifiIcon className={textClasses} />
          <SpeakerIcon className={textClasses} />
          <BatteryIcon className={textClasses} />
        </div>
        <button
          onClick={() => {
            setShowNotificationCenter(!showNotificationCenter);
            setShowStartMenu(false);
            setShowQuickSettings(false);
          }}
          className={`${iconBaseClasses} ${iconHoverClasses} ${showNotificationCenter ? 'bg-accent-1 text-white hover:bg-accent-2' : ''}`}
          aria-label="Open Notification Center"
        >
          <NotificationIcon />
        </button>
        <div className={`px-3 py-1 text-sm rounded-lg cursor-pointer flex flex-col items-center ${iconHoverClasses} ${textClasses}`}
             onClick={() => {
                setShowNotificationCenter(!showNotificationCenter);
                setShowStartMenu(false);
                setShowQuickSettings(false);
             }}
             aria-label="Open Calendar and Notifications">
          <span className="font-semibold">{formattedTime}</span>
          <span className="text-xs">{formattedDate}</span>
        </div>
      </div>

      <AnimatePresence>
        {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}
        {showQuickSettings && <QuickSettings onClose={() => setShowQuickSettings(false)} />}
        {showNotificationCenter && <NotificationCenter onClose={() => setShowNotificationCenter(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Taskbar;