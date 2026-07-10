import React from 'react';
import { useAIOperations } from '../hooks/useAIOperations';
import { OperationsOverview } from '../components/OperationsOverview';
import { PipelineHealth } from '../components/PipelineHealth';
import { ModelPerformance } from '../components/ModelPerformance';
import { ErrorAnalytics } from '../components/ErrorAnalytics';
import { QueueMonitor } from '../components/QueueMonitor';
import { ConfidenceAnalytics } from '../components/ConfidenceAnalytics';
import { HumanReviewAnalytics } from '../components/HumanReviewAnalytics';
import { ReprocessingAnalytics } from '../components/ReprocessingAnalytics';
import { SystemHealth } from '../components/SystemHealth';
import { ReportExporter } from '../components/ReportExporter';
import { FiTerminal } from 'react-icons/fi';

export const AIOperationsDashboardPage: React.FC = () => {
    const { getOverview, getPipelineHealth, getModelMetrics, getErrorAnalytics } = useAIOperations();

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl mr-4 shadow-lg text-white">
                        <FiTerminal size={32} />
                    </span>
                    AI Operations Center
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                    Centralized monitoring for AI pipeline health, throughput, and error rates.
                </p>
            </div>

            <OperationsOverview data={getOverview.data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ModelPerformance data={getModelMetrics.data} />
                </div>
                <div className="lg:col-span-1">
                    <PipelineHealth data={getPipelineHealth.data} />
                </div>
            </div>

            <ErrorAnalytics data={getErrorAnalytics.data} />

            <div className="hidden">
                <QueueMonitor />
                <ConfidenceAnalytics />
                <HumanReviewAnalytics />
                <ReprocessingAnalytics />
                <SystemHealth />
                <ReportExporter />
            </div>
        </div>
    );
};
