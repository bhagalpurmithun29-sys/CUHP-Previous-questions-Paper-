import React from 'react';
import { useAiUsageStats, useAiProviders } from '../api/ai.api';
import { FiCpu, FiDollarSign, FiActivity, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export const AiAdminDashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useAiUsageStats();
  const { data: providers, isLoading: provLoading } = useAiProviders();

  if (statsLoading || provLoading) return <div className="p-8 text-center text-gray-500">Loading AI Intelligence...</div>;

  const totalCost = stats?.reduce((acc: number, curr: any) => acc + curr.totalCost, 0) || 0;
  const totalRequests = stats?.reduce((acc: number, curr: any) => acc + curr.totalRequests, 0) || 0;
  const totalErrors = stats?.reduce((acc: number, curr: any) => acc + curr.errors, 0) || 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Gateway Infrastructure</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Multi-LLM orchestration and cost analytics.</p>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 rounded-xl"><FiCpu className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total API Calls</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalRequests.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 rounded-xl"><FiDollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Estimated Cost</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">${totalCost.toFixed(4)}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 rounded-xl"><FiActivity className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Providers</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{providers?.length || 0}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 rounded-xl"><FiAlertCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Failed Requests</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalErrors.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Provider Breakdown Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Provider Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-bold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4 text-right">Requests</th>
                  <th className="px-6 py-4 text-right">Tokens</th>
                  <th className="px-6 py-4 text-right">Cost (USD)</th>
                  <th className="px-6 py-4 text-right">Latency</th>
                  <th className="px-6 py-4 text-right">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {stats?.map((stat: any) => (
                  <tr key={stat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> {stat._id}
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{stat.totalRequests.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-mono">{stat.totalTokens.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-mono text-green-600 dark:text-green-400">${stat.totalCost.toFixed(6)}</td>
                    <td className="px-6 py-4 text-right font-mono">{stat.avgLatency.toFixed(0)} ms</td>
                    <td className="px-6 py-4 text-right font-mono text-red-500">{stat.errors}</td>
                  </tr>
                ))}
                {(!stats || stats.length === 0) && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center">No AI usage data recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Configuration Status */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Gateway Configuration</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 dark:text-white">Gemini</span>
                {providers?.includes('gemini') ? <FiCheckCircle className="text-green-500" /> : <FiAlertCircle className="text-gray-400" />}
              </div>
              <p className="text-xs text-gray-500">Google AI Studio Provider</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 dark:text-white">OpenAI</span>
                {providers?.includes('openai') ? <FiCheckCircle className="text-green-500" /> : <FiAlertCircle className="text-gray-400" />}
              </div>
              <p className="text-xs text-gray-500">GPT-4o Enterprise Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 dark:text-white">Groq</span>
                {providers?.includes('groq') ? <FiCheckCircle className="text-green-500" /> : <FiAlertCircle className="text-gray-400" />}
              </div>
              <p className="text-xs text-gray-500">LPU Fast Inference (Llama 3)</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 dark:text-white">OpenRouter</span>
                {providers?.includes('openrouter') ? <FiCheckCircle className="text-green-500" /> : <FiAlertCircle className="text-gray-400" />}
              </div>
              <p className="text-xs text-gray-500">Multi-Model Fallback Network</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
