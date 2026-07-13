import React from 'react';

export const SystemStatus: React.FC<{ health: any }> = ({ health }) => {
  if (!health) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Infrastructure Health</h3>
      
      <div className="space-y-4 flex-1">
        {/* Gateway */}
        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">AI Gateway</p>
            <p className="text-xs text-gray-500">{health.gateway.latency}ms average latency</p>
          </div>
          <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase \${health.gateway.status === 'HEALTHY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {health.gateway.status}
          </span>
        </div>

        {/* RAG Platform */}
        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">RAG & Vector Search</p>
            <p className="text-xs text-gray-500">{health.rag.notes || `\${health.rag.latency}ms latency`}</p>
          </div>
          <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase \${health.rag.status === 'HEALTHY' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {health.rag.status}
          </span>
        </div>

        {/* Safety Engine */}
        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">Safety Guardrails</p>
            <p className="text-xs text-gray-500">{health.safety.latency}ms validation latency</p>
          </div>
          <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase \${health.safety.status === 'HEALTHY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {health.safety.status}
          </span>
        </div>
      </div>
    </div>
  );
};
