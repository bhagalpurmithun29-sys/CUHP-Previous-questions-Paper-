import React from 'react';
import { usePromptManagement } from '../hooks/usePromptManagement';

interface PromptVersionHistoryProps {
  prompt: any;
}

export const PromptVersionHistory: React.FC<PromptVersionHistoryProps> = ({ prompt }) => {
  const { publishVersion, rollbackVersion } = usePromptManagement();

  if (!prompt || !prompt.versions) return null;

  // Placeholder for diff viewing - in a real app, use react-diff-viewer
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Version History</h3>
        <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded font-medium">
          Current: v{prompt.currentVersion}
        </span>
      </div>

      <div className="space-y-4">
        {prompt.versions.map((v: any) => (
          <div key={v.version} className={`p-4 border rounded-xl \${prompt.currentVersion === v.version ? 'border-indigo-500 bg-indigo-50/10 dark:bg-indigo-900/5' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 dark:text-white">v{v.version}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded \${v.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : v.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
                  {v.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(v.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400 font-mono line-clamp-2 mb-3 bg-white dark:bg-gray-950 p-2 rounded border border-gray-100 dark:border-gray-800">
              {v.content}
            </div>

            <div className="flex justify-end gap-2">
              <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1.5 font-medium transition-colors border border-gray-200 dark:border-gray-700 rounded">
                View Diff
              </button>
              {prompt.currentVersion !== v.version && v.status === 'APPROVED' && (
                <button 
                  onClick={() => publishVersion.mutate({ id: prompt.id, versionId: v.version })}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 font-medium rounded transition-colors"
                >
                  Publish
                </button>
              )}
              {prompt.currentVersion !== v.version && v.status === 'PUBLISHED' && (
                <button 
                  onClick={() => rollbackVersion.mutate({ id: prompt.id, versionId: v.version })}
                  className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 font-medium rounded transition-colors"
                >
                  Rollback to this
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
