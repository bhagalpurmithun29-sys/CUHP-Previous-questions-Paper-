import React from 'react';

export const ComplexityAnalysis: React.FC<{ distribution: any }> = ({ distribution }) => {
    if (!distribution || !distribution.complexity) return null;
    
    const complexityDist = distribution.complexity;
    const maxVal = Math.max(...Object.values(complexityDist) as number[], 1);
    
    const levels = [
        { key: 'Single Concept', color: 'bg-emerald-400' },
        { key: 'Multi Concept', color: 'bg-blue-400' },
        { key: 'Analytical Reasoning', color: 'bg-indigo-400' },
        { key: 'Problem Solving', color: 'bg-purple-400' },
        { key: 'Multi Step Reasoning', color: 'bg-rose-400' },
        { key: 'Critical Thinking', color: 'bg-red-500' },
    ];

    return (
        <div className="w-full">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">Cognitive Complexity Profile</h4>
            <div className="space-y-4">
                {levels.map(level => {
                    const val = complexityDist[level.key] || 0;
                    const percent = Math.round((val / maxVal) * 100);
                    return (
                        <div key={level.key} className="flex items-center gap-4 group">
                            <div className="w-36 text-xs font-bold text-gray-700 dark:text-gray-300 truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-right">{level.key}</div>
                            <div className="flex-1 h-3.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full ${level.color} transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                            </div>
                            <div className="w-6 text-sm font-black text-gray-900 dark:text-white">{val}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
