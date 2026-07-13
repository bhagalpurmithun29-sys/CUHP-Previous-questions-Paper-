import React, { useState } from 'react';

export const PaperComparison: React.FC = () => {
  const [source, setSource] = useState('2023 Midterm');
  const [target, setTarget] = useState('2024 Midterm');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Compare Assessments</h3>
      <div className="flex items-center gap-4 mb-4">
        <select 
          value={source} onChange={(e) => setSource(e.target.value)}
          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
        >
          <option value="2023 Midterm">2023 Midterm</option>
          <option value="2022 Midterm">2022 Midterm</option>
        </select>
        <div className="text-gray-400">vs</div>
        <select 
          value={target} onChange={(e) => setTarget(e.target.value)}
          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
        >
          <option value="2024 Midterm">2024 Midterm</option>
          <option value="2023 Final">2023 Final</option>
        </select>
      </div>
      <button className="w-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium py-2 rounded-lg border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-sm">
        Generate Comparison Matrix
      </button>
    </div>
  );
};
