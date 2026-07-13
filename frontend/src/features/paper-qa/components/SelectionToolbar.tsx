import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectionToolbarProps {
  selectionInfo: { text: string; x: number; y: number } | null;
  onAskAi: (text: string) => void;
  onExplain: (text: string) => void;
  onClose: () => void;
}

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({ selectionInfo, onAskAi, onExplain, onClose }) => {
  if (!selectionInfo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          position: 'fixed',
          top: selectionInfo.y - 50,
          left: selectionInfo.x,
          transform: 'translateX(-50%)',
          zIndex: 50
        }}
        className="flex items-center gap-1 bg-gray-900 text-white rounded-lg shadow-xl px-2 py-1.5 border border-gray-700"
      >
        <button
          onClick={() => onAskAi(selectionInfo.text)}
          className="px-3 py-1.5 hover:bg-gray-800 rounded-md text-sm font-medium transition-colors"
        >
          Ask AI
        </button>
        <div className="w-px h-4 bg-gray-700" />
        <button
          onClick={() => onExplain(selectionInfo.text)}
          className="px-3 py-1.5 hover:bg-gray-800 rounded-md text-sm font-medium transition-colors"
        >
          Explain Term
        </button>
        <div className="w-px h-4 bg-gray-700" />
        <button
          onClick={onClose}
          className="px-2 py-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
