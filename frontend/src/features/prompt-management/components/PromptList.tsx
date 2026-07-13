import React from 'react';

interface PromptListProps {
  prompts: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const PromptList: React.FC<PromptListProps> = ({ prompts, selectedId, onSelect }) => {
  if (!prompts || prompts.length === 0) {
    return <div className="text-gray-500 text-sm p-4 text-center">No prompts available.</div>;
  }

  return (
    <div className="space-y-2">
      {prompts.map(prompt => (
        <div 
          key={prompt.id} 
          onClick={() => onSelect(prompt.id)}
          className={`p-4 rounded-xl cursor-pointer border transition-colors \${selectedId === prompt.id ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-gray-100 hover:border-indigo-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700'}`}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate pr-2">{prompt.name}</h4>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded \${prompt.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
              {prompt.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{prompt.description}</p>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">v{prompt.currentVersion}</span>
            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{prompt.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
