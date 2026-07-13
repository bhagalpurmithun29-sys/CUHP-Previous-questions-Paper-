import React, { useState } from 'react';
import { useOfflineLibrary } from '../hooks/useOfflineLibrary';
import { DownloadManager } from '../components/DownloadManager';

export const OfflineLibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('LIBRARY');
  const { storageQuota, isStorageLoading } = useOfflineLibrary();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offline Library & Downloads</h1>
            <p className="text-sm text-gray-500 mt-1">Manage cached content, downloads, and local storage utilization.</p>
          </div>
          
          <div className="text-right">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Storage Quota</span>
             {isStorageLoading ? (
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
             ) : (
               <div className="flex items-center gap-2">
                 <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-indigo-500" 
                     style={{ width: `\${(storageQuota.usedBytes / storageQuota.totalBytes) * 100}%` }} 
                   />
                 </div>
                 <span className="text-sm font-bold text-gray-900 dark:text-white">
                   {formatBytes(storageQuota.usedBytes)}
                 </span>
               </div>
             )}
          </div>
        </header>

        <DownloadManager />

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['LIBRARY', 'COLLECTIONS', 'DOWNLOADED_FILES', 'CACHE_MANAGER', 'INTEGRITY_CHECKS', 'QUOTA'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex items-center justify-center">
          <p className="text-gray-500">Render {activeTab.toLowerCase()} component here</p>
        </div>

      </div>
    </div>
  );
};

export default OfflineLibraryPage;
