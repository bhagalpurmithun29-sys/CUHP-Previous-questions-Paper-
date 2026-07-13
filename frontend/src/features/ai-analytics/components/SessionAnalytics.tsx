import React from 'react';

export const SessionAnalytics: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Engagement Depth</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Search to Chat Conversion</span>
            <span className="font-bold text-gray-900 dark:text-white">{(data.searchToChatConversion * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `\${data.searchToChatConversion * 100}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Citation Click Rate</span>
            <span className="font-bold text-gray-900 dark:text-white">{(data.citationClickRate * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `\${data.citationClickRate * 100}%` }}></div>
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
           <div>
             <p className="text-xs text-gray-500">Avg Session</p>
             <p className="font-bold text-lg text-gray-900 dark:text-white">{data.avgSessionDurationMins}m</p>
           </div>
           <div>
             <p className="text-xs text-gray-500">Queries / Session</p>
             <p className="font-bold text-lg text-gray-900 dark:text-white">{data.avgQueriesPerSession}</p>
           </div>
        </div>
      </div>
    </div>
  );
};
