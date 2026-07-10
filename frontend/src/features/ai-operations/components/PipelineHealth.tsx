import React from 'react';
import { FiHeart, FiLayers } from 'react-icons/fi';

export const PipelineHealth: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm h-full">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center">
                <FiHeart className="mr-2 text-emerald-500" /> Pipeline Health
            </h4>
            <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Status</span>
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-black">{data.status}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center">
                        <FiLayers className="mr-2" /> Workers
                    </span>
                    <span className="font-black text-slate-900 dark:text-white">{data.activeWorkers} / {data.totalCapacity}</span>
                </div>
            </div>
        </div>
    );
};
