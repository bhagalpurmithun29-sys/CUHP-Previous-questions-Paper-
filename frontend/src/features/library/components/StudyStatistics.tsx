import React from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { FiBookOpen, FiClock, FiDownload, FiStar } from 'react-icons/fi';

export const StudyStatistics: React.FC = () => {
  const { overview } = useLibrary();
  
  if (!overview?.statistics) return null;
  const { totalSaved, totalDownloads, totalTimeSpent, completedPapers, activePapers } = overview.statistics;

  const hours = Math.floor(totalTimeSpent / 3600);
  const minutes = Math.floor((totalTimeSpent % 3600) / 60);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <FiClock className="mr-2 text-blue-500" /> Study Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Time Studied</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{hours}h {minutes}m</p>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Completed</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedPapers}</p>
        </div>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/30">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">Saved Papers</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSaved}</p>
        </div>
        
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Active Papers</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{activePapers}</p>
        </div>
      </div>
    </div>
  );
};
