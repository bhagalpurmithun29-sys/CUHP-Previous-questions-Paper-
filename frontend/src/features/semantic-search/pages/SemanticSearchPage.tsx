import React, { useState } from 'react';
import { SemanticSearchBar } from '../components/SemanticSearchBar';
import { SearchResults } from '../components/SearchResults';
import { useSemanticSearch } from '../hooks/useSemanticSearch';
import { FiInfo } from 'react-icons/fi';

export const SemanticSearchPage: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const searchMutation = useSemanticSearch();

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    searchMutation.mutate(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
            AI Discovery Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Search beyond keywords.
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Our hybrid search engine understands the context of your query. Describe the topic, concept, or question pattern you are looking for.
          </p>
          
          <SemanticSearchBar onSearch={handleSearch} isLoading={searchMutation.isPending} initialQuery={currentQuery} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!currentQuery && !searchMutation.data ? (
          // Explanation / Onboarding State
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Semantic Understanding</h3>
              <p className="text-gray-500 text-sm">Finds papers based on the meaning of your query, not just exact keyword matches.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hybrid Ranking</h3>
              <p className="text-gray-500 text-sm">Combines vector similarity with traditional metadata search for maximum accuracy.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Concept Matching</h3>
              <p className="text-gray-500 text-sm">Search for specific concepts or question patterns deeply embedded inside question papers.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-xl">
              <FiInfo className="shrink-0 w-5 h-5" />
              <p>Results are ranked using Reciprocal Rank Fusion, combining semantic similarity with keyword relevance.</p>
            </div>
            
            {searchMutation.isError ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-center">
                An error occurred while executing the semantic search. Please try again later.
              </div>
            ) : (
              <SearchResults 
                results={searchMutation.data?.results || []} 
                metadata={searchMutation.data?.metadata}
                isLoading={searchMutation.isPending} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
