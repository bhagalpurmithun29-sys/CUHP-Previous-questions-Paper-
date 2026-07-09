import React from 'react';
import { FiX } from 'react-icons/fi';
import { SearchFilters } from '../hooks/useSearchFilters';

interface SearchChipsProps {
  filters: SearchFilters;
  onRemove: (key: keyof SearchFilters) => void;
  onClearAll: () => void;
}

export const SearchChips: React.FC<SearchChipsProps> = ({ filters, onRemove, onClearAll }) => {
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    return value !== '' && !['page', 'limit', 'sort', 'q'].includes(key);
  });

  if (activeFilters.length === 0 && !filters.q) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Active Filters:</span>
      
      {filters.q && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full text-sm font-medium">
          Query: {filters.q}
          <button onClick={() => onRemove('q')} className="hover:text-primary-dark hover:bg-primary/20 rounded-full p-0.5 ml-1 transition-colors">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      )}

      {activeFilters.map(([key, value]) => (
        <span key={key} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full text-sm font-medium">
          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>: {value}
          <button onClick={() => onRemove(key as keyof SearchFilters)} className="hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5 ml-1 transition-colors">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      ))}

      {(activeFilters.length > 0 || filters.q) && (
        <button 
          onClick={onClearAll}
          className="text-sm text-red-500 hover:text-red-600 font-medium ml-2 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};
