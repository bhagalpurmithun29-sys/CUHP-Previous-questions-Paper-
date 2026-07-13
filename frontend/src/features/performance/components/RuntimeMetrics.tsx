import React from 'react';
import { usePerformance } from '../hooks/usePerformance';

export const RuntimeMetrics: React.FC = () => {
  const { metrics, isMetricsLoading } = usePerformance();

  if (isMetricsLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Metric Cards */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Startup Time</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {metrics?.averageStartupTimeMs}ms
        </p>
        <p className="text-xs text-green-600 font-medium mt-2">PWA Load Event</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Contentful Paint</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">
          {metrics?.averageFcpMs}ms
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time to Interactive</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {metrics?.averageTtiMs}ms
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cache Hit Rate</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-500">
          {(metrics?.cacheHitRate * 100).toFixed(1)}%
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">Workbox Strategy</p>
      </div>

    </div>
  );
};
