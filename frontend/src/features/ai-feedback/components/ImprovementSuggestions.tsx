import React from 'react';

interface ImprovementSuggestionsProps {
  suggestions: any[];
}

export const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex-1 overflow-y-auto">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Continuous Improvement Insights</h3>
      
      {!suggestions || suggestions.length === 0 ? (
        <p className="text-sm text-gray-500">No actionable insights generated yet.</p>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded \${suggestion.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                  {suggestion.priority} PRIORITY
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                  {suggestion.category.replace('_', ' ')}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{suggestion.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.description}</p>
              
              <div className="mt-3 flex justify-end">
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Send to Engineering Pipeline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
