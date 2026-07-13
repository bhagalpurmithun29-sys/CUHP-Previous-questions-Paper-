import React, { useState } from 'react';
import { useMobilePlatform } from '../hooks/useMobilePlatform';

export const WorkflowValidation: React.FC = () => {
  const { validateWorkflow, readiness } = useMobilePlatform();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const workflows = [
    { id: 'wf_auth', name: 'Authentication & Session Management' },
    { id: 'wf_scan', name: 'Document Scanner to OCR Upload' },
    { id: 'wf_sync', name: 'Offline Storage to Cloud Sync' },
    { id: 'wf_push', name: 'Push Notification Deep Linking' }
  ];

  const handleValidate = async (id: string) => {
    setLoadingId(id);
    await validateWorkflow.mutateAsync({ workflowId: id });
    setLoadingId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">E2E Workflow Validation</h2>
        <span className="text-xs text-gray-500">Validated: {readiness?.totalWorkflowsValidated || 0}</span>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {workflows.map(wf => (
          <li key={wf.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{wf.name}</span>
            <button
              onClick={() => handleValidate(wf.id)}
              disabled={loadingId === wf.id}
              className="text-xs bg-indigo-600 text-white font-semibold px-3 py-1.5 rounded disabled:opacity-50"
            >
              {loadingId === wf.id ? 'Running...' : 'Run Test'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
