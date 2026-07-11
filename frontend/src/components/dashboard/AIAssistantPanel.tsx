import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiFileText, FiSearch, FiZap, FiMoreHorizontal } from 'react-icons/fi';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-full border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col shrink-0 overflow-hidden z-20"
        >
          {/* Header */}
          <div className="h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FiZap className="w-4 h-4" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">AI Assistant</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            <div className="text-center mt-6">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <FiZap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How can I help you today?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">I can analyze papers, answer questions, or help you study.</p>
            </div>

            <div className="space-y-2 mt-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Suggested Prompts</p>
              
              <button className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group">
                <div className="flex items-start gap-3">
                  <FiSearch className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Search Repository</p>
                    <p className="text-xs text-gray-500 mt-0.5">Find specific past year papers</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group">
                <div className="flex items-start gap-3">
                  <FiFileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Summarize PDF</p>
                    <p className="text-xs text-gray-500 mt-0.5">Upload a paper to get key points</p>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Mock Conversation */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0"></div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  What were the main topics in the 2023 Advanced Algorithms exam?
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 shrink-0 flex items-center justify-center text-white">
                  <FiZap className="w-4 h-4" />
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-2xl rounded-tr-none text-sm text-indigo-900 dark:text-indigo-100 border border-indigo-100 dark:border-indigo-800">
                  Based on the 2023 paper, the main topics were Dynamic Programming (30%), Graph Algorithms (25%), and NP-Completeness (20%).
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shrink-0">
            <div className="relative flex items-center">
              <button className="absolute left-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FiMoreHorizontal />
              </button>
              <input 
                type="text" 
                placeholder="Message AI Assistant..." 
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              />
              <button className="absolute right-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <FiSend className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">AI can make mistakes. Verify important academic information.</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
