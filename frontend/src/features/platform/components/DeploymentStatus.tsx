import React from 'react';

export const DeploymentStatus: React.FC<{ readiness: any }> = ({ readiness }) => {
  if (!readiness) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Production Readiness</h3>
         <span className={`px-3 py-1 rounded-full text-xs font-bold \${readiness.readyForProduction ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
           {readiness.readyForProduction ? 'READY FOR PRODUCTION' : 'BLOCKED'}
         </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Readiness Score</span>
          <span className="font-bold">{readiness.score}/100</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `\${readiness.score}%` }}></div>
        </div>
      </div>

      <div className="space-y-2">
        {readiness.checks.map((check: any, idx: number) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            {check.passed ? (
               <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
               <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            )}
            <span>{check.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
