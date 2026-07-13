import React from 'react';
import { useNotifications } from '../hooks/useNotifications';

export const NotificationPreferences: React.FC = () => {
  const { preferences, updatePreferences, isLoadingPrefs } = useNotifications();

  if (isLoadingPrefs || !preferences) return <div className="animate-pulse h-32 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>;

  const handleToggle = (key: string, value: boolean) => {
    updatePreferences.mutate({ [key]: !value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Delivery Channels</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">In-App Notifications</span>
            <p className="text-xs text-gray-500">Receive alerts while using the platform.</p>
          </div>
          <button 
            onClick={() => handleToggle('inAppEnabled', preferences.inAppEnabled)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${preferences.inAppEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform \${preferences.inAppEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Email Digest</span>
            <p className="text-xs text-gray-500">Receive important updates directly to your inbox.</p>
          </div>
          <button 
            onClick={() => handleToggle('emailEnabled', preferences.emailEnabled)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${preferences.emailEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform \${preferences.emailEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Push Notifications</span>
            <p className="text-xs text-gray-500">Mobile or browser push alerts.</p>
          </div>
          <button 
            onClick={() => handleToggle('pushEnabled', preferences.pushEnabled)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${preferences.pushEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform \${preferences.pushEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
