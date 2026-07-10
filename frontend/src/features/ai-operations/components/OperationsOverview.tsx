import React from 'react';
import { FiCpu, FiActivity, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

export const OperationsOverview: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Processed</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{data.papersProcessed}</p>
                </div>
                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <FiCpu size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Queue Size</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{data.queueSize}</p>
                </div>
                <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl">
                    <FiActivity size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Success Rate</p>
                    <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{data.successRate}%</p>
                </div>
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <FiCheckCircle size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Failure Rate</p>
                    <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{data.failureRate}%</p>
                </div>
                <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl">
                    <FiAlertTriangle size={24} />
                </div>
            </div>
        </div>
    );
};
