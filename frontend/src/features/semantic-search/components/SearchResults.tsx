import React from 'react';
import { ResultCard } from './ResultCard';

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  metadata?: any;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, metadata }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 border-dashed">
        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">We couldn't find any papers matching your query. Try using different keywords or simpler concepts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {metadata && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>Found <span className="font-bold text-gray-900 dark:text-white">{metadata.totalFound}</span> results</p>
          <p>Search completed in <span className="font-mono">{metadata.latencyMs}ms</span></p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, idx) => (
          <ResultCard key={result._id || idx} result={result} />
        ))}
      </div>
    </div>
  );
};
