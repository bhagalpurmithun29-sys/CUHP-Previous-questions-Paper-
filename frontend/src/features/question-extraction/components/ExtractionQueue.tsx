import React from 'react';
import { FiDatabase, FiClock, FiActivity } from 'react-icons/fi';

export const ExtractionQueue: React.FC<{ queue: any[], onSelect: (id: string) => void }> = ({ queue, onSelect }) => {
    if (!queue || queue.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 text-center py-16">
                <FiDatabase className="mx-auto text-gray-300 dark:text-gray-600 mb-5" size={48} />
                <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">Extraction queue is currently empty.</p>
                <p className="text-sm text-gray-400 mt-2">No documents pending question extraction.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                    <FiActivity className="mr-3 text-purple-500" size={20} /> Active Extraction Queue
                </h3>
                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-black shadow-sm">
                    {queue.length} JOBS
                </span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto p-3">
                {queue.map(job => (
                    <div 
                        key={job._id} 
                        onClick={() => onSelect(job.paperId._id || job.paperId)}
                        className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    >
                        <div className="overflow-hidden">
                            <p className="font-bold text-gray-900 dark:text-white text-sm truncate pr-4">{job.paperId?.title || job.paperId}</p>
                            <p className="text-xs font-semibold text-gray-500 mt-1.5 flex items-center">
                                <FiClock className="mr-1.5" /> {new Date(job.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-black shadow-inner border flex-shrink-0 ${
                            job.status === 'PROCESSING' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' 
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                            {job.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
