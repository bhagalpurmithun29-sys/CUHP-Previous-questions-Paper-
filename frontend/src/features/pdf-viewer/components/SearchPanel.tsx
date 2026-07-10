import React, { useState } from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { FiSearch, FiChevronUp, FiChevronDown, FiX } from 'react-icons/fi';

export const SearchPanel: React.FC = () => {
  const { searchText, setSearchText } = usePDFViewerStore();
  const [localText, setLocalText] = useState(searchText);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(localText);
  };

  const clearSearch = () => {
    setLocalText('');
    setSearchText('');
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Search Document</h3>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder="Find in document..."
          className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
        {localText && (
          <button type="button" onClick={clearSearch} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <FiX size={16} />
          </button>
        )}
      </form>

      {searchText && (
        <div className="mt-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Results for "{searchText}"</span>
            <div className="flex space-x-1">
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><FiChevronUp /></button>
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><FiChevronDown /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto flex items-center justify-center text-sm text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            {/* Native react-pdf search highlight is used, so custom result rendering requires deeper integration with PDF.js PDFViewer. For now we show placeholder. */}
            <p className="text-center px-4">Highlights are visible on the page. <br/><span className="text-xs">Advanced matching requires OCR indexing.</span></p>
          </div>
        </div>
      )}
    </div>
  );
};
