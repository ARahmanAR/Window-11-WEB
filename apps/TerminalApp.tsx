

// apps/TerminalApp.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';

const TerminalApp: React.FC = () => {
  const { theme } = useSettingsStore();
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>(['Welcome to Web-Terminal!', 'Type `help` for commands.']);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new output
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    let newOutput: string[] = [];
    newOutput.push(`> ${command}`); // Echo the command

    switch (command.toLowerCase().trim()) {
      case 'help':
        newOutput.push('Available commands:');
        newOutput.push('  `echo [message]` - Prints a message');
        newOutput.push('  `clear` - Clears the terminal');
        newOutput.push('  `date` - Displays current date and time');
        newOutput.push('  `whoami` - Shows current user');
        newOutput.push('  `about` - Information about this terminal');
        break;
      case 'clear':
        setOutput([]); // Clear previous output
        return; // Don't append to current output for clear
      case 'date':
        newOutput.push(new Date().toLocaleString());
        break;
      case 'whoami':
        newOutput.push('guest@web-os-pc');
        break;
      case 'about':
        newOutput.push('Web-Terminal v1.0');
        newOutput.push('A mock terminal for the Windows 11 Web OS project.');
        break;
      default:
        if (command.toLowerCase().startsWith('echo ')) {
          newOutput.push(command.substring(5));
        } else {
          newOutput.push(`Command not found: ${command}`);
        }
        break;
    }
    setOutput((prev) => [...prev, ...newOutput]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const terminalBgClasses = theme === 'light' ? 'bg-gray-900' : 'bg-black'; // Dark background for terminal
  const textClasses = 'text-green-400';
  const promptTextClasses = 'text-blue-400';
  const inputBgClasses = 'bg-transparent border-none outline-none';

  return (
    <div className={`flex flex-col h-full ${terminalBgClasses} text-sm font-mono overflow-hidden`}>
      <div
        ref={terminalRef}
        className="flex-grow p-4 overflow-y-auto custom-scrollbar"
        aria-live="polite"
        aria-atomic="true"
      >
        {output.map((line, index) => (
          <pre key={index} className={line.startsWith('>') ? promptTextClasses : textClasses}>
            {line}
          </pre>
        ))}
      </div>
      <div className={`flex p-4 border-t ${theme === 'light' ? 'border-gray-700' : 'border-gray-800'} flex-shrink-0`}>
        <span className={promptTextClasses}>guest@web-os-pc:~$&nbsp;</span>
        <input
          type="text"
          className={`flex-grow ${inputBgClasses} ${textClasses}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          aria-label="Terminal command input"
        />
      </div>
    </div>
  );
};

export default TerminalApp;