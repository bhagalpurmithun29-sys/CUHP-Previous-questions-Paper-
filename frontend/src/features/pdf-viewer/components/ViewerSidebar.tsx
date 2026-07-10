import React from 'react';
import { usePDFViewerStore } from '../store/pdfViewerStore';
import { PageThumbnails } from './PageThumbnails';
import { SearchPanel } from './SearchPanel';
import { DocumentInfo } from './DocumentInfo';
import { motion, AnimatePresence } from 'framer-motion';

export const ViewerSidebar: React.FC<{ fileUrl: string, paper: any }> = ({ fileUrl, paper }) => {
  const { isSidebarOpen, activeSidebarTab } = usePDFViewerStore();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-hidden flex flex-col z-20 shadow-md flex-shrink-0"
        >
          <div className="flex-1 overflow-y-auto w-[320px] custom-scrollbar">
            {activeSidebarTab === 'thumbnails' && <PageThumbnails fileUrl={fileUrl} />}
            {activeSidebarTab === 'search' && <SearchPanel />}
            {activeSidebarTab === 'info' && <DocumentInfo paper={paper} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
