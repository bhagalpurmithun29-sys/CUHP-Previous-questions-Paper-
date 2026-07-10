import React from 'react';
import { useDownloadStore } from '../store/downloadStore';
import { FiX, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

export const DownloadQueue: React.FC = () => {
  const { queue, removeFromQueue, clearCompleted } = useDownloadStore();

  if (queue.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <FiClock size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">No active downloads</h3>
        <p className="text-sm text-gray-500 mt-1">Your download queue is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Queue & Recent</h3>
        <button onClick={clearCompleted} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors">Clear Completed</button>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-1 custom-scrollbar">
        {queue.map(item => (
          <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <div className="flex-1 mr-4 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={item.title}>{item.title}</p>
              <div className="flex items-center mt-1 space-x-2">
                {item.status === 'COMPLETED' && <FiCheckCircle className="text-green-500" size={14}/>}
                {item.status === 'FAILED' && <FiAlertCircle className="text-red-500" size={14}/>}
                {(item.status === 'DOWNLOADING' || item.status === 'PENDING') && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {item.status} • {(item.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
            </div>
            <button onClick={() => removeFromQueue(item.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" title="Remove">
              <FiX />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
