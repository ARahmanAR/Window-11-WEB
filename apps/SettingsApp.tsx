
// apps/SettingsApp.tsx
import React, { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';
import Button from '../components/Button.tsx';
import { DEFAULT_WALLPAPERS, ACCENT_COLORS } from '../constants.tsx';

// Dummy icons for settings tabs
const PersonalizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 2 2 4-4 2 2V5l-2 2-4-4-2 2-4-4z" clipRule="evenodd"></path>
  </svg>
);

const SystemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm6 7a1 1 0 100-2 1 1 0 000 2z"></path>
  </svg>
);

const NetworkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 5V3.25a.75.75 0 00-1.5 0V5h-1a1 1 0 100 2h1v1.5a.75.75 0 001.5 0V7h1a1 1 0 100-2h-1zm-6 3a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1H6zm-1.5 0A2.5 2.5 0 002 10.5v4A2.5 2.5 0 004.5 17h4A2.5 2.5 0 0011 14.5v-4A2.5 2.5 0 008.5 8h-4zM16 10a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4zm-1.5 0A2.5 2.5 0 0013 11.5v4A2.5 2.5 0 0015.5 18h4A2.5 2.5 0 0022 14.5v-4A2.5 2.5 0 0018.5 8h-4z" clipRule="evenodd"></path>
  </svg>
);

const PrivacyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-5-8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
  </svg>
);

const AboutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
  </svg>
);


type SettingsTab = 'Personalization' | 'System' | 'Network' | 'Privacy' | 'About';

const SettingsApp: React.FC = () => {
  const { theme, toggleTheme, wallpaper, setWallpaper, accentColor, setAccentColor } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('Personalization');

  const tabList = [
    { id: 'Personalization', icon: <PersonalizeIcon className="w-5 h-5" /> },
    { id: 'System', icon: <SystemIcon className="w-5 h-5" /> },
    { id: 'Network', icon: <NetworkIcon className="w-5 h-5" /> },
    { id: 'Privacy', icon: <PrivacyIcon className="w-5 h-5" /> },
    { id: 'About', icon: <AboutIcon className="w-5 h-5" /> },
  ];

  const sidebarBgClasses = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
  const sidebarItemClasses = theme === 'light' ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-gray-700 text-gray-200';
  const activeSidebarItemClasses = `bg-accent-1 text-white hover:bg-accent-2`;
  const contentBgClasses = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const mutedTextClasses = theme === 'light' ? 'text-gray-500' : 'text-gray-400';
  const dividerClasses = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  const renderTabContent = (tab: SettingsTab) => {
    switch (tab) {
      case 'Personalization':
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold ${textClasses}`}>Personalization</h3>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <label htmlFor="theme-toggle" className={`block font-medium ${textClasses}`}>Theme</label>
              <Button
                id="theme-toggle"
                onClick={toggleTheme}
                variant="secondary"
                className={`w-32 ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}
              >
                {theme === 'light' ? 'Light' : 'Dark'}
              </Button>
            </div>

            {/* Accent Color */}
            <div>
              <p className={`font-medium mb-2 ${textClasses}`}>Accent Color</p>
              <div className="flex gap-3">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${accentColor === color ? 'border-accent-1 ring-2 ring-accent-1 ring-offset-2' : ''} transition-all duration-150`}
                    style={{ backgroundColor: color, borderColor: accentColor === color ? accentColor : (theme === 'light' ? '#E5E7EB' : '#4B5563') }}
                    onClick={() => setAccentColor(color)}
                    aria-label={`Set accent color to ${color}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Wallpaper */}
            <div>
              <p className={`font-medium mb-2 ${textClasses}`}>Background Wallpaper</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DEFAULT_WALLPAPERS.map((wall, index) => (
                  <img
                    key={index}
                    src={wall}
                    alt={`Wallpaper ${index + 1}`}
                    className={`w-full h-28 object-cover rounded-lg cursor-pointer transition-all duration-150
                               ${wallpaper === wall ? 'border-2 border-accent-1 ring-2 ring-accent-1 ring-offset-2' : 'border-2 border-transparent'}`}
                    onClick={() => setWallpaper(wall)}
                    tabIndex={0}
                    aria-label={`Select wallpaper ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'System':
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold ${textClasses}`}>System</h3>
            <p className={`${mutedTextClasses}`}>
              Display, Sound, Notifications, Power &amp; Sleep, Storage.
            </p>
            <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
              <h4 className={`font-semibold mb-2 ${textClasses}`}>About this OS</h4>
              <p className={`text-sm ${mutedTextClasses}`}>Version: 1.0 (Web Edition)</p>
              <p className={`text-sm ${mutedTextClasses}`}>Build: 22H2.22621.1778</p>
              <p className={`text-sm ${mutedTextClasses}`}>Developer: AI Studio</p>
            </div>
          </div>
        );
      case 'Network':
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold ${textClasses}`}>Network &amp; Internet</h3>
            <p className={`${mutedTextClasses}`}>
              Wi-Fi, Ethernet, VPN, Proxy.
            </p>
            <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
              <h4 className={`font-semibold mb-2 ${textClasses}`}>Wi-Fi Status</h4>
              <p className={`text-sm ${mutedTextClasses}`}>Connected to: MyHomeNetwork</p>
              <Button variant="ghost" className="mt-2">
                Disconnect
              </Button>
            </div>
          </div>
        );
      case 'Privacy':
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold ${textClasses}`}>Privacy &amp; Security</h3>
            <p className={`${mutedTextClasses}`}>
              Windows security, App permissions, Find my device.
            </p>
            <ul className="space-y-2">
              <li className={`flex items-center justify-between p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                <span className={textClasses}>Location services</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-accent-1 rounded focus:ring-accent-1 cursor-pointer" defaultChecked />
              </li>
              <li className={`flex items-center justify-between p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                <span className={textClasses}>Microphone access</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-accent-1 rounded focus:ring-accent-1 cursor-pointer" defaultChecked />
              </li>
            </ul>
          </div>
        );
      case 'About':
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold ${textClasses}`}>About</h3>
            <p className={`${mutedTextClasses}`}>
              This is a demonstration of a web-based Windows 11-like operating system.
            </p>
            <p className={`${mutedTextClasses}`}>
              It showcases responsive UI, window management, theme capabilities, and basic application structures.
            </p>
            <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
              <h4 className={`font-semibold mb-2 ${textClasses}`}>Legal Information</h4>
              <p className={`text-sm ${mutedTextClasses}`}>All trademarks are properties of their respective owners.</p>
              <p className={`text-sm ${mutedTextClasses}`}>This project is for educational and demonstrative purposes only.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-full ${textClasses}`}>
      {/* Sidebar Navigation */}
      <nav className={`w-60 flex-shrink-0 p-4 border-r ${dividerClasses} ${sidebarBgClasses} bg-opacity-70 dark:bg-opacity-70`}>
        <h2 className={`text-2xl font-bold mb-6 ${textClasses}`}>Settings</h2>
        <ul className="space-y-1">
          {tabList.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors duration-150
                           ${activeTab === tab.id ? activeSidebarItemClasses : sidebarItemClasses}`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                role="tab"
              >
                {tab.icon}
                <span className="font-medium">{tab.id}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className={`flex-grow p-6 overflow-y-auto ${contentBgClasses} bg-opacity-50 dark:bg-opacity-50`}>
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default SettingsApp;