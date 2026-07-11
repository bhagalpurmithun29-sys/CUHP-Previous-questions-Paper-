import React, { useState } from 'react';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { useSemanticSearch, SemanticSearchFilters } from '../hooks/useSemanticSearch';
import { useSaveSearchMutation } from '../hooks/useSearch';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import { SearchChips } from '../components/SearchChips';
import { SearchKeyboardShortcuts } from '../components/SearchKeyboardShortcuts';
import { SearchFilters } from '../components/SearchFilters';
import { RelatedTopics } from '../components/RelatedTopics';
import { Pagination } from '../../../components/explorer/Pagination';
import { FiFilter, FiBookmark } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const SearchPage: React.FC = () => {
  const { filters: baseFilters, updateFilter, removeFilter, clearFilters } = useSearchFilters();
  const filters: SemanticSearchFilters = { ...baseFilters, mode: baseFilters.mode || 'hybrid' };
  
  const [searchInput, setSearchInput] = useState(filters.q);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data, isLoading, isError } = useSemanticSearch(filters);
  const saveMutation = useSaveSearchMutation();

  const handleSearchSubmit = (value: string) => {
    updateFilter('q', value);
  };

  const handleSaveSearch = () => {
    if (!filters.q && Object.keys(filters).length <= 2) {
      toast.error('Add a search query or filters to save');
      return;
    }
    saveMutation.mutate({ query: filters.q || 'Filtered Search', filters }, {
      onSuccess: () => toast.success('Search saved to your profile!'),
      onError: () => toast.error('Failed to save search. Please login.')
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Search Input */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Advanced Search</h1>
          <SearchInput 
            initialValue={searchInput} 
            onChange={setSearchInput}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Main Results Column */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <SearchChips filters={filters} onRemove={removeFilter} onClearAll={clearFilters} />
              
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={handleSaveSearch}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  <FiBookmark /> Save Search
                </button>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium transition-colors"
                >
                  <FiFilter /> Filters
                </button>
              </div>
            </div>

            {isError ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">Failed to execute search.</div>
            ) : (
              <>
                <SearchResults results={data?.results || []} isLoading={isLoading} />
                
                {data?.meta?.totalPages > 1 && (
                  <Pagination 
                    currentPage={data.meta.page} 
                    totalPages={data.meta.totalPages} 
                    onPageChange={(p) => updateFilter('page', p)} 
                  />
                )}
              </>
            )}
          </div>

          {/* Right Sidebar - Shortcuts & Filters */}
          <div className={`lg:w-80 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <RelatedTopics onSelect={(topic) => updateFilter('q', topic)} />
            <SearchKeyboardShortcuts />
            <SearchFilters filters={filters} onChange={updateFilter} />
          </div>
        </div>
        
      </div>
    </div>
  );
};
