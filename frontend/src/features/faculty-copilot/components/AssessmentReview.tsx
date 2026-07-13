import React from 'react';

interface AssessmentReviewProps {
  feedback: string;
}

export const AssessmentReview: React.FC<AssessmentReviewProps> = ({ feedback }) => {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">Assessment Feedback</h3>
      <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">{feedback}</p>
    </div>
  );
};
