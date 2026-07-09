import React, { useState } from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAdoptionState, useUpdateAdoptionProgress } from '../hooks/useProductTour';
import { motion, AnimatePresence } from 'framer-motion';

export const FeatureHint: React.FC<{ hintId: string; title: string; children: React.ReactNode }> = ({ hintId, title, children }) => {
  const { data: adoption } = useAdoptionState();
  const { mutate: updateProgress } = useUpdateAdoptionProgress();
  const [isVisible, setIsVisible] = useState(true);

  if (!adoption || !isVisible) return null;
  if (adoption.preferences?.hintsEnabled === false) return null;
  if (adoption.hintsDismissed?.includes(hintId)) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    updateProgress({ hintId });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4 shadow-sm"
      >
        <button onClick={handleDismiss} className="absolute top-2 right-2 text-primary/60 hover:text-primary transition-colors">
          <XMarkIcon className="w-5 h-5" />
        </button>
        <div className="flex gap-3 pr-6">
          <InformationCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-primary mb-1">{title}</h4>
            <div className="text-sm text-primary/80">{children}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
