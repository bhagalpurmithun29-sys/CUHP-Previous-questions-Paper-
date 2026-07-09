import React from 'react';
import { motion } from 'framer-motion';
import { ProfileCompletionStatus } from '../types/dashboard.types';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface ProfileCompletionProps {
  completion?: ProfileCompletionStatus;
  loading?: boolean;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ completion, loading }) => {
  if (loading || !completion) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse h-full">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-4" />
      </div>
    );
  }

  const { percentage, missingFields } = completion;
  const isComplete = percentage === 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
          Profile Completion
        </h3>
        <span className={`text-sm font-bold ${isComplete ? 'text-green-600 dark:text-green-400' : 'text-primary dark:text-primary-light'}`}>
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-2.5 rounded-full ${isComplete ? 'bg-green-600' : 'bg-primary'}`}
        />
      </div>

      <div className="flex-1">
        {isComplete ? (
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <FiCheckCircle className="w-5 h-5 shrink-0" />
            <p>Your profile is fully set up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Complete your profile to unlock all features:</p>
            <ul className="space-y-2">
              {missingFields.map((field, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <FiAlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!isComplete && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link 
            to="/profile/edit"
            className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
          >
            Complete Profile &rarr;
          </Link>
        </div>
      )}
    </motion.div>
  );
};
