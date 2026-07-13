import React, { useState } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { PermissionManager } from '../components/PermissionManager';

export const PushNotificationSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('PREFERENCES');
  const { pushStatus, testPush, subscribe, unsubscribe } = usePushNotifications();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications & Sync</h1>
            <p className="text-sm text-gray-500 mt-1">Manage delivery preferences, background tasks, and event routing.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={() => testPush.mutate()}
               disabled={testPush.isPending || !pushStatus?.isSubscribed}
               className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
             >
               Test Notification
             </button>
             {pushStatus?.isSubscribed ? (
               <button 
                 onClick={() => unsubscribe.mutate()}
                 disabled={unsubscribe.isPending}
                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
               >
                 Unsubscribe
               </button>
             ) : (
               <button 
                 onClick={() => subscribe.mutate()}
                 disabled={subscribe.isPending}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
               >
                 Subscribe
               </button>
             )}
          </div>
        </header>

        <PermissionManager />

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['PREFERENCES', 'SUBSCRIPTIONS', 'BACKGROUND_SYNC', 'DEEP_LINKS', 'HISTORY'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex items-center justify-center">
          <p className="text-gray-500">Render {activeTab.toLowerCase()} component here</p>
        </div>

      </div>
    </div>
  );
};

export default PushNotificationSettingsPage;
