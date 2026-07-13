import React from 'react';
import ReactMarkdown from 'react-markdown';

interface QuestionExplanationProps {
  questionNumber: string;
  explanation: string;
  difficulty?: string;
  relatedTopics?: string[];
}

export const QuestionExplanation: React.FC<QuestionExplanationProps> = ({ questionNumber, explanation, difficulty, relatedTopics }) => {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">
          Q{questionNumber} Explanation
        </h4>
        {difficulty && (
          <span className="px-2 py-1 text-xs font-medium bg-white dark:bg-indigo-800 text-indigo-600 dark:text-indigo-200 rounded-full border border-indigo-200 dark:border-indigo-700">
            {difficulty}
          </span>
        )}
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none text-indigo-900/80 dark:text-indigo-200/80 mb-4">
        <ReactMarkdown>{explanation}</ReactMarkdown>
      </div>

      {relatedTopics && relatedTopics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">Related Topics</p>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs bg-white/60 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-200/50 dark:border-indigo-700/50">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
