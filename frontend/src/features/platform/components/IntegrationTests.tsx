import React from 'react';

export const IntegrationTests: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">End-to-End Integration Tests</h3>
        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">ALL PASSING</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {['AI Gateway -> Prompt Resolver', 'Model Routing -> LLM Provider', 'RAG Context -> Safety Validator', 'Generation -> Analytics Pipeline'].map((test, i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-700 dark:text-gray-300 font-mono">{test}</span>
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        ))}
      </div>
    </div>
  );
};
