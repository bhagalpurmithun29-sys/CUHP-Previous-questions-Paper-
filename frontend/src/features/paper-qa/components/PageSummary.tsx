import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PageSummaryProps {
  summary: string;
  pageNumber: number;
  isLoading: boolean;
  onRegenerate: () => void;
}

export const PageSummary: React.FC<PageSummaryProps> = ({ summary, pageNumber, isLoading, onRegenerate }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Page {pageNumber} Summary
        </h4>
        <button 
          onClick={onRegenerate}
          disabled={isLoading}
          className="text-sm text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Regenerate'}
        </button>
      </div>
      
      {isLoading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
        </div>
      ) : (
        <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-400">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
