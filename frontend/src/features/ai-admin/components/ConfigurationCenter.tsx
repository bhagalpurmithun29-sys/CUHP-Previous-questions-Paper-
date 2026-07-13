import React from 'react';
import { useAIAdministration } from '../hooks/useAIAdministration';

export const ConfigurationCenter: React.FC<{ config: any }> = ({ config }) => {
  const { updateConfig } = useAIAdministration();

  if (!config) return null;

  const handleToggle = (provider: string, current: boolean) => {
    updateConfig.mutate({
      providers: {
        ...config.providers,
        [provider]: { enabled: !current }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Configuration Center</h3>
      
      <div className="space-y-6 flex-1 overflow-y-auto">
        
        {/* Providers Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Model Providers</h4>
          <div className="space-y-3">
            {Object.entries(config.providers).map(([provider, details]: [string, any]) => (
              <div key={provider} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{provider}</span>
                <button 
                  onClick={() => handleToggle(provider, details.enabled)}
                  disabled={updateConfig.isPending}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${details.enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform \${details.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Routing Policies */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Global Routing Policies</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">Automated Fallback Enabled</span>
              <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{config.routing.fallbackEnabled ? 'TRUE' : 'FALSE'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">Cost Optimization</span>
              <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{config.routing.costOptimization ? 'TRUE' : 'FALSE'}</span>
            </div>
          </div>
        </div>

        {/* Safety Policies */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Safety Engine</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">Strict Moderation Mode</span>
              <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">{config.safety.strictMode ? 'ACTIVE' : 'INACTIVE'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
