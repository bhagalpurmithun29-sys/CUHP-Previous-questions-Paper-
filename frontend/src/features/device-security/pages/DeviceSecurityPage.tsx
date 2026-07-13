import React, { useState } from 'react';
import { ActiveSessions } from '../components/ActiveSessions';

export const DeviceSecurityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SESSIONS');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Device Management & Security</h1>
            <p className="text-sm text-gray-500 mt-1">Manage trusted devices, active sessions, and biometric authenticators.</p>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['SESSIONS', 'TRUSTED_DEVICES', 'WEBAUTHN', 'LOGIN_HISTORY', 'ALERTS'].map(tab => (
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
          {activeTab === 'SESSIONS' ? (
             <ActiveSessions />
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

export default DeviceSecurityPage;
