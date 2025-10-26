
// components/NotificationCenter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard.tsx';
import Button from './Button.tsx';
import { useSettingsStore } from '../store/settingsStore.ts';
import { Z_INDEX_NOTIFICATION_CENTER } from '../constants.tsx';

// Dummy icon for notification
const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
  </svg>
);

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const { theme } = useSettingsStore();

  const notifications = [
    { id: '1', title: 'System Update', message: 'Updates are available. Restart to apply.', time: 'Just now' },
    { id: '2', title: 'New Message', message: 'You have 1 new message from John Doe.', time: '5 min ago' },
    { id: '3', title: 'Battery Low', message: 'Your battery is at 20%. Connect to power.', time: '10 min ago' },
  ];

  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const itemBgClasses = theme === 'light' ? 'bg-white hover:bg-gray-100' : 'bg-gray-800 hover:bg-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 right-4 w-96 h-[480px] z-notification-center"
      style={{ zIndex: Z_INDEX_NOTIFICATION_CENTER }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <GlassCard className="flex flex-col h-full p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center flex-shrink-0">
          <h3 className={`text-lg font-semibold ${textClasses}`}>Notifications</h3>
          <Button variant="ghost" className={`${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700'}`}>
            Clear All
          </Button>
        </div>

        {/* Notifications List */}
        <div className="flex-grow overflow-auto space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`${itemBgClasses} rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-colors duration-150`}>
                <InfoIcon className={`w-5 h-5 mt-1 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                <div className="flex-grow">
                  <h4 className={`font-semibold text-sm ${textClasses}`}>{notif.title}</h4>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{notif.message}</p>
                  <span className={`block mt-1 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{notif.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>No new notifications</p>
          )}
        </div>

        {/* Quick Settings (Mini version) - Optional, can be full Quick Settings button */}
        <div className={`flex-shrink-0 p-2 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} text-center`}>
          <Button variant="ghost" className={`${theme === 'light' ? 'text-accent-1 hover:bg-gray-100' : 'text-accent-1 hover:bg-gray-700'} w-full`}>
            Open Full Quick Settings
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default NotificationCenter;