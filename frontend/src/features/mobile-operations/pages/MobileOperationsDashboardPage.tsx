import React, { useState } from 'react';
import { useMobileOperations } from '../hooks/useMobileOperations';
import { PlatformHealthOverview } from '../components/PlatformHealthOverview';
import { ServiceStatus } from '../components/ServiceStatus';
import { IncidentCenter } from '../components/IncidentCenter';

export const MobileOperationsDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('PLATFORM_HEALTH');
  const { overview, isOverviewLoading } = useMobileOperations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mobile Operations & Incidents</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor platform health, active incidents, and SLA metrics.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
           <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Health Score:</span>
           {isOverviewLoading ? (
              <div className="w-10 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
           ) : (
              <span className={`text-xl font-bold \${overview?.platformHealthScore > 95 ? 'text-green-600' : 'text-orange-600'}`}>
                {overview?.platformHealthScore}%
              </span>
           )}
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['PLATFORM_HEALTH', 'SERVICE_STATUS', 'INCIDENT_CENTER', 'ALERTS', 'PWA_HEALTH', 'OFFLINE_SYNC', 'PUSH_DELIVERY', 'BACKGROUND_SYNC', 'VERSIONS'].map(tab => (
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
        {activeTab === 'PLATFORM_HEALTH' ? (
           <PlatformHealthOverview />
        ) : activeTab === 'SERVICE_STATUS' ? (
           <ServiceStatus />
        ) : activeTab === 'INCIDENT_CENTER' ? (
           <IncidentCenter />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOperationsDashboardPage;
