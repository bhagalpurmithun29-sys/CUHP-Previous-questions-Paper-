import React, { useState } from 'react';
import { FiSearch, FiCpu } from 'react-icons/fi';

interface SemanticSearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ onSearch, isLoading, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-2 shadow-sm">
          
          <div className="pl-4 text-gray-400 dark:text-gray-500">
            {isLoading ? <FiCpu className="w-6 h-6 animate-pulse text-primary" /> : <FiSearch className="w-6 h-6" />}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, concept, or ask a question (e.g. 'Questions about Data Structures trees')..."
            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-4 py-3 placeholder-gray-400 dark:placeholder-gray-600 outline-none text-lg"
          />
          
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="shrink-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-bold px-8 py-3 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">Try:</span>
        {['Quantum mechanics derivations', 'BCA 3rd Sem OOPs', 'Macroeconomics formulas'].map(q => (
          <button key={q} type="button" onClick={() => { setQuery(q); onSearch(q); }} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {q}
          </button>
        ))}
      </div>
    </form>
  );
};
