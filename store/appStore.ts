
// store/appStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppId, WindowState, AppConfig } from '../types.ts';
import { APP_CONFIGS, Z_INDEX_BASE, Z_INDEX_ACTIVE_WINDOW } from '../constants.tsx';

interface AppStoreState {
  openWindows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
}

interface AppStoreActions {
  openApp: (appId: AppId, instanceId?: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, x: number, y: number) => void;
  updateWindowSize: (windowId: string, width: number, height: number) => void;
}

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  persist(
    (set, get) => ({
      openWindows: [],
      activeWindowId: null,
      highestZIndex: Z_INDEX_BASE,

      openApp: (appId: AppId, instanceId?: string) => {
        set((state) => {
          const appConfig = APP_CONFIGS.find(app => app.id === appId);
          if (!appConfig) return state;

          // Check if it's a singleton and already open
          if (appConfig.isSingleton && state.openWindows.some(w => w.appId === appId && w.isVisible)) {
            // If already open, just focus it
            const existingWindow = state.openWindows.find(w => w.appId === appId && w.isVisible);
            if (existingWindow) {
              get().focusWindow(existingWindow.id);
            }
            return state;
          }

          const newZIndex = state.highestZIndex + 1;
          const id = instanceId || `${appId}-${Date.now()}`; // Unique ID for each window instance
          const newWindow: WindowState = {
            id,
            appId,
            title: appConfig.name,
            icon: appConfig.icon,
            isMinimized: false,
            isMaximized: false,
            isVisible: true,
            x: window.innerWidth / 2 - appConfig.defaultWidth / 2 + (Math.random() * 50 - 25),
            y: window.innerHeight / 2 - appConfig.defaultHeight / 2 + (Math.random() * 50 - 25),
            width: appConfig.defaultWidth,
            height: appConfig.defaultHeight,
            zIndex: newZIndex,
          };

          const newOpenWindows = [...state.openWindows, newWindow];

          return {
            openWindows: newOpenWindows,
            activeWindowId: newWindow.id,
            highestZIndex: newZIndex,
          };
        });
        get().focusWindow(get().activeWindowId!); // Ensure new window is focused
      },

      closeWindow: (windowId) => {
        set((state) => ({
          openWindows: state.openWindows.filter((window) => window.id !== windowId),
          activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
        }));
      },

      minimizeWindow: (windowId) => {
        set((state) => ({
          openWindows: state.openWindows.map((window) =>
            window.id === windowId ? { ...window, isMinimized: true, isVisible: false } : window
          ),
          activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (windowId) => {
        set((state) => ({
          openWindows: state.openWindows.map((window) =>
            window.id === windowId
              ? { ...window, isMaximized: true, isMinimized: false, isVisible: true }
              : window
          ),
        }));
        get().focusWindow(windowId);
      },

      restoreWindow: (windowId) => {
        set((state) => ({
          openWindows: state.openWindows.map((window) =>
            window.id === windowId
              ? { ...window, isMinimized: false, isMaximized: false, isVisible: true }
              : window
          ),
        }));
        get().focusWindow(windowId);
      },

      focusWindow: (windowId) => {
        set((state) => {
          const focusedWindow = state.openWindows.find(w => w.id === windowId);
          if (!focusedWindow || focusedWindow.isMinimized) return state;

          const newHighestZIndex = state.highestZIndex + 1;
          const updatedWindows = state.openWindows.map((window) =>
            window.id === windowId
              ? { ...window, zIndex: newHighestZIndex, isVisible: true }
              : window
          );

          // Sort windows to ensure correct Z-index order in the array
          updatedWindows.sort((a, b) => a.zIndex - b.zIndex);

          return {
            openWindows: updatedWindows,
            activeWindowId: windowId,
            highestZIndex: newHighestZIndex,
          };
        });
      },

      updateWindowPosition: (windowId, x, y) => {
        set((state) => ({
          openWindows: state.openWindows.map((window) =>
            window.id === windowId ? { ...window, x, y } : window
          ),
        }));
      },

      updateWindowSize: (windowId, width, height) => {
        set((state) => ({
          openWindows: state.openWindows.map((window) =>
            window.id === windowId ? { ...window, width, height } : window
          ),
        }));
      },
    }),
    {
      name: 'win11-os-app-state-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        openWindows: state.openWindows.map(window => ({
          ...window,
          // Do not persist icon, it's a ReactNode and cannot be serialized
          icon: undefined,
          // Reset zIndex on load to avoid issues with new sessions
          zIndex: Z_INDEX_BASE,
          // Ensure they are visible and not maximized on reload
          isMinimized: false,
          isMaximized: false,
          isVisible: true,
        })),
        activeWindowId: null, // Reset active window on load
        highestZIndex: Z_INDEX_BASE, // Reset highest Z-index
      }),
    }
  )
);