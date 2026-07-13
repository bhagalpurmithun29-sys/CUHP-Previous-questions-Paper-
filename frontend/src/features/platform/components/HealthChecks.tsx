import React from 'react';

export const HealthChecks: React.FC<{ health: any }> = ({ health }) => {
  if (!health) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Core Services Health</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(health.components).map(([name, status]: [string, any]) => (
          <div key={name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">{status.latency}ms</span>
              <span className={`w-2.5 h-2.5 rounded-full \${status.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
