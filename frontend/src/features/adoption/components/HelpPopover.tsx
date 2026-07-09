import React, { useState } from 'react';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export const HelpPopover: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute z-50 right-0 mt-2 w-72 bg-card border border-border shadow-xl rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{title}</h4>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
