
// types.ts

export enum AppId {
  FILE_EXPLORER = 'file-explorer',
  SETTINGS = 'settings',
  NOTES = 'notes',
  TERMINAL = 'terminal',
  BROWSER = 'browser',
  CALENDAR = 'calendar',
  PHOTOS = 'photos',
}

export interface WindowState {
  id: string; // Unique ID for the window instance
  appId: AppId;
  title: string;
  icon?: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  isVisible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  wallpaper: string; // URL or identifier for the wallpaper
  accentColor: string; // Hex color code
  isLoggedIn: boolean;
}

export interface AppConfig {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  defaultWidth: number;
  defaultHeight: number;
  isSingleton?: boolean; // If true, only one instance of the app can be open
}

export interface FileSystemEntry {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  lastModified?: string;
  icon?: React.ReactNode;
  children?: FileSystemEntry[];
  content?: string; // For Notes app content
}