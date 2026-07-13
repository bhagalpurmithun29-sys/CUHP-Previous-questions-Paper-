import React from 'react';

interface RecommendedResourcesProps {
  resources: any;
}

export const RecommendedResources: React.FC<RecommendedResourcesProps> = ({ resources }) => {
  if (!resources?.recommendedPapers?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recommended Question Papers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.recommendedPapers.map((paper: any) => (
          <div key={paper._id} className="flex gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{paper.title}</p>
              <p className="text-xs text-gray-500 mt-1">{paper.examYear} • {paper.semester}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
