import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePDFViewer } from '../hooks/usePDFViewer';
import { Toolbar } from '../components/Toolbar';
import { ViewerSidebar } from '../components/ViewerSidebar';
import { PDFCanvas } from '../components/PDFCanvas';
import { PageNavigator } from '../components/PageNavigator';
import { ReadingProgress } from '../components/ReadingProgress';
import { KeyboardShortcuts } from '../components/KeyboardShortcuts';
import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PDFViewerPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  
  const { paper, isLoading } = usePDFViewer(paperId || '');

  // Handle missing paperId
  useEffect(() => {
    if (!paperId) {
      navigate(-1);
    }
  }, [paperId, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Document Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">The requested document could not be loaded.</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">Go Back</button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (paper.fileUrl) {
      window.open(paper.fileUrl, '_blank');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <ReadingProgress />
      <KeyboardShortcuts />
      
      <Toolbar title={paper.title} onDownload={handleDownload} />
      
      <div className="flex-1 flex overflow-hidden relative">
        <ViewerSidebar fileUrl={paper.fileUrl} paper={paper} />
        
        <div className="flex-1 relative flex flex-col">
          <PDFCanvas fileUrl={paper.fileUrl} />
          <PageNavigator />
        </div>
      </div>
    </div>
  );
};
