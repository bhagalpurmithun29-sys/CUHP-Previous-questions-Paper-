import React, { useState } from 'react';
import { useTrendAnalysis } from '../hooks/useTrendAnalysis';
import { TrendOverview } from '../components/TrendOverview';
import { TopicTrendChart } from '../components/TopicTrendChart';
import { BloomTrendChart } from '../components/BloomTrendChart';
import { DifficultyTrendChart } from '../components/DifficultyTrendChart';
import { MarksTrendChart } from '../components/MarksTrendChart';
import { CurriculumEvolution } from '../components/CurriculumEvolution';
import { ComparisonView } from '../components/ComparisonView';
import { TrendStatistics } from '../components/TrendStatistics';
import { FiTrendingUp, FiFilter } from 'react-icons/fi';

export const TrendAnalysisDashboardPage: React.FC = () => {
    const [filters, setFilters] = useState({ program: 'B.Tech CSE', subject: 'CS101' });
    
    const { getOverview, getTopicTrends, getBloomTrends, getDifficultyTrends } = useTrendAnalysis(filters);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center mb-4">
                    <span className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mr-4 shadow-lg text-white">
                        <FiTrendingUp size={32} />
                    </span>
                    Cross-Year Trend Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Enterprise intelligence engine aggregating historical examination patterns and curriculum shifts.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10 flex gap-4 items-center justify-between">
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-bold">
                    <FiFilter size={20} />
                    <span>Global Filters applied:</span>
                </div>
                <div className="flex gap-4">
                     <span className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm">{filters.program}</span>
                     <span className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm">{filters.subject}</span>
                </div>
            </div>

            {getOverview.isLoading ? (
                <div className="text-center py-24 text-gray-500">Loading historical aggregations...</div>
            ) : (
                <>
                    <TrendOverview data={getOverview.data} />
                    
                    <div className="mb-8">
                        <TopicTrendChart data={getTopicTrends.data || []} />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <BloomTrendChart data={getBloomTrends.data || []} />
                        <DifficultyTrendChart data={getDifficultyTrends.data || []} />
                    </div>

                    <div className="hidden">
                        <MarksTrendChart />
                        <CurriculumEvolution />
                        <ComparisonView />
                        <TrendStatistics />
                    </div>
                </>
            )}
        </div>
    );
};
