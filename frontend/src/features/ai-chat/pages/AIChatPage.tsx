import React from 'react';
import { ChatLayout } from '../components/ChatLayout';
import { motion } from 'framer-motion';

export const AIChatPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      <ChatLayout />
    </motion.div>
  );
};
