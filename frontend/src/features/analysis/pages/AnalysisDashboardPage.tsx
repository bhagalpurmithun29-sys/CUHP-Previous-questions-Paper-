import React, { useState } from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import { AnalysisQueue } from '../components/AnalysisQueue';
import { FiCpu, FiPlay, FiSearch, FiCheckCircle } from 'react-icons/fi';

export const AnalysisDashboardPage: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getQueue, getStatus, getResult, processPaper, reprocessPaper } = useAnalysis(activePaperId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId) setActivePaperId(searchId);
    };
    
    const handleProcess = async () => {
        if (!activePaperId) return;
        try {
            await processPaper.mutateAsync(activePaperId);
        } catch (e) {
            alert('Failed to queue analysis.');
        }
    };
    
    const handleReprocess = async () => {
        if (!activePaperId) return;
        if (window.confirm('Are you sure you want to reprocess this document? It will consume AI credits.')) {
            try {
                await reprocessPaper.mutateAsync(activePaperId);
            } catch (e) {
                alert('Failed to requeue analysis.');
            }
        }
    };

    const statusData = getStatus.data;
    const resultData = getResult.data;

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
                    <span className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mr-3.5 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                        <FiCpu className="text-indigo-600 dark:text-indigo-400" size={26} />
                    </span>
                    AI Analysis Pipeline
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
                    Enterprise automated pipeline for generating structured intelligence and question-level extraction from OCR text.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Document Inspector</h2>
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <input 
                                type="text" 
                                placeholder="Enter Question Paper Object ID" 
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm outline-none font-mono"
                                required
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl shadow-sm transition-colors flex items-center"
                            >
                                <FiSearch className="mr-2" /> Inspect
                            </button>
                        </form>
                    </div>

                    {activePaperId && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Analysis Status</h3>
                                {statusData && (
                                    <span className={`px-3 py-1.5 text-xs font-black rounded-lg shadow-sm border ${
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
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 font-medium mb-8 text-lg">This document has not been processed by the AI Pipeline yet.</p>
                                        <button 
                                            onClick={handleProcess}
                                            disabled={processPaper.isPending}
                                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-sm transition-colors disabled:opacity-50 inline-flex items-center text-lg"
                                        >
                                            <FiPlay className="mr-3" size={24} /> Queue for Processing
                                        </button>
                                    </div>
                                ) : statusData.status === 'COMPLETED' && resultData ? (
                                    <div>
                                        <div className="grid grid-cols-2 gap-6 mb-8">
                                            <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-inner">
                                                <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-3">Questions Extracted</p>
                                                <h4 className="text-6xl font-black text-emerald-600 dark:text-emerald-500 drop-shadow-sm">{resultData.questionCount}</h4>
                                            </div>
                                            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl shadow-inner">
                                                <p className="text-sm font-extrabold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest mb-3">AI Confidence</p>
                                                <h4 className="text-6xl font-black text-indigo-600 dark:text-indigo-500 drop-shadow-sm">{resultData.confidenceScore}%</h4>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-6">
                                            <p className="text-sm font-semibold text-gray-500 flex items-center bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                                <FiCheckCircle className="mr-2 text-emerald-500" /> Processed in {resultData.processingTime}s
                                            </p>
                                            <button 
                                                onClick={handleReprocess}
                                                disabled={reprocessPaper.isPending}
                                                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl shadow-sm transition-colors text-sm"
                                            >
                                                Reprocess Document
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="inline-block p-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 mb-6 animate-[spin_3s_linear_infinite] shadow-inner border border-blue-100 dark:border-blue-800">
                                            <FiCpu size={40} />
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-extrabold text-xl">Document is currently in the AI processing queue...</p>
                                        <p className="text-sm font-medium text-gray-500 mt-3">Checking for updates automatically. Please wait.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <div>
                    {getQueue.isLoading ? (
                        <div className="animate-pulse h-[500px] bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
                    ) : (
                        <AnalysisQueue queue={getQueue.data || []} onSelect={setActivePaperId} />
                    )}
                </div>
            </div>
        </div>
    );
};
