import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVersionHistory } from '../hooks/useVersionHistory';
import { VersionTimeline } from '../components/VersionTimeline';
import { FiGitCommit, FiArrowLeft } from 'react-icons/fi';

export const VersionHistoryPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const { historyData, isLoading, restoreVersion } = useVersionHistory(paperId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-sm"></div>
      </div>
    );
  }

  const handleRestore = async (versionId: string) => {
    if (confirm('Are you sure you want to restore this version? This will NOT overwrite history. It creates a NEW version based on this snapshot.')) {
      await restoreVersion.mutateAsync(versionId);
      alert('Version restored successfully! A new snapshot has been created.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 font-medium transition-colors">
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <span className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-3">
            <FiGitCommit className="text-blue-600 dark:text-blue-400" />
          </span>
          Version History & Revisions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg leading-relaxed max-w-3xl">
          Track all file updates, metadata edits, and corrections over time. 
          You can securely rollback to any previous snapshot without permanently overwriting history.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <VersionTimeline history={historyData || []} onRestore={handleRestore} />
      </div>
    </div>
  );
};
