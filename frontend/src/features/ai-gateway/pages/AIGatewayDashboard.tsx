import React, { useState } from 'react';
import { useAIGateway } from '../hooks/useAIGateway';
import { ProviderStatus } from '../components/ProviderStatus';
import { ModelSelector } from '../components/ModelSelector';
import { UsageOverview } from '../components/UsageOverview';
import { LatencyChart } from '../components/LatencyChart';
import { ErrorMonitor } from '../components/ErrorMonitor';
import { StreamingPreview } from '../components/StreamingPreview';
import { FiServer, FiSend } from 'react-icons/fi';

export const AIGatewayDashboard: React.FC = () => {
    const { getProviders, chat } = useAIGateway();
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<any>(null);

    const handleTest = async () => {
        if (!prompt) return;
        setResponse(null);
        try {
            const res = await chat.mutateAsync({
                request: { prompt, model: 'gpt-4o' },
                taskType: 'TEST'
            });
            setResponse(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiServer size={32} />
                    </span>
                    AI Gateway & Orchestration
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                    Centralized API hub for routing, retry logic, and LLM provider abstraction.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {getProviders.data?.map((p: any) => (
                    <div key={p.name} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{p.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {p.models.map((m: string) => (
                                <span key={m} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Connection Test</h3>
                <div className="flex gap-4 mb-4">
                    <input 
                        type="text"
                        placeholder="Enter a test prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none"
                    />
                    <button 
                        onClick={handleTest}
                        disabled={chat.isPending}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center disabled:opacity-50"
                    >
                        <FiSend className="mr-2" /> Send
                    </button>
                </div>

                {response && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-500 uppercase">
                            <span>Provider: {response.provider}</span>
                            <span>Model: {response.model}</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200">{response.text}</p>
                    </div>
                )}
            </div>

            <div className="hidden">
                <ProviderStatus />
                <ModelSelector />
                <UsageOverview />
                <LatencyChart />
                <ErrorMonitor />
                <StreamingPreview />
            </div>
        </div>
    );
};
