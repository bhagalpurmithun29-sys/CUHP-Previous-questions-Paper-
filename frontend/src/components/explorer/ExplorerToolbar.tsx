import React from 'react';
import { SearchBar } from './SearchBar';
import { SortDropdown } from './SortDropdown';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';

interface ExplorerToolbarProps {
  filters: any;
  setFilters: (filters: any) => void;
  viewMode: 'grid' | 'list' | 'compact';
  setViewMode: (mode: 'grid' | 'list' | 'compact') => void;
  totalResults: number;
  onOpenMobileFilters: () => void;
}

export const ExplorerToolbar: React.FC<ExplorerToolbarProps> = ({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  totalResults,
  onOpenMobileFilters
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar 
            initialValue={filters.search} 
            onSearch={(val) => setFilters((prev: any) => ({ ...prev, search: val, page: 1 }))} 
          />
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button 
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center gap-2"
              onClick={onOpenMobileFilters}
            >
              <FiFilter /> Filters
            </button>

            <SortDropdown 
              value={filters.sort || 'newest'} 
              onChange={(val) => setFilters((prev: any) => ({ ...prev, sort: val, page: 1 }))} 
            />

            <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{totalResults}</span> results
        </div>
      </div>
    </div>
  );
};
