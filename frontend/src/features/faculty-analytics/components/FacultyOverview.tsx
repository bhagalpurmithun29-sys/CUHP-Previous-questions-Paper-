import React from 'react';
import { FiBook, FiCheckSquare, FiTarget, FiStar } from 'react-icons/fi';

export const FacultyOverview: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Active Courses</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.activeCourses}</p>
                </div>
                <div className="p-4 bg-teal-100 text-teal-600 rounded-2xl">
                    <FiBook size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Assessments</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.totalAssessments}</p>
                </div>
                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <FiCheckSquare size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Curriculum Cov.</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.curriculumCoverage}%</p>
                </div>
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <FiTarget size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Avg Quality</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.averageQualityScore}%</p>
                </div>
                <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
                    <FiStar size={24} />
                </div>
            </div>
        </div>
    );
};
