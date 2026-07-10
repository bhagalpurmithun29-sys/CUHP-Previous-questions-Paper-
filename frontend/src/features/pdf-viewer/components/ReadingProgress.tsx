import React from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';

export const ReadingProgress: React.FC = () => {
  const { pageNumber, numPages } = usePDFViewerStore();

  if (!numPages) return null;

  const percentage = (pageNumber / numPages) * 100;

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div 
        className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
