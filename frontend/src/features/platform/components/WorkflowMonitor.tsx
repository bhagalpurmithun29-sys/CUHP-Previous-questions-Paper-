import React from 'react';

export const WorkflowMonitor: React.FC<{ workflows: any[] }> = ({ workflows }) => {
  if (!workflows) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Request Lifecycle Pipeline</h3>
      <div className="flex-1 overflow-y-auto">
        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3">
          {workflows.map((wf, idx) => (
            <div key={idx} className="mb-6 ml-6 relative">
              <span className="absolute -left-[35px] bg-white dark:bg-gray-900 h-6 w-6 rounded-full border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold text-indigo-500">
                {wf.step}
              </span>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{wf.name}</span>
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">{wf.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
