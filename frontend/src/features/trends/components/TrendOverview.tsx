import React from 'react';
import { FiTrendingUp, FiActivity, FiLayers } from 'react-icons/fi';

export const TrendOverview: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <FiLayers size={80} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-100 mb-1">Total Papers Analyzed</p>
                    <p className="text-5xl font-black">{data.totalPapersAnalyzed}</p>
                </div>
                <div className="relative z-10 mt-6">
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm inline-block">
                        <span className="text-sm font-bold">Over {data.yearsCovered} Years</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl mr-3">
                        <FiTrendingUp size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Fastest Growing Topic</p>
                </div>
                <div className="flex items-end gap-2 mt-4">
                    <p className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{data.topGrowingTopic}</p>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl mr-3">
                        <FiActivity size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Most Stable Topic</p>
                </div>
                <div className="flex items-end gap-2 mt-4">
                    <p className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{data.mostStableTopic}</p>
                </div>
            </div>
        </div>
    );
};
