import React from 'react';
import { useOfflineSync } from '../hooks/useOfflineSync';

export const SyncStatus: React.FC = () => {
  const { syncStatus, isStatusLoading, startSync } = useOfflineSync();

  if (isStatusLoading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-20 rounded-xl mb-6" />;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">Synchronization Status</h3>
        <p className="text-sm text-gray-500 mt-1">
          Last successful sync: {syncStatus?.lastSync ? new Date(syncStatus.lastSync).toLocaleString() : 'Never'}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
           <div className={`w-3 h-3 rounded-full \${syncStatus?.status === 'IDLE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{syncStatus?.status || 'UNKNOWN'}</span>
        </div>
        <button 
          onClick={() => startSync.mutate({})}
          disabled={startSync.isPending}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {startSync.isPending ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>
    </div>
  );
};
