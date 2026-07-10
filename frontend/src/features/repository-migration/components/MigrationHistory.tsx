import React from 'react';
import { FiClock, FiCheck, FiX, FiInfo } from 'react-icons/fi';

export const MigrationHistory: React.FC<{ history: any }> = ({ history }) => {
    if (!history || history.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 text-center py-16">
                <FiClock className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No migration operations found in history.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <FiClock className="mr-3 text-gray-500" /> Recent Operations Log
                </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto p-2">
                {history.map((job: any) => (
                    <div key={job._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-2xl transition-colors">
                        <div className="flex items-start">
                            <div className={`mt-1 mr-5 p-3 rounded-xl shadow-inner border ${
                                job.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30' :
                                job.status === 'FAILED' ? 'bg-rose-50 text-rose-600 border-rose-100 dark:border-rose-800 dark:bg-rose-900/30' :
                                job.status === 'DRY_RUN' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:border-amber-800 dark:bg-amber-900/30' :
                                'bg-blue-50 text-blue-600 border-blue-100 dark:border-blue-800 dark:bg-blue-900/30'
                            }`}>
                                {job.status === 'COMPLETED' ? <FiCheck size={20} /> : job.status === 'FAILED' ? <FiX size={20} /> : <FiInfo size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white tracking-wide">{job.type}</h4>
                                <p className="text-sm font-medium text-gray-500 mt-1">Initiated {new Date(job.createdAt).toLocaleString()}</p>
                                <p className="text-xs font-bold mt-2 text-gray-400">STATUS: {job.status}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl text-sm font-mono text-gray-600 dark:text-gray-400 max-w-sm overflow-hidden text-ellipsis border border-gray-200 dark:border-gray-800">
                            {JSON.stringify(job.report || job.details)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
