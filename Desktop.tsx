
// Desktop.tsx
import React, { useState } from 'react';
import { useAppStore } from './store/appStore.ts';
import { useSettingsStore } from './store/settingsStore.ts';
import Taskbar from './components/Taskbar.tsx';
import Window from './components/Window.tsx';
import { AppId } from './types.ts';
import FileExplorer from './apps/FileExplorer.tsx';
import SettingsApp from './apps/SettingsApp.tsx';
import NotesApp from './apps/NotesApp.tsx';
import TerminalApp from './apps/TerminalApp.tsx';
import BrowserApp from './apps/BrowserApp.tsx';
import { AnimatePresence } from 'framer-motion';

const Desktop: React.FC = () => {
  const { openWindows } = useAppStore();
  const { theme } = useSettingsStore();

  const handleDesktopClick = (e: React.MouseEvent) => {
    // This is a simple way to close open menus/panels on desktop click
    // In a full implementation, this might involve a global state for open panels
    // For now, assume this click closes any active pop-ups like Start Menu, Quick Settings etc.
    // The Taskbar component itself manages its internal state for these, but this can serve
    // as a general "click outside" mechanism if needed.
    // For now, let's keep it simple and let Taskbar manage its panels
  };

  const renderAppContent = (appId: AppId, instanceId: string) => {
    switch (appId) {
      case AppId.FILE_EXPLORER:
        return <FileExplorer />;
      case AppId.SETTINGS:
        return <SettingsApp />;
      case AppId.NOTES:
        return <NotesApp instanceId={instanceId} />;
      case AppId.TERMINAL:
        return <TerminalApp />;
      case AppId.BROWSER:
        return <BrowserApp />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
              App content for {appId}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onClick={handleDesktopClick}
      role="main"
    >
      <AnimatePresence>
        {openWindows.map((window) => (
          <Window key={window.id} window={window}>
            {renderAppContent(window.appId, window.id)}
          </Window>
        ))}
      </AnimatePresence>
      <Taskbar />
    </div>
  );
};

export default Desktop;