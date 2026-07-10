import React from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { Document, Page } from 'react-pdf';

export const PageThumbnails: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  const { numPages, pageNumber, setPageNumber } = usePDFViewerStore();

  if (!numPages) return <div className="p-4 text-gray-500">Loading thumbnails...</div>;

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Pages</h3>
      <Document file={fileUrl} loading={<div className="h-40 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />}>
        {Array.from(new Array(numPages), (el, index) => (
          <div 
            key={`page_${index + 1}`} 
            className="flex flex-col items-center cursor-pointer mb-6 group"
            onClick={() => setPageNumber(index + 1)}
          >
            <div className={`p-1 rounded-md transition-all ${pageNumber === index + 1 ? 'bg-blue-500 ring-2 ring-blue-500/50' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <div className="shadow-sm border dark:border-gray-600 bg-white overflow-hidden" style={{ width: 120 }}>
                <Page
                  pageNumber={index + 1}
                  width={120}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </div>
            <span className={`text-xs mt-2 font-medium ${pageNumber === index + 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'}`}>
              {index + 1}
            </span>
          </div>
        ))}
      </Document>
    </div>
  );
};
