import React, { useEffect } from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';

export const KeyboardShortcuts: React.FC = () => {
  const { setPageNumber, pageNumber, numPages, scale, setScale } = usePDFViewerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          if (pageNumber > 1) setPageNumber(pageNumber - 1);
          break;
        case 'Home':
          setPageNumber(1);
          break;
        case 'End':
          if (numPages) setPageNumber(numPages);
          break;
        case '=':
        case '+':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setScale(Math.min(scale + 0.25, 3.0));
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setScale(Math.max(scale - 0.25, 0.5));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages, scale, setPageNumber, setScale]);

  return null; // This is a logic-only component
};
