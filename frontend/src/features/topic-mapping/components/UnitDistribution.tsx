import React from 'react';
import { FiPieChart } from 'react-icons/fi';

export const UnitDistribution: React.FC<{ distribution: Record<string, number> }> = ({ distribution }) => {
    if (!distribution || Object.keys(distribution).length === 0) return null;
    
    const maxVal = Math.max(...Object.values(distribution), 1);

    return (
        <div className="w-full">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                <FiPieChart className="mr-2" /> Unit Coverage
            </h4>
            <div className="space-y-3">
                {Object.entries(distribution).map(([unit, val], idx) => {
                    const percent = Math.round((val / maxVal) * 100);
                    const colors = ['bg-blue-400', 'bg-indigo-400', 'bg-violet-400', 'bg-purple-400', 'bg-fuchsia-400'];
                    const color = colors[idx % colors.length];
                    
                    return (
                        <div key={unit} className="flex items-center gap-4 group">
                            <div className="w-28 text-xs font-bold text-gray-700 dark:text-gray-300 truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors" title={unit}>{unit}</div>
                            <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                            </div>
                            <div className="w-6 text-xs font-black text-gray-900 dark:text-white text-right">{val}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
