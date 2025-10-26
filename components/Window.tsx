// components/Window.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox, ResizableProps, ResizeCallbackData } from 'react-resizable'; 
import { useAppStore } from '../store/appStore.ts';
import { WindowState } from '../types.ts';
import { Z_INDEX_ACTIVE_WINDOW, Z_INDEX_BASE, Z_INDEX_MAXIMIZED, TASKBAR_HEIGHT } from '../constants.tsx'; 
import { useSettingsStore } from '../store/settingsStore.ts';

// Dummy icons for window controls
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const MinimizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd"></path>
  </svg>
);

const MaximizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4 4h12V3H4V4zM4 16h12v-1H4v1zM4 6h12V5H4V6zM4 14h12v-1H4v1z" clipRule="evenodd"></path>
  </svg>
);

const RestoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 4H5v10h10V9h-1V5h-4V4zm-5 1h4v3h4v6H5V5z"></path>
  </svg>
);

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = React.memo(({ window, children }) => {
  const { id, title, icon, x, y, width, height, isMinimized, isMaximized, isVisible, zIndex } = window;
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updateWindowPosition, updateWindowSize, activeWindowId } = useAppStore();
  const { theme } = useSettingsStore();

  const nodeRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const isActive = activeWindowId === id;
  const currentZIndex = isActive ? Z_INDEX_ACTIVE_WINDOW : zIndex;

  const handleDrag = (_: any, data: { x: number; y: number }) => {
    if (!isMaximized) {
      updateWindowPosition(id, data.x, data.y);
    }
  };

  const handleResize = (
    _event: React.SyntheticEvent,
    data: ResizeCallbackData,
  ) => {
    if (!isMaximized) {
      updateWindowSize(id, data.size.width, data.size.height);
    }
  };

  const handleFocus = () => {
    focusWindow(id);
  };

  const handleMaximizeToggle = () => {
    if (isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  const windowClasses = `absolute flex flex-col rounded-2xl overflow-hidden transition-all duration-250 ease-in-out
                         ${theme === 'light' ? 'glass-effect-light border-gray-200' : 'glass-effect-dark border-gray-700'}
                         ${isActive ? 'window-shadow-active' : 'window-shadow'}
                         ${isMinimized || !isVisible ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                         ${isMaximized ? 'w-full h-[calc(100vh-theme(spacing.12))] top-0 left-0 rounded-none' : ''}`; // Adjust for taskbar height

  // Props for react-draggable
  const draggableProps = {
    nodeRef: nodeRef,
    handle: ".window-header",
    position: isMaximized ? { x: 0, y: 0 } : { x, y },
    onDrag: handleDrag,
    onMouseDown: handleFocus,
    bounds: "parent", // Constrain to desktop area
    disabled: isMaximized,
  };

  // Props for react-resizable - using global window object for dimensions
  const resizableProps: ResizableProps = {
    // FIX: The 'window' prop shadows the global window object. Use `globalThis` to access browser dimensions.
    width: isMaximized ? globalThis.innerWidth : width,
    // FIX: The 'window' prop shadows the global window object. Use `globalThis` to access browser dimensions.
    height: isMaximized ? globalThis.innerHeight - TASKBAR_HEIGHT : height, // Adjust for taskbar
    onResizeStop: handleResize,
    minConstraints: [300, 200],
    // FIX: The 'window' prop shadows the global window object. Use `globalThis` to access browser dimensions.
    maxConstraints: [globalThis.innerWidth, globalThis.innerHeight - TASKBAR_HEIGHT],
    resizeHandles: isMaximized ? [] : ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
    className: "relative", // Required for react-resizable styles
  };

  if (isMinimized || !isVisible) {
    return null; // Don't render if minimized or not visible
  }

  return (
    <AnimatePresence>
      <Draggable {...draggableProps}>
        <motion.div
          ref={nodeRef}
          initial={{ opacity: 0, scale: 0.9, y: y + 20, x: x + 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: isMaximized ? 0 : y,
            x: isMaximized ? 0 : x,
            width: isMaximized ? '100vw' : width,
            height: isMaximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : height,
            zIndex: currentZIndex
          }}
          exit={{ opacity: 0, scale: 0.9, y: y + 20, x: x + 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`${windowClasses}`}
          style={{ zIndex: currentZIndex, top: isMaximized ? 0 : y, left: isMaximized ? 0 : x }}
          onClick={handleFocus}
          role="dialog"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-content`}
        >
          <ResizableBox {...resizableProps}>
            <div className="flex flex-col w-full h-full">
              <div
                ref={headerRef}
                className={`window-header flex items-center justify-between p-2 flex-shrink-0 cursor-grab
                           ${isActive ? 'bg-accent-1 bg-opacity-80' : 'bg-transparent'}
                           ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}
                           transition-colors duration-250 rounded-t-2xl`}
                onDoubleClick={handleMaximizeToggle}
              >
                <div className="flex items-center gap-2 px-2">
                  {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
                  <h2 id={`${id}-title`} className="text-sm font-semibold truncate select-none">
                    {title}
                  </h2>
                </div>
                <div className="flex">
                  <button
                    onClick={() => minimizeWindow(id)}
                    className={`p-2 rounded-md ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} transition-colors duration-200`}
                    aria-label="Minimize window"
                  >
                    <MinimizeIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleMaximizeToggle}
                    className={`p-2 rounded-md ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} transition-colors duration-200`}
                    aria-label={isMaximized ? "Restore window" : "Maximize window"}
                  >
                    {isMaximized ? (
                      <RestoreIcon className="w-4 h-4" />
                    ) : (
                      <MaximizeIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => closeWindow(id)}
                    className="p-2 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                    aria-label="Close window"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div id={`${id}-content`} className="flex-grow overflow-auto p-4 bg-white bg-opacity-5 dark:bg-black dark:bg-opacity-5">
                {children}
              </div>
            </div>
          </ResizableBox>
        </motion.div>
      </Draggable>
    </AnimatePresence>
  );
});

export default Window;