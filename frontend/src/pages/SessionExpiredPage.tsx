import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SessionExpiredPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 shadow-sm sm:rounded-2xl sm:border sm:border-gray-100 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-6">
          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Session Expired</h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Your session has expired due to inactivity or for your security. Please log in again to continue.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            Log In Again
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
