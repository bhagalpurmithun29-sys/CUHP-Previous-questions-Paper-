import React, { useEffect, useState } from 'react';
import { useAdoptionState } from '../hooks/useProductTour';
import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon } from '@heroicons/react/24/solid';

export const MilestoneBanner: React.FC<{ milestoneId: string; title: string; description: string }> = ({ milestoneId, title, description }) => {
  const { data: adoption } = useAdoptionState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (adoption?.milestones?.[milestoneId]) {
      // Check if it was achieved recently (e.g. within last 10 seconds)
      const achievedAt = new Date(adoption.milestones[milestoneId]).getTime();
      const now = Date.now();
      if (now - achievedAt < 10000) {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [adoption, milestoneId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[300px]"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-yellow-100" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-100 mb-0.5">Milestone Unlocked!</p>
            <h4 className="font-bold text-lg leading-tight">{title}</h4>
            <p className="text-sm text-yellow-50">{description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
