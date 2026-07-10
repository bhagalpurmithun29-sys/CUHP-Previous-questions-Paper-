import React from 'react';
import { FiBriefcase, FiPieChart, FiBarChart2, FiLayers } from 'react-icons/fi';

export const FacultyInsights: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.facultyInsights) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex items-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 rounded-2xl mr-4">
                    <FiBriefcase size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Faculty Insights</h3>
                    <p className="text-sm text-gray-500 font-medium">Pedagogical and structural feedback based on aggregate analysis.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3 font-bold">
                        <FiPieChart className="text-violet-500 mr-2" /> Assessment Balance
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {data.facultyInsights.assessmentBalance}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3 font-bold">
                        <FiLayers className="text-violet-500 mr-2" /> Coverage Observations
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {data.facultyInsights.coverageObservations}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3 font-bold">
                        <FiBarChart2 className="text-violet-500 mr-2" /> Difficulty Distribution
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {data.facultyInsights.difficultyDistribution}
                    </p>
                </div>
            </div>
        </div>
    );
};
