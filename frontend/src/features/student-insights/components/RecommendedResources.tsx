import React from 'react';
import { FiExternalLink, FiCpu } from 'react-icons/fi';

export const RecommendedResources: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm mt-8">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-300 mb-6 flex items-center">
                <FiCpu className="mr-2" /> AI Recommendations
            </h4>
            <div className="space-y-4">
                {data.map((item: any) => (
                    <div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center group cursor-pointer hover:border-indigo-500">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                            <p className="text-sm text-gray-500 font-medium">{item.reason}</p>
                        </div>
                        <FiExternalLink className="text-gray-400 group-hover:text-indigo-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};
