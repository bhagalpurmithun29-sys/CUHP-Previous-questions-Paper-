import React from 'react';

export const CitationCompliance: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Compliance Status</h3>
      <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600 dark:text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold text-green-900 dark:text-green-400">Strict Citation Enforcement Active</span>
        </div>
        <p className="text-xs text-green-800 dark:text-green-600 leading-relaxed">
          The RAG Gateway is configured to automatically flag AI responses that lack direct citations to the repository context. Unsupported claims are routed to the Moderation Queue.
        </p>
      </div>
    </div>
  );
};
