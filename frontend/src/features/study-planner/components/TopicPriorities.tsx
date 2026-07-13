import React from 'react';

export const TopicPriorities: React.FC = () => {
  const topics = [
    { name: 'Operating Systems - Deadlocks', priority: 'High', status: 'Weak' },
    { name: 'DBMS - Normalization', priority: 'High', status: 'Unread' },
    { name: 'Computer Networks - TCP/IP', priority: 'Medium', status: 'In Progress' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Topic Priorities</h3>
      <p className="text-xs text-gray-500 mb-4">AI analysis of your weak areas and past exam frequency.</p>
      
      <div className="space-y-3">
        {topics.map((t, idx) => (
          <div key={idx} className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
            <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{t.name}</p>
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${t.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                {t.priority} Priority
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
