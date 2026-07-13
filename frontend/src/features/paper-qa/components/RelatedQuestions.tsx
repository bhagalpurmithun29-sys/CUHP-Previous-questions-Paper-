import React from 'react';

interface RelatedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({ questions, onSelect }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="p-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Suggested Questions</h4>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="text-left px-3 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
