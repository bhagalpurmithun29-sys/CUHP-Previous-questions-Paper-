import React from 'react';
import { useDownloadStore } from '../store/downloadStore';
import { FiDownload, FiPause, FiPlay, FiX } from 'react-icons/fi';

export const DownloadManager: React.FC = () => {
  const { queue, removeFromQueue, updateStatus } = useDownloadStore();
  const activeDownloads = queue.filter(q => q.status === 'DOWNLOADING' || q.status === 'PENDING' || q.status === 'PAUSED');

  if (activeDownloads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col transition-all duration-300">
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <FiDownload className="mr-2 text-blue-600 dark:text-blue-400" /> Active Downloads ({activeDownloads.length})
        </h4>
      </div>
      <div className="max-h-60 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {activeDownloads.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-48" title={item.title}>{item.title}</span>
              <div className="flex space-x-1">
                {item.status === 'DOWNLOADING' ? (
                  <button onClick={() => updateStatus(item.id, 'PAUSED')} className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><FiPause size={14}/></button>
                ) : item.status === 'PAUSED' ? (
                  <button onClick={() => updateStatus(item.id, 'DOWNLOADING')} className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><FiPlay size={14}/></button>
                ) : null}
                <button onClick={() => removeFromQueue(item.id)} className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"><FiX size={14}/></button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${item.status === 'PAUSED' ? 'bg-yellow-400' : 'bg-blue-600 dark:bg-blue-500'}`} style={{ width: `${item.progress}%` }}></div>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 flex justify-between font-medium tracking-wide">
              <span>{item.status}</span>
              <span>{Math.round(item.progress)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
