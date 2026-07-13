import React from 'react';
import { useMobileTelemetry } from '../hooks/useMobileTelemetry';

export const SyncOverview: React.FC = () => {
  const { overview, syncStats, isOverviewLoading, isSyncLoading } = useMobileTelemetry();

  if (isOverviewLoading || isSyncLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Metric Cards */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sync Success Rate</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {(syncStats?.successRate * 100).toFixed(1)}%
        </p>
        <p className="text-xs text-green-600 font-medium mt-2">↑ 0.5% vs last week</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Devices (24h)</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {overview?.activeDevices}
        </p>
        <p className="text-xs text-indigo-600 font-medium mt-2">↑ 12 new installs</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Sync Duration</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {overview?.averageSyncDurationMs}ms
        </p>
        <p className="text-xs text-green-600 font-medium mt-2">↓ 20ms vs last week</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Queued Operations</h3>
        <p className="text-3xl font-bold text-orange-600 dark:text-orange-500">
          {syncStats?.queuedOperations}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">Across all offline nodes</p>
      </div>

    </div>
  );
};
