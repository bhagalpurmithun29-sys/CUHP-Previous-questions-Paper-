import React, { useState } from 'react';
import { useReviewWorkspace } from '../hooks/useReviewWorkspace';

export const DiscussionPanel: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { threads, isLoadingThreads, createThread } = useReviewWorkspace(resourceId);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    createThread.mutate({ resourceId, targetType: 'QUESTION_PAPER', title: newTitle });
    setNewTitle('');
  };

  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white">Review Discussions</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingThreads ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : (
          threads.map((thread: any) => (
            <div 
              key={thread._id} 
              onClick={() => setActiveThreadId(thread._id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors \${activeThreadId === thread._id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm \${thread.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {thread.status}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{thread.title}</h4>
              <p className="text-xs text-gray-500 mt-2">Started by {thread.creatorId?.firstName}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleCreateThread}>
          <input 
            type="text" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New thread title..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded text-sm mb-2 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-gray-950 dark:text-white"
          />
          <button type="submit" disabled={!newTitle.trim()} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-medium transition-colors disabled:opacity-50">
            Start Discussion
          </button>
        </form>
      </div>

      {activeThreadId && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
           {/* We would render ThreadView here */}
        </div>
      )}
    </div>
  );
};
