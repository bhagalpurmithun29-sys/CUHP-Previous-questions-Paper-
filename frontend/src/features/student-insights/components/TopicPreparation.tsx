import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiAlertCircle } from 'react-icons/fi';

export const TopicPreparation: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6">Topic Readiness</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h5 className="flex items-center text-emerald-600 font-bold mb-4"><FiTrendingUp className="mr-2" /> Strong Topics</h5>
                    <ul className="space-y-3">
                        {data.strongTopics.map((t: any, i: number) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t.name}</span>
                                <span className="text-emerald-600 font-black">{t.score}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5 className="flex items-center text-rose-500 font-bold mb-4"><FiTrendingDown className="mr-2" /> Needs Review</h5>
                    <ul className="space-y-3">
                        {data.weakTopics.map((t: any, i: number) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-rose-50 dark:bg-rose-900/10 rounded-xl">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t.name}</span>
                                <span className="text-rose-500 font-black">{t.score}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5 className="flex items-center text-slate-500 font-bold mb-4"><FiAlertCircle className="mr-2" /> Unreviewed</h5>
                    <ul className="space-y-3">
                        {data.unreviewed.map((t: string, i: number) => (
                            <li key={i} className="p-3 bg-slate-50 dark:bg-gray-700/50 rounded-xl">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
