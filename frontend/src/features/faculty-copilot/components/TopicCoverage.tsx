import React from 'react';

export const TopicCoverage: React.FC = () => {
  const topics = [
    { name: 'Process Management', weight: 30, status: 'Optimal' },
    { name: 'Memory Management', weight: 45, status: 'Over-represented' },
    { name: 'File Systems', weight: 25, status: 'Under-represented' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Topic Coverage</h3>
      <div className="space-y-4">
        {topics.map((t, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</span>
              <span className="text-xs font-bold text-gray-500">{t.weight}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full \${t.status === 'Optimal' ? 'bg-green-500' : t.status === 'Over-represented' ? 'bg-orange-500' : 'bg-red-500'}`} 
                style={{ width: `\${t.weight}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide font-semibold">{t.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
