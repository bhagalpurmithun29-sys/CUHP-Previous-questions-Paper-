import React from 'react';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No question papers found", 
  subMessage = "Try adjusting your search or filter criteria",
  onReset 
}) => {
  return (
    <div className="text-center py-20 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
        <FiInbox className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{message}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{subMessage}</p>
      
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};
