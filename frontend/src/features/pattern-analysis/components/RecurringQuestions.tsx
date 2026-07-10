import React from 'react';
import { FiRepeat } from 'react-icons/fi';

export const RecurringQuestions: React.FC<{ structures: any[] }> = ({ structures }) => {
    if (!structures || structures.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-full">
            <div className="flex items-center mb-6">
                <FiRepeat className="text-rose-500 mr-3" size={24} />
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Detected Recurring Structures</h4>
            </div>
            
            <div className="space-y-4">
                {structures.map((struct, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-gray-900 dark:text-white">{struct.type}</h5>
                            <span className="px-2 py-1 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg text-xs font-black">
                                {struct.frequency}% FREQUENCY
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{struct.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
