import React from 'react';
import { useAIAdministration } from '../hooks/useAIAdministration';

export const OperationalAlerts: React.FC<{ alerts: any[] }> = ({ alerts }) => {
  const { acknowledgeAlert } = useAIAdministration();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Alerts</h3>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{alerts?.length || 0}</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {!alerts || alerts.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No active operational alerts.</p>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border \${alert.severity === 'HIGH' ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30' : 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800/30'}`}>
               <div className="flex justify-between items-start mb-2">
                 <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded \${alert.severity === 'HIGH' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>
                   {alert.type.replace('_', ' ')}
                 </span>
                 <span className="text-[10px] text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
               </div>
               <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">{alert.message}</p>
               <div className="flex justify-end">
                 <button 
                   onClick={() => acknowledgeAlert.mutate(alert.id)}
                   disabled={acknowledgeAlert.isPending}
                   className="text-xs font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                 >
                   Acknowledge
                 </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
