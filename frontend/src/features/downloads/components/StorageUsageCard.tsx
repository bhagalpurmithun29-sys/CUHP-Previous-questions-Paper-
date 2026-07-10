import React from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { FiHardDrive } from 'react-icons/fi';

export const StorageUsageCard: React.FC = () => {
  const { offlineLibrary } = useDownloads();

  const totalBytes = offlineLibrary?.reduce((acc: number, item: any) => acc + (item.paperId?.fileSize || 0), 0) || 0;
  const totalMB = (totalBytes / 1024 / 1024).toFixed(1);
  const maxStorageMB = 500; // 500MB allowance example
  const percentage = Math.min((parseFloat(totalMB) / maxStorageMB) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
          <FiHardDrive size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">Storage Usage</h3>
          <p className="text-sm text-gray-500">Offline Library Storage</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalMB} <span className="text-lg font-medium text-gray-500">MB</span></span>
          <span className="text-sm font-medium text-gray-500">{maxStorageMB} MB max</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 mb-4">
          <div className={`h-2.5 rounded-full transition-all duration-1000 ${percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-purple-600 dark:bg-purple-500'}`} style={{ width: `${percentage}%` }}></div>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          You have {offlineLibrary?.length || 0} documents cached for offline reading. 
          {percentage > 90 && " Consider removing some to free up space."}
        </p>
      </div>
    </div>
  );
};
