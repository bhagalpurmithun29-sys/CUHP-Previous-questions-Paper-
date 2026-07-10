import React from 'react';
import { FiClock, FiRefreshCw, FiCheckCircle, FiXCircle, FiPlay } from 'react-icons/fi';

export const ReprocessingHistory: React.FC<{ history: any[], onRetry: (id: string) => void }> = ({ history, onRetry }) => {
    if (!history) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <FiCheckCircle className="text-emerald-500" />;
            case 'FAILED': return <FiXCircle className="text-rose-500" />;
            case 'PROCESSING': return <FiRefreshCw className="text-blue-500 animate-spin" />;
            default: return <FiClock className="text-gray-400" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden h-[600px] flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
                <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center">
                    <FiRefreshCw className="mr-2 text-indigo-500" /> Reprocessing History
                </h3>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {history.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">No history available.</div>
                ) : (
                    history.map((job) => (
                        <div key={job._id} className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(job.status)}
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        {job.targetType}: {job.targetId.slice(-6)}
                                    </span>
                                </div>
                                <span className="text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                    {job.status}
                                </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                Trigger: <span className="font-medium text-indigo-600 dark:text-indigo-400">{job.triggerReason}</span>
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                                {job.modules.map((m: string) => (
                                    <span key={m} className="text-xs font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">
                                        {m}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-500 font-medium border-t border-gray-100 dark:border-gray-700 pt-3">
                                <span>{new Date(job.createdAt).toLocaleString()}</span>
                                {job.status === 'FAILED' && (
                                    <button 
                                        onClick={() => onRetry(job._id)}
                                        className="flex items-center text-rose-600 hover:text-rose-700 font-bold"
                                    >
                                        <FiPlay className="mr-1" /> Retry
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
