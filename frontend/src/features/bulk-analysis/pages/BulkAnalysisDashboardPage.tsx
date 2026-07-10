import React, { useState } from 'react';
import { useBulkAnalysis } from '../hooks/useBulkAnalysis';
import { JobWizard } from '../components/JobWizard';
import { BatchQueue } from '../components/BatchQueue';
import { ProgressMonitor } from '../components/ProgressMonitor';
import { ExecutionTimeline } from '../components/ExecutionTimeline';
import { DependencyViewer } from '../components/DependencyViewer';
import { FailureRecovery } from '../components/FailureRecovery';
import { BatchReports } from '../components/BatchReports';
import { ResourceUsage } from '../components/ResourceUsage';
import { FiDatabase, FiPlayCircle } from 'react-icons/fi';

export const BulkAnalysisDashboardPage: React.FC = () => {
    const { getHistory, startJob, cancelJob } = useBulkAnalysis();
    const [jobName, setJobName] = useState('');

    const handleStart = async () => {
        if (!jobName) return;
        await startJob.mutateAsync({
            name: jobName,
            scopeType: 'ALL',
            jobType: 'INITIAL',
            modules: ['EXTRACTION', 'CLASSIFICATION']
        });
        setJobName('');
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiDatabase size={32} />
                    </span>
                    Bulk AI Analysis Engine
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                    Repository-wide processing, batch scheduling, and priority management.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center">
                            <FiPlayCircle className="mr-2 text-indigo-500" /> Start Bulk Job
                        </h3>
                        <div className="flex gap-4">
                            <input 
                                type="text"
                                placeholder="Enter Job Name (e.g. Fall 2023 Processing)"
                                value={jobName}
                                onChange={(e) => setJobName(e.target.value)}
                                className="flex-1 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-indigo-500"
                            />
                            <button 
                                onClick={handleStart}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors"
                            >
                                Schedule Job
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="lg:col-span-1">
                    <BatchQueue history={getHistory.data || []} onCancel={(id) => cancelJob.mutateAsync(id)} />
                </div>
            </div>

            <div className="hidden">
                <JobWizard />
                <ProgressMonitor />
                <ExecutionTimeline />
                <DependencyViewer />
                <FailureRecovery />
                <BatchReports />
                <ResourceUsage />
            </div>
        </div>
    );
};
