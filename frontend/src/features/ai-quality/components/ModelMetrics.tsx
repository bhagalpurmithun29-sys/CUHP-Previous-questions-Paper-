import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiCpu, FiBarChart2 } from 'react-icons/fi';

export const ModelMetrics: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Validated</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{data.total}</p>
                </div>
                <div className="p-4 bg-slate-100 text-slate-600 rounded-2xl">
                    <FiBarChart2 size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Acceptance Rate</p>
                    <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{data.acceptanceRate.toFixed(1)}%</p>
                </div>
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <FiCheckCircle size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Human Override</p>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{data.overrideRate.toFixed(1)}%</p>
                </div>
                <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl">
                    <FiAlertTriangle size={24} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Manually Corrected</p>
                    <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{data.corrected}</p>
                </div>
                <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl">
                    <FiCpu size={24} />
                </div>
            </div>
        </div>
    );
};
