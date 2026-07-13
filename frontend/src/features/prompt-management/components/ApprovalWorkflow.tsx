import React from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface ApprovalWorkflowProps {
  prompt: any;
}

export const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = ({ prompt }) => {
  const queryClient = useQueryClient();

  if (!prompt || !prompt.versions) return null;

  const currentVersionData = prompt.versions.find((v: any) => v.version === prompt.currentVersion);
  
  if (currentVersionData?.status === 'PUBLISHED' || currentVersionData?.status === 'APPROVED') {
    return null; // Don't show workflow if already approved/published
  }

  const handleAction = async (action: 'request-approval' | 'approve') => {
    try {
      await axios.post(`/api/v1/prompt-management/\${prompt.id}/\${action}`, { versionId: prompt.currentVersion }, {
        headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
      });
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-800/50 text-yellow-600 dark:text-yellow-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Draft Status: {currentVersionData?.status}</h4>
            <p className="text-xs text-yellow-700 dark:text-yellow-600">This version must be approved before publishing.</p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentVersionData?.status === 'DRAFT' && (
            <button 
              onClick={() => handleAction('request-approval')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Request Review
            </button>
          )}
          {currentVersionData?.status === 'REVIEW' && (
            <button 
              onClick={() => handleAction('approve')}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Approve Version
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
