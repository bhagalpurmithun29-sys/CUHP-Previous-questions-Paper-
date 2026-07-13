import React, { useState } from 'react';
import { PlatformOverview } from '../components/PlatformOverview';

export const CommunicationAdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Operations Center</h1>
            <p className="text-sm text-gray-500 mt-1">Administer, monitor, and configure the university-wide communication ecosystem.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
               System Alerts (0)
             </button>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
               Global Config
             </button>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['OVERVIEW', 'NOTIFICATIONS', 'MESSAGING', 'ANNOUNCEMENTS', 'CALENDAR', 'DELIVERY', 'CONFIGURATION'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0">
          {activeTab === 'OVERVIEW' && <PlatformOverview />}
          {activeTab !== 'OVERVIEW' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Render {activeTab.toLowerCase()} component here</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CommunicationAdminDashboardPage;
