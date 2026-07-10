import React, { useState } from 'react';
import { useDifficultyAnalysis } from '../hooks/useDifficultyAnalysis';
import { ComplexityAnalysis } from '../components/ComplexityAnalysis';
import { QuestionDifficulty } from '../components/QuestionDifficulty';
import { FiActivity, FiPlay, FiSearch, FiRefreshCw, FiClock } from 'react-icons/fi';

export const DifficultyDashboardPage: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getStatus, processAnalysis, reprocessAnalysis, reviewAnalysis } = useDifficultyAnalysis(activePaperId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId) setActivePaperId(searchId);
    };
    
    const handleProcess = async () => {
        if (!activePaperId) return;
        try {
            await processAnalysis.mutateAsync(activePaperId);
        } catch (e: any) {
            alert(e.response?.data?.message || 'Failed to queue analysis.');
        }
    };
    
    const handleReprocess = async () => {
        if (!activePaperId) return;
        if (window.confirm('Are you sure you want to reprocess? Previous analyses will be overwritten.')) {
            try {
                await reprocessAnalysis.mutateAsync(activePaperId);
            } catch (e) {
                alert('Failed to requeue analysis.');
            }
        }
    };

    const handleReview = async (qId: string, action: 'APPROVE'|'REJECT'|'EDIT', overrides?: any) => {
        if (!activePaperId) return;
        try {
            await reviewAnalysis.mutateAsync({ id: activePaperId, questionId: qId, action, overrides });
        } catch (e) {
            alert('Failed to submit review.');
        }
    };

    const statusData = getStatus.data;

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center mb-4">
                    <span className="p-3 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl mr-4 shadow-lg text-white transform hover:rotate-6 transition-transform">
                        <FiActivity size={32} />
                    </span>
                    Difficulty & Complexity Engine
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Enterprise AI engine estimating question difficulty, cognitive complexity, and expected solving times.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-3xl mx-auto">
                    <input 
                        type="text" 
                        placeholder="Enter Question Paper Object ID" 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="flex-1 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-6 py-4 focus:border-rose-500 shadow-inner outline-none font-mono text-center text-lg transition-colors focus:bg-gray-50 dark:focus:bg-gray-800"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-black rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center"
                    >
                        <FiSearch size={24} />
                    </button>
                </form>
            </div>

            {activePaperId && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analysis Status</h3>
                        {statusData && (
                            <span className={`px-4 py-2 text-xs font-black rounded-xl shadow-sm border uppercase tracking-wider ${
                                statusData.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                statusData.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' :
                                statusData.status === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                                {statusData.status}
                            </span>
                        )}
                    </div>
                    
                    <div className="p-8">
                        {!statusData ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 font-medium mb-8 text-lg">Difficulty analysis has not been performed on this document.</p>
                                <button 
                                    onClick={handleProcess}
                                    disabled={processAnalysis.isPending}
                                    className="px-10 py-5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 inline-flex items-center text-lg"
                                >
                                    <FiPlay className="mr-3" size={24} /> Run Difficulty Engine
                                </button>
                                <p className="text-sm text-gray-400 mt-4 italic">Requires previously extracted questions.</p>
                            </div>
                        ) : statusData.status === 'COMPLETED' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-inner sticky top-8 space-y-8">
                                        
                                        <div className="text-center">
                                            <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">Avg Solving Time</h4>
                                            <div className="inline-block px-8 py-6 rounded-[2rem] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center justify-center gap-4 mb-2">
                                                    <FiClock className="text-blue-500" size={28} />
                                                    <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                                                        {statusData.distribution?.averageSolvingTimeMinutes}
                                                    </p>
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Minutes per question</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <ComplexityAnalysis distribution={statusData.distribution} />
                                        </div>
                                        
                                        <button 
                                            onClick={handleReprocess}
                                            disabled={reprocessAnalysis.isPending}
                                            className="w-full py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FiRefreshCw className="mr-2" /> Reprocess Analysis
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-2">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                        <span>Question Analysis ({statusData.analyses?.length || 0})</span>
                                        <span className="text-xs text-gray-400 font-medium normal-case">Review required for all items</span>
                                    </h4>
                                    <div className="space-y-6">
                                        {statusData.analyses?.map((a: any) => (
                                            <QuestionDifficulty key={a.questionId} analysis={a} onReview={handleReview} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="inline-block p-6 rounded-[2rem] bg-rose-50 dark:bg-rose-900/30 text-rose-500 mb-8 animate-[pulse_1.5s_ease-in-out_infinite] shadow-inner border border-rose-100 dark:border-rose-800">
                                    <FiActivity size={48} />
                                </div>
                                <p className="text-gray-900 dark:text-white font-extrabold text-3xl mb-3">Estimating Cognitive Complexity...</p>
                                <p className="text-lg font-medium text-gray-500">Cross-referencing Bloom classifications and Topic Mapping for depth analysis.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
