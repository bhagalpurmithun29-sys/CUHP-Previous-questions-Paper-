import React from 'react';
import { useMobileAdministration } from '../hooks/useMobileAdministration';

export const FleetOverview: React.FC = () => {
  const { fleetStatus, isFleetLoading } = useMobileAdministration();

  if (isFleetLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Metric Cards */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Devices</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {fleetStatus?.totalDevices?.toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active PWAs</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {fleetStatus?.activePWAs?.toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">iOS Distribution</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">
          {fleetStatus?.ios?.toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Android Distribution</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-500">
          {fleetStatus?.android?.toLocaleString()}
        </p>
      </div>

    </div>
  );
};
