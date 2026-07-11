import React from 'react';
import { useSearchHistory, useClearHistoryMutation } from '../hooks/useSearch';
import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';

interface RecentSearchesProps {
  onSelect: (query: string, filters: any) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ onSelect }) => {
  const { data: recentSearches, isLoading } = useSearchHistory();
  const clearMutation = useClearHistoryMutation();

  if (isLoading || !recentSearches || recentSearches.length === 0) return null;

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4 mb-2">
        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Searches</h5>
        <button 
          onClick={() => clearMutation.mutate()}
          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
        >
          <TrashIcon className="w-3 h-3" /> Clear
        </button>
      </div>
      <ul>
        {recentSearches.map((search: any) => (
          <li key={search._id}>
            <button
              onClick={() => onSelect(search.query, search.filters)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors group"
            >
              <ClockIcon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {search.query}
              </span>
              {search.filters && Object.keys(search.filters).length > 0 && (
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded ml-auto">
                  +Filters
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
