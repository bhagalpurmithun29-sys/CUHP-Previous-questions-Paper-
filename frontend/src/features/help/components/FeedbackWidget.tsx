import React, { useState } from 'react';
import { useSubmitFeedback } from '../hooks/useHelp';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const FeedbackWidget: React.FC<{ slug: string }> = ({ slug }) => {
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitFeedback();

  const handleFeedback = (isHelpful: boolean) => {
    mutation.mutate({ slug, isHelpful }, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success('Thank you for your feedback!');
      }
    });
  };

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-6 rounded-2xl text-center font-medium border border-green-200 dark:border-green-800/30">
        Thanks! Your feedback helps us improve our Help Center.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-gray-900 dark:text-white font-bold text-lg">Was this article helpful?</div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => handleFeedback(true)}
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 hover:border-green-500 transition-colors font-medium shadow-sm"
        >
          <FiThumbsUp /> Yes
        </button>
        <button 
          onClick={() => handleFeedback(false)}
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-500 transition-colors font-medium shadow-sm"
        >
          <FiThumbsDown /> No
        </button>
      </div>
    </div>
  );
};
