import React from 'react';
import { useMobilePlatform } from '../hooks/useMobilePlatform';

export const DeploymentReadiness: React.FC = () => {
  const { overview, readiness, isOverviewLoading } = useMobilePlatform();

  if (isOverviewLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Production Score</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {overview?.readinessScore}/100
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Modules Integrated</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {overview?.integratedModules}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Approval Status</h3>
        <p className={`text-xl font-bold mt-1 \${readiness?.releaseApproved ? 'text-green-600' : 'text-orange-600'}`}>
          {readiness?.releaseApproved ? 'Release Approved' : 'Pending Sign-off'}
        </p>
      </div>

    </div>
  );
};
