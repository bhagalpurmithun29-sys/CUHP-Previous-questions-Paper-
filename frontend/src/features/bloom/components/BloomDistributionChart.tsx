import React from 'react';

export const BloomDistributionChart: React.FC<{ distribution: any }> = ({ distribution }) => {
    if (!distribution) return null;
    
    const maxVal = Math.max(...Object.values(distribution) as number[], 1);
    
    const levels = [
        { key: 'remember', label: 'Remember', color: 'bg-emerald-400' },
        { key: 'understand', label: 'Understand', color: 'bg-teal-400' },
        { key: 'apply', label: 'Apply', color: 'bg-cyan-400' },
        { key: 'analyze', label: 'Analyze', color: 'bg-blue-400' },
        { key: 'evaluate', label: 'Evaluate', color: 'bg-indigo-400' },
        { key: 'create', label: 'Create', color: 'bg-purple-400' },
    ];

    return (
        <div className="w-full">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">Taxonomy Distribution</h4>
            <div className="space-y-4">
                {levels.map(level => {
                    const val = distribution[level.key] || 0;
                    const percent = Math.round((val / maxVal) * 100);
                    return (
                        <div key={level.key} className="flex items-center gap-4 group">
                            <div className="w-24 text-xs font-bold text-gray-700 dark:text-gray-300 text-right group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{level.label}</div>
                            <div className="flex-1 h-3.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full ${level.color} transition-all duration-1000 shadow-sm`} style={{ width: `${percent}%` }}></div>
                            </div>
                            <div className="w-8 text-sm font-black text-gray-900 dark:text-white">{val}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
