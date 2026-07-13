import React from 'react';

interface UsageOverviewProps {
  overview: any;
}

export const UsageOverview: React.FC<UsageOverviewProps> = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Platform Overview</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">Total Interactions</p>
          <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-300">
            {overview.totalInteractions.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Monthly Active Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {overview.activeUsers.monthly.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Top Feature</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight mt-1">
            {overview.topFeature}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 font-medium mb-1">Average Latency</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {overview.avgLatency}<span className="text-sm font-normal text-gray-500 ml-1">s</span>
          </p>
        </div>
      </div>
    </div>
  );
};
