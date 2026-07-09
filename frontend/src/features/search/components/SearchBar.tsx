import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchStore } from '../store/search.store';

export const SearchBar: React.FC = () => {
  const { setIsOpen } = useSearchStore();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 w-full max-w-sm px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 rounded-full border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm group"
      aria-label="Open Search"
    >
      <FiSearch className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
      <span className="flex-1 text-left">Search academic resources...</span>
      <div className="flex flex-shrink-0 items-center gap-0.5">
        <kbd className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
          {isMac ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
          K
        </kbd>
      </div>
    </button>
  );
};
