import React, { useState } from 'react';
import { useTopicMapping } from '../hooks/useTopicMapping';
import { UnitDistribution } from '../components/UnitDistribution';
import { QuestionTopicMapping } from '../components/QuestionTopicMapping';
import { FiMap, FiPlay, FiSearch, FiRefreshCw, FiBook, FiLayers } from 'react-icons/fi';

export const TopicMappingDashboard: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [activePaperId, setActivePaperId] = useState('');
    
    const { getStatus, processMapping, reprocessMapping, reviewMapping } = useTopicMapping(activePaperId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId) setActivePaperId(searchId);
    };
    
    const handleProcess = async () => {
        if (!activePaperId) return;
        try {
            await processMapping.mutateAsync(activePaperId);
        } catch (e: any) {
            alert(e.response?.data?.message || 'Failed to queue mapping.');
        }
    };
    
    const handleReprocess = async () => {
        if (!activePaperId) return;
        if (window.confirm('Are you sure you want to reprocess? Previous mappings will be overwritten.')) {
            try {
                await reprocessMapping.mutateAsync(activePaperId);
            } catch (e) {
                alert('Failed to requeue mapping.');
            }
        }
    };

    const handleReview = async (qId: string, action: 'APPROVE'|'REJECT'|'EDIT', overrides?: any) => {
        if (!activePaperId) return;
        try {
            await reviewMapping.mutateAsync({ id: activePaperId, questionId: qId, action, overrides });
        } catch (e) {
            alert('Failed to submit review.');
        }
    };

    const statusData = getStatus.data;

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center mb-4">
                    <span className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiMap size={32} />
                    </span>
                    Topic & Syllabus Mapping Engine
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Enterprise AI engine for mapping extracted questions to syllabus chapters, topics, and learning outcomes.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-3xl mx-auto">
                    <input 
                        type="text" 
                        placeholder="Enter Question Paper Object ID" 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="flex-1 rounded-2xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-6 py-4 focus:border-blue-500 shadow-inner outline-none font-mono text-center text-lg transition-colors focus:bg-gray-50 dark:focus:bg-gray-800"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <FiSearch size={24} />
                    </button>
                </form>
            </div>

            {activePaperId && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mapping Status</h3>
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
                                <p className="text-gray-500 font-medium mb-8 text-lg">Syllabus mapping has not been performed on this document.</p>
                                <button 
                                    onClick={handleProcess}
                                    disabled={processMapping.isPending}
                                    className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 inline-flex items-center text-lg"
                                >
                                    <FiPlay className="mr-3" size={24} /> Run Mapping Engine
                                </button>
                                <p className="text-sm text-gray-400 mt-4 italic">Requires previously extracted questions.</p>
                            </div>
                        ) : statusData.status === 'COMPLETED' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-inner sticky top-8 space-y-8">
                                        
                                        <div className="text-center">
                                            <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">Overall Confidence</h4>
                                            <div className="inline-block p-4 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                                <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600 drop-shadow-sm">
                                                    {statusData.overallConfidence.toFixed(1)}<span className="text-2xl text-gray-400">%</span>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                                                <FiLayers className="mx-auto text-blue-500 mb-2" size={24} />
                                                <p className="text-2xl font-black text-gray-900 dark:text-white">{statusData.coverage?.totalUnits || 0}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Units Mapped</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                                                <FiBook className="mx-auto text-indigo-500 mb-2" size={24} />
                                                <p className="text-2xl font-black text-gray-900 dark:text-white">{statusData.coverage?.totalTopics || 0}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Topics Covered</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <UnitDistribution distribution={statusData.coverage?.unitDistribution || {}} />
                                        </div>
                                        
                                        <button 
                                            onClick={handleReprocess}
                                            disabled={reprocessMapping.isPending}
                                            className="w-full py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FiRefreshCw className="mr-2" /> Reprocess Mapping
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-2">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                        <span>Question Mappings ({statusData.mappings?.length || 0})</span>
                                        <span className="text-xs text-gray-400 font-medium normal-case">Review required for all items</span>
                                    </h4>
                                    <div className="space-y-6">
                                        {statusData.mappings?.map((m: any) => (
                                            <QuestionTopicMapping key={m.questionId} mapping={m} onReview={handleReview} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="inline-block p-6 rounded-[2rem] bg-blue-50 dark:bg-blue-900/30 text-blue-600 mb-8 animate-[pulse_1.5s_ease-in-out_infinite] shadow-inner border border-blue-100 dark:border-blue-800">
                                    <FiMap size={48} />
                                </div>
                                <p className="text-gray-900 dark:text-white font-extrabold text-3xl mb-3">Connecting to Knowledge Graph...</p>
                                <p className="text-lg font-medium text-gray-500">Mapping extracted questions against syllabus structure and learning outcomes.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
