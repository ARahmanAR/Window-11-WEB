

// apps/FileExplorer.tsx
import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';
import { FileSystemEntry } from '../types.ts';

// Dummy icons for file explorer
const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
  </svg>
);

const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-5V4h-.586l.293-.293A.5.5 0 017 3h2.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4h2zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-5V4h-.586l.293-.293A.5.5 0 017 3h2.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4h2z" clipRule="evenodd"></path>
  </svg>
);

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
  </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

const desktopContent: FileSystemEntry[] = [
  { id: '1', name: 'My Documents', type: 'folder', icon: <FolderIcon /> },
  { id: '2', name: 'Images', type: 'folder', icon: <FolderIcon /> },
  { id: '3', name: 'Report.docx', type: 'file', size: '1.2 MB', lastModified: '2023-10-26', icon: <FileIcon /> },
  { id: '4', name: 'Settings.lnk', type: 'file', size: '1 KB', lastModified: '2023-10-25', icon: <FileIcon /> },
];

const sidebarItems = [
  { id: 'home', name: 'Home', icon: <HomeIcon /> },
  { id: 'documents', name: 'Documents', icon: <DocumentIcon /> },
  { id: 'downloads', name: 'Downloads', icon: <DownloadIcon /> },
  { id: 'desktop', name: 'Desktop', icon: <FolderIcon /> },
];

const FileExplorer: React.FC = () => {
  const { theme } = useSettingsStore();
  const [currentPath, setCurrentPath] = useState<FileSystemEntry[]>([{ id: 'root', name: 'This PC', type: 'folder' }]);
  const [currentFolderContent, setCurrentFolderContent] = useState<FileSystemEntry[]>(desktopContent);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Default view

  const pathString = currentPath.map(p => p.name).join(' > ');

  const handleFolderClick = (folder: FileSystemEntry) => {
    // In a real app, you'd fetch content for this folder.
    // For this mock, we'll just append to path and show dummy content.
    setCurrentPath(prev => [...prev, folder]);
    setCurrentFolderContent([
      { id: `${folder.id}-1`, name: `Subfolder ${Math.random().toFixed(2)}`, type: 'folder', icon: <FolderIcon /> },
      { id: `${folder.id}-2`, name: `File ${Math.random().toFixed(2)}.txt`, type: 'file', size: '50 KB', lastModified: '2023-10-27', icon: <FileIcon /> },
    ]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    // For simplicity, always revert to desktopContent for now
    setCurrentFolderContent(desktopContent);
  };

  const itemClasses = theme === 'light' ? 'bg-white hover:bg-gray-100 text-gray-800' : 'bg-gray-800 hover:bg-gray-700 text-gray-200';
  const sidebarItemClasses = theme === 'light' ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-gray-700 text-gray-200';
  const dividerClasses = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const textClasses = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const mutedTextClasses = theme === 'light' ? 'text-gray-500' : 'text-gray-400';
  const headerBgClasses = theme === 'light' ? 'bg-gray-50' : 'bg-gray-900';


  return (
    <div className={`flex h-full ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
      {/* Sidebar */}
      <div className={`w-64 flex-shrink-0 p-4 border-r ${dividerClasses} ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} bg-opacity-70 dark:bg-opacity-70`}>
        <h3 className={`font-semibold mb-4 text-sm ${textClasses}`}>Quick Access</h3>
        <ul className="space-y-1">
          {sidebarItems.map(item => (
            <li
              key={item.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${sidebarItemClasses}`}
              onClick={() => {
                // Mock navigation to root or specific folder
                setCurrentPath([{ id: 'root', name: 'This PC', type: 'folder' }, { id: item.id, name: item.name, type: 'folder' }]);
                setCurrentFolderContent(desktopContent); // Simplistic mock: always show desktop content for now
              }}
              role="treeitem"
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className={`p-3 border-b ${dividerClasses} ${headerBgClasses} bg-opacity-80 dark:bg-opacity-80 flex-shrink-0`}>
          <nav className="flex items-center text-sm" aria-label="Breadcrumb">
            {currentPath.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={`px-2 py-1 rounded-md ${theme === 'light' ? 'text-blue-700 hover:bg-blue-100' : 'text-blue-300 hover:bg-blue-900'} transition-colors duration-150`}
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                </button>
                {index < currentPath.length - 1 && (
                  <span className={`mx-1 ${mutedTextClasses}`}>/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Toolbar (View Mode Toggle) */}
        <div className={`flex justify-end p-2 border-b ${dividerClasses} ${headerBgClasses} bg-opacity-80 dark:bg-opacity-80 flex-shrink-0`}>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className={`p-2 rounded-md ${theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'} transition-colors duration-150`}
            aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-4 overflow-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentFolderContent.map(item => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer ${itemClasses}`}
                  onDoubleClick={() => item.type === 'folder' && handleFolderClick(item)}
                  role="gridcell"
                  tabIndex={0}
                  aria-label={item.name}
                >
                  <span className="w-12 h-12 mb-2 flex items-center justify-center text-accent-1">
                    {item.icon}
                  </span>
                  <span className="text-sm text-center truncate w-full">{item.name}</span>
                  {item.type === 'file' && <span className={`text-xs ${mutedTextClasses}`}>{item.size}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y">
              {currentFolderContent.map(item => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${itemClasses}`}
                  onDoubleClick={() => item.type === 'folder' && handleFolderClick(item)}
                  role="listitem"
                  tabIndex={0}
                  aria-label={item.name}
                >
                  <span className="w-6 h-6 flex items-center justify-center text-accent-1">
                    {item.icon}
                  </span>
                  <span className="flex-grow font-medium">{item.name}</span>
                  <span className={`text-sm ${mutedTextClasses}`}>{item.type === 'file' ? item.size : 'Folder'}</span>
                  <span className={`text-sm ${mutedTextClasses} hidden md:block`}>{item.lastModified}</span>
                </div>
              ))}
            </div>
          )}
          {currentFolderContent.length === 0 && (
            <p className={`text-center py-8 ${mutedTextClasses}`}>This folder is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;