
// components/StartMenu.tsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard.tsx';
import Button from './Button.tsx';
import DesktopIcon from './DesktopIcon.tsx';
import { APP_CONFIGS, Z_INDEX_START_MENU } from '../constants.tsx';
import { useSettingsStore } from '../store/settingsStore.ts';

// Dummy user icon
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
  </svg>
);

// Dummy power icon
const PowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.356 2.05L14.288 6.22l.6-.6a1 1 0 00-1.414-1.414l-.6.6-1.06-1.06a1 1 0 10-1.414 1.414l1.06 1.06-.6.6a1 1 0 101.414 1.414l.6-.6 1.06 1.06a1 1 0 001.414-1.414zM10 12a4 4 0 100-8 4 4 0 000 8zm-4.356-7.95L5.712 6.22l-.6-.6a1 1 0 10-1.414 1.414l.6.6-1.06 1.06a1 1 0 101.414 1.414l1.06-1.06.6.6a1 1 0 001.414-1.414l-.6-.6 1.06-1.06a1 1 0 00-1.414-1.414zM10 15a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd"></path>
  </svg>
);

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { theme, logout } = useSettingsStore();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const bgClasses = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const hoverClasses = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[600px] h-[480px] z-start-menu"
      style={{ zIndex: Z_INDEX_START_MENU }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <GlassCard className="flex flex-col h-full overflow-hidden p-2">
        {/* Pinned Apps Section */}
        <div className={`p-4 ${bgClasses} bg-opacity-30 dark:bg-opacity-30 rounded-t-xl`}>
          <h3 className={`text-lg font-semibold mb-3 ${textClasses}`}>Pinned</h3>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {APP_CONFIGS.map(app => (
              <DesktopIcon key={app.id} appConfig={app} size="medium" />
            ))}
          </div>
        </div>

        {/* Recommended/Recent Section */}
        <div className={`flex-grow mt-2 p-4 ${bgClasses} bg-opacity-30 dark:bg-opacity-30 rounded-b-xl overflow-auto`}>
          <h3 className={`text-lg font-semibold mb-3 ${textClasses}`}>Recommended</h3>
          <ul className="space-y-2">
            <li className={`flex items-center gap-3 p-2 rounded-lg ${hoverClasses} cursor-pointer`}>
              <img src="https://picsum.photos/32/32?random=5" alt="Recent item" className="rounded" />
              <div className={textClasses}>
                <p className="font-medium">Recent Document.docx</p>
                <p className="text-sm text-gray-500">2h ago</p>
              </div>
            </li>
            <li className={`flex items-center gap-3 p-2 rounded-lg ${hoverClasses} cursor-pointer`}>
              <img src="https://picsum.photos/32/32?random=6" alt="Recent item" className="rounded" />
              <div className={textClasses}>
                <p className="font-medium">Project Report.pdf</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Bottom Bar: User and Power buttons */}
        <div className={`flex justify-between items-center p-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} flex-shrink-0`}>
          <div className={`flex items-center gap-3 p-2 rounded-lg ${hoverClasses} cursor-pointer`}
               role="button" tabIndex={0} aria-label="User profile">
            <UserIcon className={`w-8 h-8 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`} />
            <span className={`font-medium ${textClasses}`}>Guest User</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <PowerIcon className="w-5 h-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default StartMenu;