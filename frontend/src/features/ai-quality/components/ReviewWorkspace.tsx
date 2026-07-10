import React, { useState } from 'react';
import { FiCheck, FiX, FiEdit3, FiRefreshCw } from 'react-icons/fi';

export const ReviewWorkspace: React.FC<{ task: any, onSubmit: (data: any) => void }> = ({ task, onSubmit }) => {
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');

    if (!task) return (
        <div className="bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-slate-200 dark:border-gray-700 h-[600px] flex items-center justify-center">
            <p className="text-slate-400 font-medium text-lg">Select a task from the queue to review.</p>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-[600px] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Review Workspace</h3>
                <span className="text-sm font-medium text-gray-500">ID: {task._id.slice(-6)}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Original AI Output ({task.analysisType})</h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                        <pre>{JSON.stringify(task.originalOutput, null, 2)}</pre>
                    </div>
                </div>

                <div>
                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Reviewer Notes</h4>
                     <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add justification for rejection or correction..."
                        className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-rose-500 resize-none h-24"
                     />
                </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                    onClick={() => onSubmit({ reviewId: task._id, status: 'APPROVED' })}
                    className="flex items-center justify-center py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold rounded-xl transition-colors"
                >
                    <FiCheck className="mr-2" /> Approve
                </button>
                <button 
                    onClick={() => onSubmit({ reviewId: task._id, status: 'MANUALLY_CORRECTED', notes })}
                    className="flex items-center justify-center py-3 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold rounded-xl transition-colors"
                >
                    <FiEdit3 className="mr-2" /> Correct
                </button>
                 <button 
                    onClick={() => onSubmit({ reviewId: task._id, status: 'PENDING_REVIEW' })} // Simulating reprocess
                    className="flex items-center justify-center py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl transition-colors"
                >
                    <FiRefreshCw className="mr-2" /> Reprocess
                </button>
                <button 
                    onClick={() => onSubmit({ reviewId: task._id, status: 'REJECTED', notes })}
                    className="flex items-center justify-center py-3 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl transition-colors"
                >
                    <FiX className="mr-2" /> Reject
                </button>
            </div>
        </div>
    );
};
