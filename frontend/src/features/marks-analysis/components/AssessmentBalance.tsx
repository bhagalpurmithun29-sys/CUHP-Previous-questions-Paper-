import React from 'react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

export const AssessmentBalance: React.FC<{ indicators: any }> = ({ indicators }) => {
    if (!indicators) return null;
    
    const items = [
        { label: 'Marks Balance', value: indicators.marksBalance },
        { label: 'Section Balance', value: indicators.sectionBalance },
        { label: 'Topic Coverage', value: indicators.topicCoverage },
        { label: 'Difficulty Dist.', value: indicators.difficultyDistribution },
        { label: 'Bloom Dist.', value: indicators.bloomDistribution },
    ];

    const getColor = (val: string) => {
        if (val === 'Excellent') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200';
        if (val === 'Good') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
        if (val === 'Fair') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200';
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-full flex flex-col">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Assessment Quality Indicators</h4>
            <div className="space-y-4 flex-1">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {(item.value === 'Excellent' || item.value === 'Good') ? 
                                <FiCheckCircle className="text-emerald-500" size={18} /> : 
                                <FiAlertTriangle className="text-amber-500" size={18} />
                            }
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getColor(item.value)}`}>
                            {item.value || 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
