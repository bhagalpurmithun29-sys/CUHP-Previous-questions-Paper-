import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';

export const CompletionScreen: React.FC<{ onFinish: () => void; isPending: boolean }> = ({ onFinish, isPending }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-32 h-32 bg-success/20 rounded-full flex items-center justify-center"
      >
        <SparklesIcon className="w-16 h-16 text-success" />
      </motion.div>

      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2"
        >
          You're all set!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground"
        >
          Your profile is complete. Welcome to the CUHP Question Bank community.
        </motion.p>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onFinish}
        disabled={isPending}
        className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50"
      >
        {isPending ? 'Finalizing...' : 'Go to Dashboard'}
      </motion.button>
    </div>
  );
};
