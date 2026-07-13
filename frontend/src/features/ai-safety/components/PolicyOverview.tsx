import React from 'react';

export const PolicyOverview: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Safety Health</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Active Policies</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <span className="text-[10px] text-green-600 font-medium flex items-center mt-1">
            All systems nominal
          </span>
        </div>
        
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Blocked Requests</p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-500">14</p>
          <span className="text-[10px] text-red-600 font-medium flex items-center mt-1">
            Last 24 hours
          </span>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Avg Validation Time</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">14<span className="text-sm font-normal text-gray-500">ms</span></p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Citation Compliance</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">99.8%</p>
        </div>
      </div>
    </div>
  );
};
