import React from 'react';

export const PerformanceMetrics: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Production Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Usage</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12,450</p>
          <span className="text-[10px] text-green-600 font-medium flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-0.5">
              <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
            </svg>
            14% this week
          </span>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Avg Latency</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2<span className="text-sm text-gray-500 font-normal">s</span></p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Approval Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Token Efficiency</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">A-</p>
        </div>
      </div>
    </div>
  );
};
