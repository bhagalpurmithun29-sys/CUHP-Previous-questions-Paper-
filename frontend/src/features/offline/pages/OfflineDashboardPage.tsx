import React, { useState } from 'react';
import { SyncStatus } from '../components/SyncStatus';
import { useOfflineSync } from '../hooks/useOfflineSync';

export const OfflineDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('QUEUE');
  const { syncHistory } = useOfflineSync();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offline Mode & Synchronization</h1>
          <p className="text-sm text-gray-500 mt-1">Manage local storage, offline queue, and resolve data conflicts.</p>
        </header>

        <SyncStatus />

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['QUEUE', 'CONFLICTS', 'REPOSITORY_CACHE', 'TASKS', 'MESSAGES', 'STORAGE', 'HISTORY'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          {activeTab === 'HISTORY' ? (
             <div>
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">Sync History</h3>
               <ul className="space-y-3">
                 {syncHistory?.map((entry: any, i: number) => (
                   <li key={i} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-3">
                     <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 \${entry.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {entry.status}
                        </span>
                        <span className="text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                     </div>
                     <span className="text-gray-700 dark:text-gray-300">Items: {entry.details?.itemsSynced || entry.details?.actionsProcessed || 0}</span>
                   </li>
                 ))}
               </ul>
             </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Render {activeTab.toLowerCase()} component here
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OfflineDashboardPage;
