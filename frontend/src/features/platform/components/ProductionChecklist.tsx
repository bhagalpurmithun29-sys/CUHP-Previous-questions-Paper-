import React from 'react';
import { usePlatformOverview } from '../hooks/usePlatformOverview';

export const ProductionChecklist: React.FC = () => {
  const { overview } = usePlatformOverview();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Go-Live Checklist</h3>
      <div className="space-y-3 flex-1 overflow-y-auto">
        <label className="flex items-start gap-3">
          <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">API Keys Secret Manager Checked</p>
            <p className="text-xs text-gray-500">Ensure no plaintext keys exist in config.</p>
          </div>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Vector DB Prod Cluster Synced</p>
            <p className="text-xs text-gray-500">Indexes correspond to latest academic material.</p>
          </div>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">RBAC Super Admin Defined</p>
            <p className="text-xs text-gray-500">Verify at least one ops admin exists.</p>
          </div>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Safety Engine Strict Mode Enabled</p>
            <p className="text-xs text-gray-500">Pre/Post flight guardrails locked.</p>
          </div>
        </label>
      </div>
    </div>
  );
};
