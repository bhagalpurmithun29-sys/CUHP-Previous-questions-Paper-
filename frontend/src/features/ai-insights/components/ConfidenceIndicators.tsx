import React from 'react';
import { FiShield } from 'react-icons/fi';

export const ConfidenceIndicators: React.FC<{ score: number }> = ({ score }) => {
    return (
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm inline-flex">
            <FiShield className={score >= 90 ? 'text-emerald-500' : 'text-amber-500'} />
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">AI Confidence:</span>
            <span className={`text-sm font-black ${score >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {score}%
            </span>
        </div>
    );
};
