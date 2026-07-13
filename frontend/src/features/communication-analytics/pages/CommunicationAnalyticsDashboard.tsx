import React from 'react';
import { OverviewCards } from '../components/OverviewCards';
import { useCommunicationAnalytics } from '../hooks/useCommunicationAnalytics';

export const CommunicationAnalyticsDashboard: React.FC = () => {
  const { exportData } = useCommunicationAnalytics();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Measure engagement, response rates, and system utilization.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
               Last 30 Days
             </button>
             <button onClick={() => exportData.mutate()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
               Export Report
             </button>
          </div>
        </header>

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Notification Channels Chart (Recharts Stub)</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Department Engagement Chart (Recharts Stub)</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunicationAnalyticsDashboard;
