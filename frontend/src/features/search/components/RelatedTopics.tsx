import React from 'react';
import { useTrendingSearches } from '../hooks/useSearch';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface RelatedTopicsProps {
  onSelect: (topic: string) => void;
}

export const RelatedTopics: React.FC<RelatedTopicsProps> = ({ onSelect }) => {
  const { data: trending, isLoading } = useTrendingSearches();

  if (isLoading || !trending?.keywords || trending.keywords.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-indigo-500" />
        <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Trending Topics & Keywords</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {trending.keywords.map((keyword: string, idx: number) => (
          <button
            key={idx}
            onClick={() => onSelect(keyword)}
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700/50 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors shadow-sm"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};
