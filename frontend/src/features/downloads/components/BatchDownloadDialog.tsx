import React, { useState } from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { useDownloadStore } from '../store/downloadStore';
import { FiX, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface BatchDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPapers: any[];
}

export const BatchDownloadDialog: React.FC<BatchDownloadDialogProps> = ({ isOpen, onClose, selectedPapers }) => {
  const { downloadBatch } = useDownloads();
  const { addToQueue } = useDownloadStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBatchDownload = async () => {
    setIsProcessing(true);
    try {
      const paperIds = selectedPapers.map(p => p._id);
      await downloadBatch(paperIds);
      
      // Add to local queue
      selectedPapers.forEach(paper => {
        addToQueue({
          id: paper._id,
          title: paper.title,
          size: paper.fileSize,
          status: 'PENDING',
          progress: 0,
        });
      });
      
      onClose();
    } catch (error) {
      console.error('Batch download failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Batch Download</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1"><FiX size={20} /></button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You are about to download <span className="font-semibold">{selectedPapers.length}</span> papers. These will be added to your secure download queue.
              </p>
              
              <div className="max-h-40 overflow-y-auto mb-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 border border-gray-200 dark:border-gray-700 custom-scrollbar">
                <ul className="space-y-2">
                  {selectedPapers.map(paper => (
                    <li key={paper._id} className="text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center">
                      <span className="truncate pr-4 font-medium">{paper.title}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">{(paper.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBatchDownload}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center transition-colors shadow-sm"
                >
                  {isProcessing ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Queuing...</>
                  ) : (
                    <><FiDownload className="mr-2" /> Start Download</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
