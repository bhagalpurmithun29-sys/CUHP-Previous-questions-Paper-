import React, { useState } from 'react';
import { useFacultyAnalytics } from '../hooks/useFacultyAnalytics';
import { FacultyOverview } from '../components/FacultyOverview';
import { CurriculumCoverage } from '../components/CurriculumCoverage';
import { BloomDistributionDashboard } from '../components/BloomDistributionDashboard';
import { DifficultyDistributionDashboard } from '../components/DifficultyDistributionDashboard';
import { AssessmentQualityDashboard } from '../components/AssessmentQualityDashboard';
import { HistoricalComparison } from '../components/HistoricalComparison';
import { DepartmentAnalytics } from '../components/DepartmentAnalytics';
import { CourseAnalytics } from '../components/CourseAnalytics';
import { ExportReports } from '../components/ExportReports';
import { FiPieChart, FiDownload } from 'react-icons/fi';

export const FacultyAnalyticsDashboardPage: React.FC = () => {
    const [filters, setFilters] = useState({ program: 'B.Tech CSE', semester: 'Sem 4' });
    
    const { getOverview, getCurriculum, getBloom, getDifficulty, exportReport } = useFacultyAnalytics(filters);

    const handleExport = async () => {
        try {
            const res = await exportReport.mutateAsync(filters);
            window.open(res.url, '_blank');
        } catch (e) {
            alert('Failed to generate report.');
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center mb-2">
                        <span className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mr-4 shadow-lg text-white">
                            <FiPieChart size={32} />
                        </span>
                        Faculty Analytics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                        Evaluate assessment quality, curriculum coverage and historical academic trends.
                    </p>
                </div>
                <button 
                    onClick={handleExport}
                    disabled={exportReport.isPending}
                    className="px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center"
                >
                    <FiDownload className="mr-2" /> Export Report
                </button>
            </div>

            {getOverview.isLoading ? (
                <div className="text-center py-24 text-gray-500">Aggregating Faculty Analytics...</div>
            ) : (
                <>
                    <FacultyOverview data={getOverview.data} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <CurriculumCoverage data={getCurriculum.data} />
                        </div>
                        <div className="lg:col-span-1">
                            <BloomDistributionDashboard data={getBloom.data} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <DifficultyDistributionDashboard data={getDifficulty.data} />
                        {/* Placeholder for Assessment Quality Radar Chart */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
                            <p className="text-gray-400 font-bold">Assessment Quality Radar (Placeholder)</p>
                        </div>
                    </div>

                    <div className="hidden">
                        <AssessmentQualityDashboard />
                        <HistoricalComparison />
                        <DepartmentAnalytics />
                        <CourseAnalytics />
                        <ExportReports />
                    </div>
                </>
            )}
        </div>
    );
};
