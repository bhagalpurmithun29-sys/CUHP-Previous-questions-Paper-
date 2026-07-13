import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectedTextPanelProps {
  selectedText: string | null;
  onClose: () => void;
  onClear: () => void;
}

export const SelectedTextPanel: React.FC<SelectedTextPanelProps> = ({ selectedText, onClose, onClear }) => {
  return (
    <AnimatePresence>
      {selectedText && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/50 p-3 text-sm relative"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-blue-700 dark:text-blue-300 font-medium text-xs uppercase tracking-wider">Selected Context</span>
            <button onClick={onClear} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 italic border-l-2 border-blue-400 pl-2">
            "{selectedText}"
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
