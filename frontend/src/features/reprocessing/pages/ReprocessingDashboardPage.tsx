import React, { useState } from 'react';
import { useReprocessing } from '../hooks/useReprocessing';
import { ReprocessingHistory } from '../components/ReprocessingHistory';
import { ReprocessingQueue } from '../components/ReprocessingQueue';
import { DependencyGraph } from '../components/DependencyGraph';
import { TriggerRules } from '../components/TriggerRules';
import { CostAnalysis } from '../components/CostAnalysis';
import { FailureRecovery } from '../components/FailureRecovery';
import { PipelineTimeline } from '../components/PipelineTimeline';
import { FiSettings, FiPlay } from 'react-icons/fi';

export const ReprocessingDashboardPage: React.FC = () => {
    const { getHistory, startJob, retryJob } = useReprocessing();
    const [targetId, setTargetId] = useState('');

    const handleStart = async () => {
        if (!targetId) return;
        await startJob.mutateAsync({
            targetId,
            targetType: 'PAPER',
            triggerReason: 'Manual Trigger from Dashboard',
            modules: ['EXTRACTION', 'BLOOM', 'DIFFICULTY']
        });
        setTargetId('');
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl mr-4 shadow-lg text-white">
                        <FiSettings size={32} />
                    </span>
                    AI Reprocessing Pipeline
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    Continuous improvement engine for re-analyzing documents when models or configurations change.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center">
                            <FiPlay className="mr-2 text-indigo-500" /> Manual Trigger
                        </h3>
                        <div className="flex gap-4">
                            <input 
                                type="text"
                                placeholder="Enter Target ID (e.g. Paper ID)"
                                value={targetId}
                                onChange={(e) => setTargetId(e.target.value)}
                                className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-indigo-500"
                            />
                            <button 
                                onClick={handleStart}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors"
                            >
                                Start Pipeline
                            </button>
                        </div>
                    </div>
                    
                    {/* Placeholders for complex visualizations */}
                    <div className="hidden">
                        <DependencyGraph />
                        <TriggerRules />
                        <CostAnalysis />
                    </div>
                </div>
                
                <div className="lg:col-span-1">
                    <ReprocessingHistory history={getHistory.data || []} onRetry={(id) => retryJob.mutateAsync(id)} />
                </div>
            </div>
            
            <div className="hidden">
                <ReprocessingQueue />
                <FailureRecovery />
                <PipelineTimeline />
            </div>
        </div>
    );
};
