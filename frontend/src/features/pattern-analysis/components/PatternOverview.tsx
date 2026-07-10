import React from 'react';
import { FiLayers, FiActivity, FiShield } from 'react-icons/fi';

export const PatternOverview: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <FiLayers size={80} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink-100 mb-1">Blueprint Similarity</p>
                    <p className="text-5xl font-black">{data.blueprintSimilarityScore}%</p>
                </div>
                <div className="relative z-10 mt-6">
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm inline-block">
                        <span className="text-sm font-bold">Standard Template</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl mr-3">
                        <FiActivity size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Confidence Score</p>
                </div>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-gray-900 dark:text-white">{data.confidenceScore}</p>
                    <p className="text-gray-500 font-bold mb-1">/ 100</p>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.confidenceScore}%` }}></div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl mr-3">
                        <FiShield size={20} />
                    </div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">AI Summary</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    {data.patternSummary}
                </p>
            </div>
        </div>
    );
};
