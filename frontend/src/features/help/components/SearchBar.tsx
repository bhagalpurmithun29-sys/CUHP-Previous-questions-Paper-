import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/help?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 w-6 h-6" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 border-2 border-transparent dark:border-gray-700 rounded-2xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-primary sm:text-lg shadow-lg transition-all"
        placeholder="Search for articles, guides, or FAQs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit" 
        className="absolute inset-y-2 right-2 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
      >
        Search
      </button>
    </form>
  );
};
