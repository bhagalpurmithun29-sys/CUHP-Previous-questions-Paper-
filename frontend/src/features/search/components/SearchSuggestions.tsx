import React from 'react';
import { useSearchSuggestions } from '../hooks/useSearch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ query, onSelect }) => {
  const { data: suggestions, isLoading } = useSearchSuggestions(query);

  if (!query || query.length < 2) return null;
  if (isLoading) return <div className="p-4 text-sm text-gray-500">Loading suggestions...</div>;
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="py-2">
      {suggestions.map((suggestion: string, index: number) => (
        <li key={index}>
          <button
            onClick={() => onSelect(suggestion)}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {suggestion}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
