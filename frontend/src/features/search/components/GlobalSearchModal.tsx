import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiBook, FiGrid, FiLayers, FiFileText } from 'react-icons/fi';
import { useSearchStore } from '../store/search.store';
import { useSearch, useSearchSuggestions } from '../hooks/useSearch';
import { EntityType } from '../types/search.types';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';

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

export const GlobalSearchModal: React.FC = () => {
  const { isOpen, setIsOpen, query, setQuery, recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: suggestions, isLoading: isLoadingSuggestions } = useSearchSuggestions(debouncedQuery);
  const { data: searchResults, isLoading: isLoadingResults } = useSearch({ query: debouncedQuery, limit: 10 }, debouncedQuery.length >= 3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setLocalQuery('');
    setQuery('');
  };

  const handleSelect = (url: string, title: string) => {
    addRecentSearch(title);
    setIsOpen(false);
    navigate(url);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
    setQuery(e.target.value);
  };

  if (!isOpen) return null;

  const showRecent = !debouncedQuery && recentSearches.length > 0;
  const showResults = debouncedQuery.length >= 2;
  const results = searchResults?.results || suggestions || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          {/* Search Header */}
          <div className="relative flex items-center p-4 border-b border-gray-100 dark:border-gray-800">
            <FiSearch className="w-6 h-6 text-gray-400 absolute left-6" />
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent pl-12 pr-12 py-3 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search schools, courses, subjects... (Cmd+K)"
              value={localQuery}
              onChange={handleSearchChange}
              role="combobox"
              aria-expanded={isOpen}
              aria-controls="search-results"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="absolute right-16 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
            <div className="absolute right-6 flex items-center gap-2">
               <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400">
                  ESC
               </span>
            </div>
          </div>

          {/* Search Content */}
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain" id="search-results">
            {isLoadingResults || isLoadingSuggestions ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                Searching...
              </div>
            ) : (
              <>
                {showRecent && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2 px-2">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-primary hover:text-primary-dark transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {recentSearches.map((term, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => setLocalQuery(term)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                          >
                            <FiClock className="text-gray-400 group-hover:text-gray-500" />
                            <span>{term}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showResults && results.length > 0 && (
                  <div className="p-2">
                    <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Search Results
                    </h3>
                    <ul className="space-y-1">
                      {results.map((result) => (
                        <li key={`${result.entityType}-${result.id}`}>
                          <button
                            onClick={() => handleSelect(result.url, result.title)}
                            className="w-full flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors text-left"
                          >
                            <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                              {getEntityIcon(result.entityType)}
                            </div>
                            <div className="flex-col overflow-hidden">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase tracking-wide border border-gray-200 dark:border-gray-700">
                                  {result.entityType}
                                </span>
                              </div>
                              {result.subtitle && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                  {result.subtitle}
                                </p>
                              )}
                              {result.description && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">
                                  {result.description}
                                </p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showResults && results.length === 0 && (
                  <div className="p-12 text-center">
                    <FiSearch className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No results found for "{debouncedQuery}"</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try checking for typos or using broader terms.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Search Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">↑↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">Enter</kbd> to select
              </span>
            </div>
            <span>Powered by Academic Search Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
