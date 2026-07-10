import React from 'react';
import { FiBookOpen, FiBookmark, FiClock, FiZap } from 'react-icons/fi';

export const StudyOverview: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Completed</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.completedPapers}</p>
                </div>
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <FiBookOpen size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Bookmarked</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.bookmarkedPapers}</p>
                </div>
                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <FiBookmark size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Hours Studied</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.totalStudyHours}</p>
                </div>
                <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
                    <FiClock size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Streak</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.streakDays} Days</p>
                </div>
                <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl">
                    <FiZap size={24} />
                </div>
            </div>
        </div>
    );
};
