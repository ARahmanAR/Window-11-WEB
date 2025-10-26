
// constants.tsx
import { AppId, AppConfig } from './types.ts';
import React from 'react';

// Icons for apps (simplified SVG for now)
const fileExplorerIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
  </svg>
);

const settingsIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.49 3.17c-.325-1.119-1.353-1.933-2.571-1.933H.991A.993.993 0 000 3.03v15.94a.993.993 0 00.991.993h9.428c1.218 0 2.246-.814 2.571-1.933l2.844-9.84a1.99 1.99 0 000-1.914l-2.844-9.84zM8.5 7.666a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd"></path>
  </svg>
);

const notesIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V3zm-2 2v2H5V5h10zM5 9h10v2H5V9zm0 4h6v2H5v-2z"></path>
  </svg>
);

const terminalIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm6.293 2.293a1 1 0 011.414 0L12 9.586l-2.293 2.293a1 1 0 01-1.414-1.414L9.586 10 7.707 8.121a1 1 0 010-1.414z"></path>
  </svg>
);

const browserIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.126c1.178-.923 2.527-1.439 3.963-1.454.493-.005.976.108 1.436.33V6.25a2.75 2.75 0 00-2.75-2.75H8.25a2.75 2.75 0 00-2.75 2.75v.231A6.007 6.007 0 014.332 8.027zM9.5 7.5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V8a.5.5 0 00-.5-.5H9.5z" clipRule="evenodd"></path>
  </svg>
);

export const APP_CONFIGS: AppConfig[] = [
  {
    id: AppId.FILE_EXPLORER,
    name: 'File Explorer',
    icon: fileExplorerIcon,
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: AppId.SETTINGS,
    name: 'Settings',
    icon: settingsIcon,
    defaultWidth: 700,
    defaultHeight: 500,
    isSingleton: true,
  },
  {
    id: AppId.NOTES,
    name: 'Notes',
    icon: notesIcon,
    defaultWidth: 500,
    defaultHeight: 400,
  },
  {
    id: AppId.TERMINAL,
    name: 'Terminal',
    icon: terminalIcon,
    defaultWidth: 700,
    defaultHeight: 450,
  },
  {
    id: AppId.BROWSER,
    name: 'Browser',
    icon: browserIcon,
    defaultWidth: 900,
    defaultHeight: 650,
  },
];

export const DESKTOP_ICON_SIZE = 64;
export const TASKBAR_HEIGHT = 48;
export const Z_INDEX_BASE = 100;
export const Z_INDEX_MAXIMIZED = 199;
export const Z_INDEX_ACTIVE_WINDOW = 200;
export const Z_INDEX_TASKBAR = 300;
export const Z_INDEX_START_MENU = 301;
export const Z_INDEX_QUICK_SETTINGS = 302;
export const Z_INDEX_NOTIFICATION_CENTER = 302;
export const Z_INDEX_LOCK_SCREEN = 400;

export const DEFAULT_WALLPAPERS = [
  'https://picsum.photos/1920/1080?random=1', // Light theme default
  'https://picsum.photos/1920/1080?random=2', // Dark theme default
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
];

export const ACCENT_COLORS = [
  '#0078D4', // Default Blue
  '#D13438', // Red
  '#00B7C3', // Teal
  '#50C878', // Emerald Green
  '#FFB900', // Yellow
  '#8E44AD', // Purple
];