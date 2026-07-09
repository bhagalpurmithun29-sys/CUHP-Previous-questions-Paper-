import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearch } from '../../features/search/hooks/useSearch';
import { EntityType, SearchFilters } from '../../features/search/types/search.types';
import { SearchBar } from '../../features/search/components/SearchBar';
import { FiSearch, FiFilter, FiSliders, FiClock, FiGrid, FiBook, FiLayers, FiFileText } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchStore } from '../../features/search/store/search.store';

const getEntityIcon = (type: EntityType) => {
  switch (type) {
    case EntityType.SCHOOL: return <FiLayers className="text-blue-500" />;
    case EntityType.DEPARTMENT: return <FiGrid className="text-purple-500" />;
    case EntityType.COURSE: return <FiBook className="text-green-500" />;
    case EntityType.SEMESTER: return <FiClock className="text-orange-500" />;
    case EntityType.SUBJECT: return <FiFileText className="text-red-500" />;
    default: return <FiSearch className="text-gray-500" />;
  }
};

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addRecentSearch } = useSearchStore();

  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') as EntityType || undefined;

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  
  const [filters, setLocalFilters] = useState<SearchFilters>({ type: initialType });

  const { data, isLoading, isError } = useSearch({
    query: debouncedQuery,
    page: 1,
    limit: 20,
    filters,
  }, debouncedQuery.length >= 2);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 3) {
      addRecentSearch(debouncedQuery);
    }
  }, [debouncedQuery, addRecentSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    
    if (filters.type) params.set('type', filters.type);
    else params.delete('type');

    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Advanced Search</h1>
        
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across all academic entities..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              Search
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <FiFilter className="w-4 h-4" /> Filters:
            </div>
            
            <select
              value={filters.type || ''}
              onChange={(e) => setLocalFilters({ ...filters, type: e.target.value as EntityType || undefined })}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Entities</option>
              {Object.values(EntityType).map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            Searching the academic database...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-red-500">
            <p>An error occurred while fetching results.</p>
          </div>
        ) : (!data?.results || data.results.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-full py-32 text-gray-500">
            <FiSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-6" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {debouncedQuery.length < 2 ? 'Enter at least 2 characters to search' : 'Try adjusting your search or filters to find what you are looking for.'}
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search Results ({data.meta.total})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.results.map((result) => (
                <div
                  key={`${result.entityType}-${result.id}`}
                  onClick={() => navigate(result.url)}
                  className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-primary/30 transition-all cursor-pointer bg-white dark:bg-gray-800 group"
                >
                  <div className="flex-shrink-0 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl group-hover:bg-primary/5 transition-colors">
                    {getEntityIcon(result.entityType)}
                  </div>
                  <div className="flex-col overflow-hidden w-full">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate" title={result.title}>
                        {result.title}
                      </h4>
                    </div>
                    {result.subtitle && (
                      <p className="text-xs font-medium text-primary mt-1 truncate">
                        {result.subtitle}
                      </p>
                    )}
                    {result.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    <div className="mt-3 inline-flex">
                       <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
                         {result.entityType}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
