import React from 'react';
import { SearchResultCard } from './SearchResultCard';

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse flex gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
        <p className="text-gray-500 dark:text-gray-400">We couldn't find anything matching your search criteria. Try adjusting your filters or using different keywords.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {results.map((result: any, idx: number) => (
        <SearchResultCard key={idx} result={result} />
      ))}
    </div>
  );
};
