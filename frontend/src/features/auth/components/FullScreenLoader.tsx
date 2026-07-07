import React from 'react';
import { motion } from 'framer-motion';

export const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="mb-4 h-12 w-12 rounded-full border-b-2 border-t-2 border-black"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm font-medium text-gray-500"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};
