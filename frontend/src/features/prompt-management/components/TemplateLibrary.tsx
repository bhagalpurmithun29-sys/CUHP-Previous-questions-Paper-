import React from 'react';

export const TemplateLibrary: React.FC = () => {
  const templates = [
    { id: 1, name: 'Standard Persona', tags: ['System', 'Identity'] },
    { id: 2, name: 'JSON Output Format', tags: ['Formatting', 'API'] },
    { id: 3, name: 'Tone: Academic', tags: ['Tone', 'Rules'] }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Template Fragments</h3>
        <button className="text-indigo-600 text-xs font-semibold hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {templates.map(t => (
          <div key={t.id} className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-indigo-600">{t.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div className="flex gap-2 mt-2">
              {t.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
