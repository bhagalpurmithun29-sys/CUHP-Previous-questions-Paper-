import React, { useState } from 'react';
import { useAIInsights } from '../hooks/useAIInsights';
import { ExecutiveSummary } from '../components/ExecutiveSummary';
import { FacultyInsights } from '../components/FacultyInsights';
import { StudentInsights } from '../components/StudentInsights';
import { ExplainabilityPanel } from '../components/ExplainabilityPanel';
import { ConfidenceIndicators } from '../components/ConfidenceIndicators';
import { PaperInsights } from '../components/PaperInsights';
import { TopicInsights } from '../components/TopicInsights';
import { InsightHistory } from '../components/InsightHistory';
import { FiCpu, FiPlay, FiSearch } from 'react-icons/fi';

export const AIInsightsDashboardPage: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getInsights, processInsights } = useAIInsights(activePaperId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId) setActivePaperId(searchId);
    };
    
    const handleProcess = async () => {
        if (!activePaperId) return;
        try {
            await processInsights.mutateAsync(activePaperId);
        } catch (e: any) {
            alert(e.response?.data?.message || 'Failed to queue insight generation.');
        }
    };

    const data = getInsights.data;

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center mb-4">
                    <span className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiCpu size={32} />
                    </span>
                    Explainable AI Insights
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Enterprise intelligence engine translating complex metadata into actionable academic feedback.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-3xl mx-auto">
                    <input 
                        type="text" 
                        placeholder="Enter Question Paper Object ID" 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="flex-1 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-6 py-4 focus:border-indigo-500 shadow-inner outline-none font-mono text-center text-lg transition-colors focus:bg-gray-50 dark:focus:bg-gray-800"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center"
                    >
                        <FiSearch size={24} />
                    </button>
                </form>
            </div>

            {activePaperId && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                     <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Insight Generation Report</h3>
                        {data?.explainability?.confidenceScore && (
                            <ConfidenceIndicators score={data.explainability.confidenceScore} />
                        )}
                    </div>
                    
                    <div className="p-8">
                        {!data ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 font-medium mb-8 text-lg">AI Insights have not been generated for this document yet.</p>
                                <button 
                                    onClick={handleProcess}
                                    disabled={processInsights.isPending}
                                    className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 inline-flex items-center text-lg"
                                >
                                    <FiPlay className="mr-3" size={24} /> Synthesize Insights
                                </button>
                                <p className="text-sm text-gray-400 mt-4 italic">Requires ALL prior analysis engines to be completed and approved.</p>
                            </div>
                        ) : data.status === 'COMPLETED' ? (
                            <div>
                                <ExecutiveSummary data={data} />
                                <FacultyInsights data={data} />
                                <StudentInsights data={data} />
                                <ExplainabilityPanel data={data} />
                                
                                <div className="hidden">
                                    <PaperInsights />
                                    <TopicInsights />
                                    <InsightHistory />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="inline-block p-6 rounded-[2rem] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 mb-8 animate-[pulse_1.5s_ease-in-out_infinite] shadow-inner border border-indigo-100 dark:border-indigo-800">
                                    <FiCpu size={48} />
                                </div>
                                <p className="text-gray-900 dark:text-white font-extrabold text-3xl mb-3">Synthesizing Explainable Insights...</p>
                                <p className="text-lg font-medium text-gray-500">Cross-referencing Topic, Bloom, Difficulty, and Pattern models.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
