import React from 'react';

export const PaperSkeleton: React.FC<{ viewMode: 'grid' | 'list' | 'compact' }> = ({ viewMode }) => {
  const isList = viewMode === 'list';
  
  if (isList) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 animate-pulse flex gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
              <div className="flex gap-2">
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse flex flex-col h-full">
          <div className="flex justify-between mb-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
