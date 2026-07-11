import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onSelect }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <div className="w-full flex items-center gap-2 mb-1">
        <LightBulbIcon className="w-4 h-4 text-yellow-500" />
        <span className="text-xs font-semibold text-gray-500 uppercase">Suggested follow-ups</span>
      </div>
      {questions.map((q, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(q)}
          className="text-xs px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors whitespace-nowrap"
        >
          {q}
        </button>
      ))}
    </div>
  );
};
