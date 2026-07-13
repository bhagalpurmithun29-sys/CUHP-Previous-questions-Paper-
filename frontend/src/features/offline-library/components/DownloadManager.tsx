import React from 'react';
import { useOfflineLibrary } from '../hooks/useOfflineLibrary';

export const DownloadManager: React.FC = () => {
  const { activeDownloads, isDownloadsLoading, pauseDownload, resumeDownload, cancelDownload } = useOfflineLibrary();

  if (isDownloadsLoading) return <div className="h-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;

  if (!activeDownloads || activeDownloads.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Active Downloads</h3>
      <div className="space-y-4">
        {activeDownloads.map((dl: any) => (
          <div key={dl.id} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
            <div className="flex-1">
               <div className="flex justify-between items-end mb-2">
                 <span className="font-medium text-sm text-gray-900 dark:text-white">Resource {dl.resourceId}</span>
                 <span className="text-xs font-bold text-gray-500">{dl.progress}%</span>
               </div>
               <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                 <div className={`h-full \${dl.status === 'PAUSED' ? 'bg-yellow-500' : 'bg-indigo-500'}`} style={{ width: `\${dl.progress}%` }} />
               </div>
               <p className="text-xs text-gray-500 mt-2 font-medium">{dl.status}</p>
            </div>
            <div className="flex items-center gap-2">
               {dl.status === 'PAUSED' ? (
                 <button onClick={() => resumeDownload.mutate(dl.id)} className="p-2 text-gray-500 hover:text-green-600 transition-colors" aria-label="Resume">▶️</button>
               ) : (
                 <button onClick={() => pauseDownload.mutate(dl.id)} className="p-2 text-gray-500 hover:text-yellow-600 transition-colors" aria-label="Pause">⏸️</button>
               )}
               <button onClick={() => cancelDownload.mutate(dl.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" aria-label="Cancel">✖️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
