import React from 'react';
import { motion } from 'framer-motion';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';

export const VerificationLoader: React.FC = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-6 h-12 w-12 rounded-full border-b-2 border-t-2 border-black"
      />
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-medium text-gray-900"
      >
        {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.LOADING_TEXT}
      </motion.h2>
    </div>
  );
};
