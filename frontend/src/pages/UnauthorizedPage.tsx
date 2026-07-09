import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShieldOff } from 'react-icons/fi';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-8">
          <FiShieldOff className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
          401
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Unauthorized Access
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
          You need to be logged in to access this page. Please authenticate to continue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
