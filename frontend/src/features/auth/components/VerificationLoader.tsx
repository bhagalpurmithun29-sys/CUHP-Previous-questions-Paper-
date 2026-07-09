import React from 'react';
import { motion } from 'framer-motion';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';

export const VerificationLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-950 px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
      </div>

      <div className="z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 p-10 sm:p-14 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl dark:ring-white/10 flex flex-col items-center"
        >
          {/* Spinner */}
          <div className="relative h-20 w-20 mb-8">
            <svg className="absolute inset-0 h-full w-full animate-spin text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 animate-pulse">
            {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.VERIFY_LOADING_TITLE}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.VERIFY_LOADING_SUBTITLE}
          </p>
          
          <div className="mt-8 flex gap-1 justify-center">
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
