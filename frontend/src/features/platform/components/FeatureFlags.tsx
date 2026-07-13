import React from 'react';
import { usePlatformOverview } from '../hooks/usePlatformOverview';

export const FeatureFlags: React.FC<{ flags: Record<string, boolean> }> = ({ flags }) => {
  const { updateFlag } = usePlatformOverview();
  
  if (!flags) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Module Feature Flags</h3>
      <div className="space-y-3 flex-1 overflow-y-auto">
        {Object.entries(flags).map(([flag, enabled]) => (
          <div key={flag} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
            <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{flag}</span>
            <button 
              onClick={() => updateFlag.mutate({ flag, enabled: !enabled })}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${enabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform \${enabled ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
