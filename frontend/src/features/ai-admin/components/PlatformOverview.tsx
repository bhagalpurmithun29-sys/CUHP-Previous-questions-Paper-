import React from 'react';

export const PlatformOverview: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Executive Overview</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{(data.totalRequests / 1000000).toFixed(1)}M</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 font-medium mb-1">Active Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.activeUsers.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 font-medium mb-1">System Uptime</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">{data.uptime}%</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 font-medium mb-1">Cost Estimate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${data.costEstimate}</p>
        </div>
      </div>
    </div>
  );
};
