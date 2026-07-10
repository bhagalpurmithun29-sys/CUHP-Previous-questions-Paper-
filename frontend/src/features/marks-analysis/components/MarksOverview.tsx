import React from 'react';
import { FiTarget, FiPieChart, FiBarChart2 } from 'react-icons/fi';

export const MarksOverview: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <FiTarget size={80} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-100 mb-1">Total Marks</p>
                    <p className="text-5xl font-black">{data.totalMarks}</p>
                </div>
                <div className="relative z-10 mt-6">
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm inline-block">
                        <span className="text-sm font-bold">{data.internalChoiceAnalysis?.totalChoiceMarks || 0} marks optional</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl mr-3">
                        <FiPieChart size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Assessment Quality</p>
                </div>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-gray-900 dark:text-white">{data.assessmentQualityScore}</p>
                    <p className="text-gray-500 font-bold mb-1">/ 100</p>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.assessmentQualityScore}%` }}></div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl mr-3">
                        <FiBarChart2 size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Sections</p>
                </div>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-gray-900 dark:text-white">{data.sectionBreakdown?.length || 0}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {data.sectionBreakdown?.slice(0, 4).map((s: any, i: number) => (
                        <div key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 rounded-md">
                            {s.sectionName}: {s.totalMarks}m
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
