import React, { useState } from 'react';
import { useAIQuality } from '../hooks/useAIQuality';
import { ModelMetrics } from '../components/ModelMetrics';
import { ValidationQueue } from '../components/ValidationQueue';
import { ReviewWorkspace } from '../components/ReviewWorkspace';
import { ConfidenceThresholds } from '../components/ConfidenceThresholds';
import { ErrorCategories } from '../components/ErrorCategories';
import { ReviewerAgreement } from '../components/ReviewerAgreement';
import { ValidationReports } from '../components/ValidationReports';
import { FiShield } from 'react-icons/fi';

export const AIQualityDashboardPage: React.FC = () => {
    const { getQueue, getMetrics, submitReview } = useAIQuality();
    const [selectedTask, setSelectedTask] = useState<any>(null);

    const handleReviewSubmit = async (data: any) => {
        try {
            await submitReview.mutateAsync(data);
            setSelectedTask(null);
        } catch (error) {
            alert('Failed to submit review');
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center mb-2">
                    <span className="p-3 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl mr-4 shadow-lg text-white">
                        <FiShield size={32} />
                    </span>
                    AI Quality & Review
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    Human-in-the-loop validation for low-confidence AI generations.
                </p>
            </div>

            <ModelMetrics data={getMetrics.data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ValidationQueue queue={getQueue.data || []} onSelect={setSelectedTask} />
                </div>
                <div className="lg:col-span-2">
                    <ReviewWorkspace task={selectedTask} onSubmit={handleReviewSubmit} />
                </div>
            </div>

            <div className="hidden">
                <ConfidenceThresholds />
                <ErrorCategories />
                <ReviewerAgreement />
                <ValidationReports />
            </div>
        </div>
    );
};
