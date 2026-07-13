import React from 'react';

interface GuardrailRulesProps {
  policies: any[];
}

export const GuardrailRules: React.FC<GuardrailRulesProps> = ({ policies }) => {
  if (!policies || policies.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mt-6 flex-1 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Guardrails</h3>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Manage Policies</button>
      </div>

      <div className="space-y-4">
        {policies.map(policy => (
          <div key={policy.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start justify-between group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{policy.name}</h4>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">{policy.description}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Priority {policy.priority}</span>
              <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                {policy.rules.length} Rule(s)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
