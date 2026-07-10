import React from 'react';
import { FiBookOpen, FiStar, FiClock, FiCompass } from 'react-icons/fi';

export const StudentInsights: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.studentInsights) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
             <div className="flex items-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl mr-4">
                    <FiBookOpen size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Student Insights</h3>
                    <p className="text-sm text-gray-500 font-medium">Preparation strategy and priority focus areas.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center text-emerald-800 dark:text-emerald-300 mb-3 font-bold">
                        <FiStar className="mr-2" /> Study Priorities
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed text-sm font-medium">
                        {data.studentInsights.studyPriorities}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3 font-bold">
                        <FiCompass className="text-emerald-500 mr-2" /> Topic Coverage
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {data.studentInsights.topicCoverageSummary}
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3 font-bold">
                        <FiClock className="text-emerald-500 mr-2" /> Preparation Approach
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {data.studentInsights.preparationSummary}
                    </p>
                </div>
            </div>
        </div>
    );
};
