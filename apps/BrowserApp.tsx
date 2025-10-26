// apps/BrowserApp.tsx
import React, { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';

// Dummy icons
// FIX: Replaced corrupted SVG content with a valid SVG for the refresh icon.
const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M15.325 4.325a.75.75 0 010 1.06l-1.06 1.06a6.5 6.5 0 105.158 5.158l1.06-1.06a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.24 1.24a5.002 5.002 0 01-4.148-7.39l-1.06-1.06a.75.75 0 011.06 0zM5.735 14.265a.75.75 0 010-1.06l1.06-1.06a6.5 6.5 0 00-5.158-5.158L1.616 8.047a.75.75 0 11-1.06-1.06l2.5-2.5a.75.75 0 011.06 0l2.5 2.5a.75.75 0 11-1.06 1.06L4.376 6.74a5.002 5.002 0 014.148 7.39l1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" />
  </svg>
);


const BrowserApp: React.FC = () => {
  const { theme } = useSettingsStore();
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputValue, setInputValue] = useState('https://www.google.com/webhp?igu=1');
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputValue;
    if (!/^https?:\/\//i.test(finalUrl)) {
      try {
        // Attempt to create a URL to see if it's a valid hostname, if not, search it.
        new URL(`https://${finalUrl}`);
        finalUrl = 'https://' + finalUrl;
      } catch (error) {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }
    setUrl(finalUrl);
  };
  
  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  }

  const headerBgClasses = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
  const inputBgClasses = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const borderClasses = theme === 'light' ? 'border-gray-300' : 'border-gray-700';

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-900">
      <header className={`flex items-center p-2 gap-2 border-b ${borderClasses} ${headerBgClasses} flex-shrink-0`}>
        <button 
          onClick={handleRefresh}
          className={`p-2 rounded-full ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'}`}
          aria-label="Refresh page"
        >
          <RefreshIcon className="w-5 h-5" />
        </button>
        <form onSubmit={handleGo} className="flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full px-4 py-2 rounded-full ${inputBgClasses} ${textClasses} focus:outline-none focus:ring-2 focus:ring-accent-1`}
            placeholder="Search Google or type a URL"
            aria-label="Address bar"
          />
        </form>
      </header>
      <main className="flex-grow">
        <iframe
          ref={iframeRef}
          src={url}
          title="Browser content"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </main>
    </div>
  );
};

// FIX: Added the missing default export for the BrowserApp component.
export default BrowserApp;
