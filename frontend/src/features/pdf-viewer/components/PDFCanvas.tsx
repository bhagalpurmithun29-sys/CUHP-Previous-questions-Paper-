import React, { useRef, useMemo } from 'react';
import { Document, Page } from 'react-pdf';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export const PDFCanvas: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  const { pageNumber, scale, rotation, setNumPages, searchText } = usePDFViewerStore();
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const textRenderer = useMemo(() => {
    if (!searchText) return undefined;
    return (textItem: any) => {
      const highlight = (str: string, query: string) => {
        if (!query) return str;
        const parts = str.split(new RegExp(`(${query})`, 'gi'));
        return (
          <>
            {parts.map((part, index) =>
              part.toLowerCase() === query.toLowerCase() ? (
                <mark key={index} className="bg-yellow-300 dark:bg-yellow-600 rounded-sm">{part}</mark>
              ) : (
                part
              )
            )}
          </>
        );
      };
      return highlight(textItem.str, searchText);
    };
  }, [searchText]);

  return (
    <div ref={wrapperRef} className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 flex justify-center items-start pt-6 pb-20 px-4 relative custom-scrollbar">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex flex-col items-center drop-shadow-xl"
        loading={
          <div className="flex items-center justify-center h-full w-full text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          rotate={rotation}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="bg-white transition-transform duration-200"
          customTextRenderer={textRenderer}
        />
      </Document>
    </div>
  );
};
