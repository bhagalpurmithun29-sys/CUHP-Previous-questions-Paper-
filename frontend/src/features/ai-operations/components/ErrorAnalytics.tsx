import React from 'react';
import { FiAlertOctagon } from 'react-icons/fi';

export const ErrorAnalytics: React.FC<{ data: any[] }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mt-8">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center">
                <FiAlertOctagon className="mr-2 text-rose-500" /> Top Error Categories
            </h4>
            <div className="space-y-4">
                {data.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.category}</span>
                        <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-black">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
