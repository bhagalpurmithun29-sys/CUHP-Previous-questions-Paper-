import React from 'react';

export const SystemDependencies: React.FC<{ dependencies: any[] }> = ({ dependencies }) => {
  if (!dependencies) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Integration Graph Matrix</h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {dependencies.map((dep, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dep.source}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dep.target}</span>
            </div>
            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">{dep.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
