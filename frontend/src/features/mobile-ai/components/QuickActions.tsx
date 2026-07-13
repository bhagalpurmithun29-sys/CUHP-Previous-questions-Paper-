import React from 'react';
import { useMobileAI } from '../hooks/useMobileAI';

export const QuickActions: React.FC = () => {
  const { executeAction } = useMobileAI();

  const actions = [
    { id: 'SUMMARIZE', icon: '📝', label: 'Summarize Document' },
    { id: 'EXPLAIN', icon: '💡', label: 'Explain Concept' },
    { id: 'GENERATE_NOTES', icon: '📓', label: 'Generate Notes' },
    { id: 'FLASHCARDS', icon: '🃏', label: 'Create Flashcards' },
    { id: 'QUIZ', icon: '❓', label: 'Create Quiz' }
  ];

  return (
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick AI Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => executeAction.mutate({ action: action.id, context: {} })}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-2"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
