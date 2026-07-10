import React, { useState } from 'react';
import { useQuestionExtraction } from '../hooks/useQuestionExtraction';
import { ExtractionQueue } from '../components/ExtractionQueue';
import { HierarchyTree } from '../components/HierarchyTree';
import { FiLayers, FiPlay, FiSearch, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';

export const QuestionExtractionDashboard: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getQueue, getStatus, getQuestions, processExtraction, reprocessExtraction, reviewExtraction } = useQuestionExtraction(activePaperId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId) setActivePaperId(searchId);
    };
    
    const handleProcess = async () => {
        if (!activePaperId) return;
        try {
            await processExtraction.mutateAsync(activePaperId);
        } catch (e) {
            alert('Failed to queue extraction.');
        }
    };
    
    const handleReprocess = async () => {
        if (!activePaperId) return;
        if (window.confirm('Are you sure you want to reprocess? Previous extraction will be overwritten.')) {
            try {
                await reprocessExtraction.mutateAsync(activePaperId);
            } catch (e) {
                alert('Failed to requeue extraction.');
            }
        }
    };

    const handleReview = async (action: 'APPROVE' | 'REJECT') => {
        if (!activePaperId) return;
        try {
            await reviewExtraction.mutateAsync({ id: activePaperId, action });
            alert(`Extraction successfully ${action.toLowerCase()}d.`);
        } catch (e) {
            alert('Failed to submit review.');
        }
    };

    const statusData = getStatus.data;
    const questionsData = getQuestions.data;

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
                    <span className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl mr-3.5 border border-purple-100 dark:border-purple-800 shadow-sm">
                        <FiLayers className="text-purple-600 dark:text-purple-400" size={26} />
                    </span>
                    AI Question Extraction Engine
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
                    Enterprise NLP pipeline for converting raw OCR text into structured question hierarchies with marks, sections, and choice detection.
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
                                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 focus:border-purple-500 focus:ring-purple-500 shadow-sm outline-none font-mono"
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
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Extraction Status</h3>
                                {statusData && (
                                    <div className="flex gap-2">
                                        {statusData.reviewStatus && statusData.reviewStatus !== 'PENDING_REVIEW' && (
                                            <span className={`px-3 py-1.5 text-xs font-black rounded-lg shadow-sm border ${
                                                statusData.reviewStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                                            }`}>
                                                {statusData.reviewStatus}
                                            </span>
                                        )}
                                        <span className={`px-3 py-1.5 text-xs font-black rounded-lg shadow-sm border ${
                                            statusData.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            statusData.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' :
                                            statusData.status === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {statusData.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-1">
                                {!statusData ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 font-medium mb-8 text-lg">Structured extraction has not been performed on this document.</p>
                                        <button 
                                            onClick={handleProcess}
                                            disabled={processExtraction.isPending}
                                            className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-sm transition-colors disabled:opacity-50 inline-flex items-center text-lg"
                                        >
                                            <FiPlay className="mr-3" size={24} /> Start Question Extraction
                                        </button>
                                    </div>
                                ) : statusData.status === 'COMPLETED' && questionsData ? (
                                    <div>
                                        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-xl mb-6 border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase">Questions Found</p>
                                                    <p className="text-xl font-black text-gray-900 dark:text-white">{questionsData.extractedQuestions.length}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold uppercase">Overall Confidence</p>
                                                    <p className="text-xl font-black text-purple-600 dark:text-purple-400">{questionsData.overallConfidence}%</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={handleReprocess}
                                                disabled={reprocessExtraction.isPending}
                                                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <FiRefreshCw className="mr-2" /> Reprocess
                                            </button>
                                        </div>
                                        
                                        <div className="mb-8 max-h-[500px] overflow-y-auto pr-2">
                                            <HierarchyTree questions={questionsData.extractedQuestions} />
                                        </div>
                                        
                                        {questionsData.reviewStatus === 'PENDING_REVIEW' && (
                                            <div className="flex gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                                                <button 
                                                    onClick={() => handleReview('APPROVE')}
                                                    disabled={reviewExtraction.isPending}
                                                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center"
                                                >
                                                    <FiCheckCircle className="mr-2" /> Approve Extraction
                                                </button>
                                                <button 
                                                    onClick={() => handleReview('REJECT')}
                                                    disabled={reviewExtraction.isPending}
                                                    className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center"
                                                >
                                                    <FiXCircle className="mr-2" /> Reject & Escalate
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="inline-block p-5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 mb-6 animate-[spin_3s_linear_infinite] shadow-inner border border-purple-100 dark:border-purple-800">
                                            <FiLayers size={40} />
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-extrabold text-xl">Document is traversing the NLP Extraction Pipeline...</p>
                                        <p className="text-sm font-medium text-gray-500 mt-3">Analyzing structure, identifying sections, and extracting question hierarchies.</p>
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
                        <ExtractionQueue queue={getQueue.data || []} onSelect={setActivePaperId} />
                    )}
                </div>
            </div>
        </div>
    );
};
