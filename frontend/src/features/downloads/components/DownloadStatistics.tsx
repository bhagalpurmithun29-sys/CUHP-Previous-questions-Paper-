import React from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { FiTrendingUp, FiActivity, FiDownloadCloud } from 'react-icons/fi';

export const DownloadStatistics: React.FC = () => {
  const { history } = useDownloads();

  const totalDownloads = history?.length || 0;
  
  const successfulDownloads = history?.filter((h: any) => h.status === 'COMPLETED').length || 0;
  const successRate = totalDownloads > 0 ? Math.round((successfulDownloads / totalDownloads) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-6 flex items-center">
        <FiTrendingUp className="mr-2 text-green-500" /> Download Analytics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30 text-center shadow-sm">
          <FiDownloadCloud className="mx-auto text-blue-500 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalDownloads}</div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Total Downloads</div>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30 text-center shadow-sm">
          <FiActivity className="mx-auto text-green-500 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{successRate}%</div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Success Rate</div>
        </div>
      </div>
    </div>
  );
};
