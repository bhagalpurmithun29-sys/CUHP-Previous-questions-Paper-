import React from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { FiZoomIn, FiZoomOut, FiMaximize, FiMinimize, FiRotateCw, FiDownload, FiSidebar, FiSearch, FiInfo } from 'react-icons/fi';
import { MdOutlineFitScreen, MdOutlinePageview } from 'react-icons/md';

export const Toolbar: React.FC<{ title?: string; onDownload: () => void }> = ({ title = 'Document Viewer', onDownload }) => {
  const {
    scale,
    setScale,
    rotation,
    setRotation,
    isFullscreen,
    setFullscreen,
    setActiveSidebarTab
  } = usePDFViewerStore();

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 3.0));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const handleRotate = () => setRotation((rotation + 90) % 360);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="flex items-center space-x-2">
        <button onClick={() => { setActiveSidebarTab('thumbnails'); }} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Toggle Sidebar">
          <FiSidebar size={20} />
        </button>
        <button onClick={() => setActiveSidebarTab('search')} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Search">
          <FiSearch size={20} />
        </button>
        <span className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-xs ml-4 hidden sm:block">
          {title}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <button onClick={handleZoomOut} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Zoom Out" disabled={scale <= 0.5}>
          <FiZoomOut size={20} />
        </button>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button onClick={handleZoomIn} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Zoom In" disabled={scale >= 3.0}>
          <FiZoomIn size={20} />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
        <button onClick={() => setScale(1.0)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Fit Page" title="Fit Page">
          <MdOutlinePageview size={22} />
        </button>
        <button onClick={() => setScale(1.5)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Fit Width" title="Fit Width">
          <MdOutlineFitScreen size={22} />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
        <button onClick={handleRotate} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Rotate">
          <FiRotateCw size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button onClick={() => setActiveSidebarTab('info')} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Document Info">
          <FiInfo size={20} />
        </button>
        <button onClick={onDownload} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Download">
          <FiDownload size={20} />
        </button>
        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200" aria-label="Fullscreen">
          {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
        </button>
      </div>
    </div>
  );
};
