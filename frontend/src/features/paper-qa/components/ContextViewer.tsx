import React from 'react';

export const ContextViewer: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 border rounded-lg border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Context active: Current Paper</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        AI responses are strictly grounded in the currently opened question paper to prevent hallucinations.
      </p>
    </div>
  );
};
