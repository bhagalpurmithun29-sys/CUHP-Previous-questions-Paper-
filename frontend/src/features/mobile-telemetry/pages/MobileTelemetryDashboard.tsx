import React, { useState } from 'react';
import { useMobileTelemetry } from '../hooks/useMobileTelemetry';
import { SyncOverview } from '../components/SyncOverview';

export const MobileTelemetryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SYNC_OVERVIEW');
  const { exportReport } = useMobileTelemetry();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mobile Telemetry & Health</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor offline sync performance, platform health, and aggregate mobile metrics.</p>
        </div>
        <button 
          onClick={() => exportReport.mutate()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Export Report
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['SYNC_OVERVIEW', 'OFFLINE_USAGE', 'QUEUE_HEALTH', 'STORAGE_ANALYTICS', 'CACHE_ANALYTICS', 'NETWORK_QUALITY', 'DEVICES', 'REPORTS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors rounded-lg \${activeTab === tab ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 p-6 flex flex-col">
        {activeTab === 'SYNC_OVERVIEW' ? (
           <SyncOverview />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTelemetryDashboard;
