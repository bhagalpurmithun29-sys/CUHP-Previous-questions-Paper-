import React from 'react';
import { FiList, FiClock, FiCpu } from 'react-icons/fi';

export const ValidationQueue: React.FC<{ queue: any[], onSelect: (task: any) => void }> = ({ queue, onSelect }) => {
    if (!queue) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden h-[600px] flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
                <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center">
                    <FiList className="mr-2 text-rose-500" /> Pending Review Queue
                </h3>
                <span className="bg-rose-100 text-rose-600 text-xs font-black px-3 py-1 rounded-full">{queue.length} Tasks</span>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {queue.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">Queue is empty.</div>
                ) : (
                    queue.map((task) => (
                        <div 
                            key={task._id} 
                            onClick={() => onSelect(task)}
                            className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-rose-500 hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                    {task.analysisType}
                                </span>
                                <span className={`text-xs font-black px-2 py-1 rounded ${task.confidenceScore < 80 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {task.confidenceScore}% Conf.
                                </span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors">
                                {task.paperId?.title || 'Unknown Paper'}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 font-medium">
                                <FiClock className="mr-1" /> {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
