import React from 'react';
import { useAIAdministration } from '../hooks/useAIAdministration';
import { PlatformOverview } from '../components/PlatformOverview';
import { SystemStatus } from '../components/SystemStatus';
import { OperationalAlerts } from '../components/OperationalAlerts';
import { ConfigurationCenter } from '../components/ConfigurationCenter';

export const AIAdministrationDashboardPage: React.FC = () => {
  const { overview, health, alerts, config, isLoadingOverview } = useAIAdministration();

  if (isLoadingOverview) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Platform Operations Center</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Enterprise Administration, Health Monitoring & Configuration</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
               Sync Vector Index
             </button>
             <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
               Generate Report
             </button>
          </div>
        </header>

        {/* Top Row: Executive Aggregates */}
        <PlatformOverview data={overview} />

        {/* Middle/Bottom Row: Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 h-[calc(100vh-280px)]">
          {/* Infrastructure Health */}
          <div className="lg:col-span-4 h-full">
            <SystemStatus health={health} />
          </div>

          {/* Active Operational Alerts */}
          <div className="lg:col-span-4 h-full">
            <OperationalAlerts alerts={alerts || []} />
          </div>

          {/* Configuration Management */}
          <div className="lg:col-span-4 h-full">
            <ConfigurationCenter config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdministrationDashboardPage;
