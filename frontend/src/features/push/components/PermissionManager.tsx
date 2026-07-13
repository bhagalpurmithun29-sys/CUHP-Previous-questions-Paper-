import React from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';

export const PermissionManager: React.FC = () => {
  const { permissionStatus, requestPermission } = usePushNotifications();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">Browser Permission</h3>
        <p className="text-sm text-gray-500 mt-1">Status: <span className="font-bold uppercase">{permissionStatus}</span></p>
      </div>
      
      {permissionStatus === 'default' && (
        <button 
          onClick={requestPermission}
          className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Request Permission
        </button>
      )}
      {permissionStatus === 'denied' && (
        <p className="text-sm text-red-500 font-medium">Please enable notifications in your browser settings.</p>
      )}
    </div>
  );
};
