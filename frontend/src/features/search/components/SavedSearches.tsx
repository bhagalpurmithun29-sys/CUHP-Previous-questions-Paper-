import React from 'react';
import { useSavedSearches, useTogglePinSearchMutation } from '../hooks/useSearch';
import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface SavedSearchesProps {
  onSelect: (query: string, filters: any) => void;
}

export const SavedSearches: React.FC<SavedSearchesProps> = ({ onSelect }) => {
  const { data: savedSearches, isLoading } = useSavedSearches();
  const togglePinMutation = useTogglePinSearchMutation();

  if (isLoading || !savedSearches || savedSearches.length === 0) return null;

  return (
    <div className="py-2 border-t border-gray-100 dark:border-gray-800">
      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">Saved Searches</h5>
      <ul>
        {savedSearches.map((search: any) => (
          <li key={search._id} className="group relative flex items-center">
            <button
              onClick={() => onSelect(search.query, search.filters)}
              className="flex-1 text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors pr-10"
            >
              <BookmarkSolidIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {search.query || 'Filtered Search'}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePinMutation.mutate(search._id);
              }}
              className="absolute right-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove saved search"
            >
              <BookmarkSlashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
