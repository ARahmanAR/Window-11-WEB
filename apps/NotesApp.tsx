

// apps/NotesApp.tsx
import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';
import Button from '../components/Button.tsx';

interface NotesAppProps {
  instanceId: string; // To save/load notes for a specific instance
}

const NotesApp: React.FC<NotesAppProps> = ({ instanceId }) => {
  const { theme } = useSettingsStore();
  const [noteContent, setNoteContent] = useState<string>('');

  const localStorageKey = `notes-app-content-${instanceId}`;

  useEffect(() => {
    // Load content from local storage when component mounts
    const savedContent = localStorage.getItem(localStorageKey);
    if (savedContent) {
      setNoteContent(savedContent);
    }
  }, [localStorageKey]);

  const handleSave = () => {
    localStorage.setItem(localStorageKey, noteContent);
    alert('Note saved!');
  };

  const handleClear = () => {
    setNoteContent('');
    localStorage.removeItem(localStorageKey);
  };

  const textareaClasses = `w-full flex-grow p-4 resize-none rounded-lg focus:outline-none focus:ring-2
                           ${theme === 'light' ? 'bg-white text-gray-800 focus:ring-accent-1/50' : 'bg-gray-800 text-gray-200 focus:ring-accent-1/50'}
                           transition-colors duration-150`;
  const buttonGroupClasses = `flex gap-2 justify-end mt-4`;

  return (
    <div className="flex flex-col h-full p-4">
      <textarea
        className={textareaClasses}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Start typing your notes here..."
        aria-label="Note content"
      />
      <div className={buttonGroupClasses}>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        <Button onClick={handleSave}>Save Note</Button>
      </div>
    </div>
  );
};

export default NotesApp;