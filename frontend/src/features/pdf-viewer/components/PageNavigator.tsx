import React from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const PageNavigator: React.FC = () => {
  const { pageNumber, numPages, setPageNumber } = usePDFViewerStore();

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && (!numPages || val <= numPages)) {
      setPageNumber(val);
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 z-10 transition-colors duration-200">
      <button 
        onClick={handlePrev} 
        disabled={pageNumber <= 1}
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <input 
          type="number" 
          value={pageNumber} 
          onChange={handleInputChange}
          className="w-12 text-center bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 no-spinners"
          min={1}
          max={numPages || 1}
        />
        <span>of</span>
        <span>{numPages || '-'}</span>
      </div>

      <button 
        onClick={handleNext} 
        disabled={!!numPages && pageNumber >= numPages}
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};
