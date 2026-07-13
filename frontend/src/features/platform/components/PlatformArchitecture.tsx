import React from 'react';

export const PlatformArchitecture: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Platform Orchestration View</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg text-center border border-indigo-100 dark:border-indigo-800/30">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-1">Active Workflows</p>
          <p className="text-2xl font-black text-indigo-900 dark:text-indigo-300">{data.activeWorkflows.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg text-center border border-emerald-100 dark:border-emerald-800/30">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">Success Rate</p>
          <p className="text-2xl font-black text-emerald-900 dark:text-emerald-300">{data.successRate}%</p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-center border border-blue-100 dark:border-blue-800/30">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">Avg Completion Time</p>
          <p className="text-2xl font-black text-blue-900 dark:text-blue-300">{data.avgCompletionTime}s</p>
        </div>
      </div>
    </div>
  );
};
