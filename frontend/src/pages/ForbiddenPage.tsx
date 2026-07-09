import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 mb-8">
          <FiLock className="h-12 w-12 text-orange-600 dark:text-orange-400" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
          403
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Access Forbidden
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
          You don't have the necessary permissions or roles to view this resource. Contact your administrator if you believe this is a mistake.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
