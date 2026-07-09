import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PreferenceResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const PreferenceResetDialog: React.FC<PreferenceResetDialogProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-border"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 text-warning mb-4">
                <div className="p-2 bg-warning/10 rounded-full">
                  <ArrowPathIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Reset All Preferences?</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                This will revert all your personalized settings, themes, accessibility, and notifications back to system defaults. This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-muted/20 border-t border-border flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg font-medium bg-warning text-warning-foreground hover:bg-warning/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? 'Resetting...' : 'Reset to Default'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
