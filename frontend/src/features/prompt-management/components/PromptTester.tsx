import React, { useState } from 'react';
import { usePromptManagement } from '../hooks/usePromptManagement';

interface PromptTesterProps {
  content: string;
}

export const PromptTester: React.FC<PromptTesterProps> = ({ content }) => {
  const { extractVariables, testPrompt } = usePromptManagement();
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [extractedVars, setExtractedVars] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  React.useEffect(() => {
    if (content) {
      extractVariables.mutate({ content }, {
        onSuccess: (vars) => {
          setExtractedVars(vars);
          const initialVars: Record<string, string> = {};
          vars.forEach((v: string) => initialVars[v] = '');
          setVariables(initialVars);
        }
      });
    }
  }, [content]);

  const handleTest = () => {
    testPrompt.mutate({ content, variables }, {
      onSuccess: (data) => setResult(data)
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Prompt Tester</h3>
      
      {extractedVars.length > 0 ? (
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Inject Variables</h4>
          {extractedVars.map(v => (
            <div key={v} className="flex items-center gap-3">
              <label className="text-xs font-mono text-gray-700 dark:text-gray-300 w-24 truncate">{v}</label>
              <input 
                type="text" 
                value={variables[v] || ''}
                onChange={e => setVariables({...variables, [v]: e.target.value})}
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-900 dark:text-white"
                placeholder={`Enter value for \${v}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">No variables detected in this prompt.</p>
      )}

      <button 
        onClick={handleTest}
        disabled={testPrompt.isPending}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        {testPrompt.isPending ? 'Executing Test...' : 'Run Test Execution'}
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">Rendered Prompt</h4>
            <p className="text-xs font-mono text-gray-800 dark:text-gray-300 whitespace-pre-wrap">{result.renderedPrompt}</p>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
            <h4 className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2">AI Execution Result</h4>
            <p className="text-sm text-gray-900 dark:text-gray-100">{result.executionResult}</p>
            <div className="flex gap-4 mt-3 text-[10px] text-gray-500">
              <span>Latency: {result.metrics.latencyMs}ms</span>
              <span>Tokens: {result.metrics.tokenCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
