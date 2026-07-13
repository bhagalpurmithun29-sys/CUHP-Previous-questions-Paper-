import React from 'react';
import { usePWA } from '../hooks/usePWA';

export const PWASettingsPage: React.FC = () => {
  const { isInstallable, promptInstall, isOnline, appVersion } = usePWA();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 flex flex-col gap-6">
        
        <header>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">App Settings & Status</h1>
          <p className="text-sm text-gray-500 mt-1">Manage local installation and offline capabilities.</p>
        </header>

        <section className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Connection Status</h3>
            <p className="text-sm text-gray-500">
              {isOnline ? 'You are currently connected to the network.' : 'You are currently offline. Some features are unavailable.'}
            </p>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full \${isOnline ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </section>

        {isInstallable && (
          <section className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">Install App</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">Install CUHP Question Bank for a faster, app-like experience.</p>
            </div>
            <button 
              onClick={promptInstall}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0"
            >
              Install Now
            </button>
          </section>
        )}

        <section className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">App Version</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><span className="font-medium text-gray-700 dark:text-gray-300">Version:</span> {appVersion?.version || 'Loading...'}</li>
            <li><span className="font-medium text-gray-700 dark:text-gray-300">Build:</span> {appVersion?.build || 'Loading...'}</li>
            <li><span className="font-medium text-gray-700 dark:text-gray-300">Environment:</span> Production</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default PWASettingsPage;
