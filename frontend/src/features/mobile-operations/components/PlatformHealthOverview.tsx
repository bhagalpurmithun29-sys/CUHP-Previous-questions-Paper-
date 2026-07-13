import React from 'react';
import { useMobileOperations } from '../hooks/useMobileOperations';

export const PlatformHealthOverview: React.FC = () => {
  const { overview, isOverviewLoading } = useMobileOperations();

  if (isOverviewLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Metric Cards */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">PWA Availability</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {(overview?.pwaAvailability * 100).toFixed(2)}%
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Offline Sync Success</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {(overview?.offlineSyncSuccess * 100).toFixed(2)}%
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Push Delivery Rate</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {(overview?.pushDeliveryRate * 100).toFixed(2)}%
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Alerts</h3>
        <p className={`text-3xl font-bold \${overview?.activeAlerts > 0 ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`}>
          {overview?.activeAlerts}
        </p>
      </div>

    </div>
  );
};
