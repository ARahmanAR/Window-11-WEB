
// components/QuickSettings.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard.tsx';
import Button from './Button.tsx';
import { useSettingsStore } from '../store/settingsStore.ts';
import { Z_INDEX_QUICK_SETTINGS } from '../constants.tsx';

// Dummy Icons
const WifiOnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/>
  </svg>
);
const WifiOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6zM15 13.92V11h-2v2.92l4.29 4.29a.996.996 0 101.41-1.41L15 13.92zM7.58 6.5L10.29 9.21l-1.41 1.41L6.17 7.91l-.71-.71L7.58 6.5zm5.09-3.09C17.07 3.5 20.5 7.9 20.5 12h-2C18.5 8.76 16.24 6.5 13 6.5v-2zm-2.58 10.91l-1.41 1.41L9.29 18.5L7.91 17.12l-1.41-1.41 2.82-2.82 1.41 1.41zm-1.09-10.91l-1.41-1.41L7.29 3.5l1.41 1.41z"/>
  </svg>
);
const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 15.08V17h2v2.08c3.04-.54 5.5-3.01 6.04-6.08H17v-2h2.08c-.54-3.07-3.01-5.54-6.08-6.08V7h-2V4.92c-3.07.54-5.54 3.01-6.08 6.08H7v2H4.92c.54 3.07 3.01 5.54 6.08 6.08z"/>
  </svg>
);
const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 3a9 9 0 009 9 9 9 0 00-9-9zm0 16a7 7 0 01-7-7c0-.28.02-.56.05-.83.74 1.7 2.45 2.93 4.45 2.93 2.76 0 5-2.24 5-5 0-2.01-1.23-3.72-2.93-4.45.27-.03.55-.05.83-.05 3.86 0 7 3.14 7 7s-3.14 7-7 7z"/>
  </svg>
);
const SpeakerVolumeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.81 5 3.53 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

interface QuickSettingsProps {
  onClose: () => void;
}

const QuickSettings: React.FC<QuickSettingsProps> = ({ onClose }) => {
  const { theme, toggleTheme, accentColor } = useSettingsStore();

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [brightness, setBrightness] = useState(70); // 0-100
  const [volume, setVolume] = useState(50); // 0-100

  const buttonClasses = `p-3 rounded-xl flex flex-col items-center justify-center text-sm transition-colors duration-250 w-24 h-24`;
  const activeClasses = `bg-accent-1 text-white`;
  const inactiveClasses = theme === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-700 text-gray-200 hover:bg-gray-600';

  const sliderTrackClasses = theme === 'light' ? 'bg-gray-300' : 'bg-gray-600';
  const sliderThumbClasses = `h-4 w-4 rounded-full bg-accent-1 appearance-none cursor-pointer transition-colors duration-250`;


  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 right-4 w-80 h-[480px] z-quick-settings"
      style={{ zIndex: Z_INDEX_QUICK_SETTINGS }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <GlassCard className="flex flex-col h-full p-4 space-y-4">
        {/* Toggles Grid */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            className={`${buttonClasses} ${wifiEnabled ? activeClasses : inactiveClasses}`}
            onClick={() => setWifiEnabled(!wifiEnabled)}
            aria-checked={wifiEnabled}
            role="switch"
          >
            {wifiEnabled ? <WifiOnIcon className="w-6 h-6 mb-1" /> : <WifiOffIcon className="w-6 h-6 mb-1" />}
            Wi-Fi
          </Button>
          <Button
            className={`${buttonClasses} ${bluetoothEnabled ? activeClasses : inactiveClasses}`}
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            aria-checked={bluetoothEnabled}
            role="switch"
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.5 16.5A.5.5 0 015 16V4a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v12a.5.5 0 01-.5.5h-9zm2-12a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V4.5zm5.5 0A.5.5 0 0012 4V3.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V16H13a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1v-.5a.5.5 0 00-.5-.5h-1v-.5a.5.5 0 00-.5-.5h-1v-.5a.5.5 0 00-.5-.5h-1V4.5z" clipRule="evenodd"></path>
            </svg>
            Bluetooth
          </Button>
          <Button
            className={`${buttonClasses} ${theme === 'dark' ? activeClasses : inactiveClasses}`}
            onClick={toggleTheme}
            aria-checked={theme === 'dark'}
            role="switch"
          >
            {theme === 'dark' ? <MoonIcon className="w-6 h-6 mb-1" /> : <SunIcon className="w-6 h-6 mb-1" />}
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-4 flex-grow">
          <div>
            <label htmlFor="brightness-slider" className={`text-sm font-medium mb-2 block ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
              Brightness ({brightness}%)
            </label>
            <div className="flex items-center gap-2">
              <SunIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
              <input
                id="brightness-slider"
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${sliderTrackClasses}`}
                style={{
                  background: `linear-gradient(to right, var(--accent-color-1) ${brightness}%, ${theme === 'light' ? '#E5E7EB' : '#4B5563'} ${brightness}%)`
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="volume-slider" className={`text-sm font-medium mb-2 block ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
              Volume ({volume}%)
            </label>
            <div className="flex items-center gap-2">
              <SpeakerVolumeIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${sliderTrackClasses}`}
                style={{
                  background: `linear-gradient(to right, var(--accent-color-1) ${volume}%, ${theme === 'light' ? '#E5E7EB' : '#4B5563'} ${volume}%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions (e.g., Project, Connect, Accessibility) */}
        <div className="grid grid-cols-2 gap-2 flex-shrink-0">
          <Button variant="ghost" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'}`}>
            Project
          </Button>
          <Button variant="ghost" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'}`}>
            Connect
          </Button>
          <Button variant="ghost" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-700'}`}>
            Accessibility
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default QuickSettings;