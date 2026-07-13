import React from 'react';

export const CitationPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
        Supporting Evidence
      </h3>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm text-indigo-600 dark:text-indigo-400">Repository Analysis 2023-2024</span>
            <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded font-medium">95% Match</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">"Analysis of mid-term examinations indicates a 15% drop in Evaluate/Create cognitive levels compared to syllabus expectations."</p>
        </div>
      </div>
    </div>
  );
};
