import React, { useState } from 'react';
import { useMarksAnalysis } from '../hooks/useMarksAnalysis';
import { MarksOverview } from '../components/MarksOverview';
import { SectionWeightageChart } from '../components/SectionWeightageChart';
import { AssessmentBalance } from '../components/AssessmentBalance';
import { FiPieChart, FiPlay, FiSearch, FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';

export const MarksAnalysisDashboardPage: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getStatus, processAnalysis, reprocessAnalysis, reviewAnalysis } = useMarksAnalysis(activePaperId);

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

    const handleReview = async (action: 'APPROVE'|'REJECT') => {
        if (!activePaperId) return;
        try {
            await reviewAnalysis.mutateAsync({ id: activePaperId, action });
        } catch (e) {
            alert('Failed to submit review.');
        }
    };

    const statusData = getStatus.data;

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center mb-4">
                    <span className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiPieChart size={32} />
                    </span>
                    Marks & Weightage Engine
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Enterprise AI engine for analyzing marks distribution, assessment balance, and topic weightage.
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analysis Status</h3>
                        {statusData && (
                            <span className={`px-4 py-2 text-xs font-black rounded-xl shadow-sm border uppercase tracking-wider ${
                                statusData.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                statusData.status === 'PROCESSING' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse' :
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
                                <p className="text-gray-500 font-medium mb-8 text-lg">Marks analysis has not been performed on this document.</p>
                                <button 
                                    onClick={handleProcess}
                                    disabled={processAnalysis.isPending}
                                    className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 inline-flex items-center text-lg"
                                >
                                    <FiPlay className="mr-3" size={24} /> Run Marks Engine
                                </button>
                                <p className="text-sm text-gray-400 mt-4 italic">Requires previously extracted questions.</p>
                            </div>
                        ) : statusData.status === 'COMPLETED' ? (
                            <div>
                                <MarksOverview data={statusData} />
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                    <SectionWeightageChart breakdown={statusData.sectionBreakdown} />
                                    <AssessmentBalance indicators={statusData.balanceIndicators} />
                                </div>
                                
                                <div className="flex gap-4 justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-8 mt-4">
                                    <button 
                                        onClick={handleReprocess}
                                        disabled={reprocessAnalysis.isPending}
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl flex items-center transition-colors"
                                    >
                                        <FiRefreshCw className="mr-2" /> Reprocess
                                    </button>
                                    
                                    {statusData.reviewStatus === 'PENDING_REVIEW' ? (
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handleReview('REJECT')}
                                                className="px-6 py-3 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold rounded-xl flex items-center transition-colors"
                                            >
                                                <FiX className="mr-2" /> Reject Report
                                            </button>
                                            <button 
                                                onClick={() => handleReview('APPROVE')}
                                                className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md font-bold rounded-xl flex items-center transition-colors"
                                            >
                                                <FiCheck className="mr-2" /> Approve Report
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`px-4 py-2 text-xs font-black rounded-lg shadow-sm border uppercase tracking-wider ${
                                            statusData.reviewStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                                        }`}>
                                            {statusData.reviewStatus}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="inline-block p-6 rounded-[2rem] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 mb-8 animate-[pulse_1.5s_ease-in-out_infinite] shadow-inner border border-indigo-100 dark:border-indigo-800">
                                    <FiPieChart size={48} />
                                </div>
                                <p className="text-gray-900 dark:text-white font-extrabold text-3xl mb-3">Calculating Assessment Balance...</p>
                                <p className="text-lg font-medium text-gray-500">Cross-referencing Bloom, Difficulty, and Topic vectors with Marks.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
