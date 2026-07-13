import React from 'react';

interface MonthlyPlanProps {
  tasks: any[];
}

export const MonthlyPlan: React.FC<MonthlyPlanProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return <div>No tasks scheduled for this month.</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Monthly Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Total Tasks</p>
          <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mt-1">{tasks.length}</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Completed</p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">{tasks.filter(t => t.status === 'COMPLETED').length}</p>
        </div>
      </div>
    </div>
  );
};
