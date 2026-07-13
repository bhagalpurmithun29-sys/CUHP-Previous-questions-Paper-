import React from 'react';

export const ExecutiveKPIs: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Educational Impact KPIs</h3>
      <div className="space-y-4">
         <div className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded bg-gray-50 dark:bg-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Time Saved (Faculty)</span>
            <span className="font-bold text-gray-900 dark:text-white">{data.costSavingsHrs.toLocaleString()} hrs</span>
         </div>
         <div className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded bg-gray-50 dark:bg-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Student Success Correl.</span>
            <span className="font-bold text-green-600 dark:text-green-500">{data.studentSuccessCorrelation}</span>
         </div>
         <div className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded bg-gray-50 dark:bg-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">System Uptime</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{data.systemUptime}%</span>
         </div>
      </div>
    </div>
  );
};
