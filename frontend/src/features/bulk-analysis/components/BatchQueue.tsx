import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiLoader, FiX } from 'react-icons/fi';

export const BatchQueue: React.FC<{ history: any[], onCancel: (id: string) => void }> = ({ history, onCancel }) => {
    if (!history) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <FiCheckCircle className="text-emerald-500" />;
            case 'FAILED': return <FiXCircle className="text-rose-500" />;
            case 'RUNNING': return <FiLoader className="text-blue-500 animate-spin" />;
            case 'CANCELLED': return <FiXCircle className="text-gray-500" />;
            default: return <FiClock className="text-orange-500" />;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[600px]">
             <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center">
                <FiClock className="mr-2 text-indigo-500" /> Batch Job Queue
            </h3>
            <div className="overflow-y-auto flex-1 space-y-4">
                {history.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 font-medium">No batch jobs queued.</div>
                ) : (
                    history.map((job) => (
                        <div key={job._id} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(job.status)}
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {job.name}
                                    </span>
                                </div>
                                <span className="text-xs font-black bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                                    {job.status}
                                </span>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                    <span>Progress</span>
                                    <span>{job.stats?.completed} / {job.stats?.total}</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div 
                                        className="bg-indigo-600 h-2 rounded-full" 
                                        style={{ width: `${job.stats?.total > 0 ? (job.stats.completed / job.stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs text-slate-500 font-medium border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
                                <span>{new Date(job.createdAt).toLocaleString()}</span>
                                {(job.status === 'QUEUED' || job.status === 'RUNNING') && (
                                    <button 
                                        onClick={() => onCancel(job._id)}
                                        className="flex items-center text-rose-600 hover:text-rose-700 font-bold"
                                    >
                                        <FiX className="mr-1" /> Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
