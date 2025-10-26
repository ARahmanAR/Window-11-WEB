// components/LockScreen.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard.tsx';
import Button from './Button.tsx';
import { useSettingsStore } from '../store/settingsStore.ts';
// FIX: The import path for constants was ambiguous. It now explicitly points to 'constants.tsx' to avoid module resolution errors with the empty 'constants.ts' file.
import { Z_INDEX_LOCK_SCREEN } from '../constants.tsx';

const LockScreen: React.FC = () => {
  const { theme, wallpaper, login } = useSettingsStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demonstration, any password logs in. In a real app, you'd check credentials.
    if (password.trim() !== '') { // Just ensure it's not empty
      setError(null);
      login();
    } else {
      setError('Password cannot be empty.');
    }
  };

  const textClasses = theme === 'light' ? 'text-gray-900' : 'text-white';
  const inputClasses = theme === 'light' ? 'bg-white text-gray-800 border-gray-300' : 'bg-gray-700 text-gray-100 border-gray-600';

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaper})`, zIndex: Z_INDEX_LOCK_SCREEN }}
      role="dialog"
      aria-labelledby="lockscreen-title"
      aria-describedby="lockscreen-description"
    >
      {/* Dim overlay for better readability */}
      <div className={`absolute inset-0 ${theme === 'light' ? 'bg-black bg-opacity-10' : 'bg-black bg-opacity-40'}`}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center p-8 text-center"
      >
        <h1 id="lockscreen-title" className={`text-6xl font-extrabold ${textClasses} drop-shadow-lg mb-4`}>
          {formattedTime}
        </h1>
        <p className={`text-xl ${textClasses} drop-shadow-md mb-8`}>
          {formattedDate}
        </p>

        <GlassCard className="p-8 w-80 max-w-sm flex flex-col items-center justify-center">
          <p id="lockscreen-description" className={`mb-4 text-lg font-medium ${textClasses}`}>
            Guest User
          </p>
          <form onSubmit={handleLogin} className="w-full">
            <input
              type="password"
              className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-accent-1 focus:border-transparent outline-none ${inputClasses}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              aria-label="Password input"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "password-error" : undefined}
            />
            {error && (
              <p id="password-error" className="text-red-500 text-sm mt-2" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="mt-4 w-full">
              Sign In
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LockScreen;