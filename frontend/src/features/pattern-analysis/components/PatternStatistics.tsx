import React from 'react';
import { FiTrendingUp, FiCrosshair, FiMaximize } from 'react-icons/fi';

export const PatternStatistics: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.blueprint) return null;
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Blueprint Analytics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-2xl">
                        <FiTrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                            {data.blueprint.sectionStructures.reduce((acc: number, cur: any) => acc + (cur.marksPerQuestion || 0), 0) / (data.blueprint.sectionCount || 1) | 0}
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Marks/Question</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 rounded-2xl">
                        <FiCrosshair size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                            {data.blueprintSimilarityScore > 80 ? 'Standard' : 'Variant'}
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Template Typology</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-2xl">
                        <FiMaximize size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">
                            {data.recurringStructures?.length || 0}
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Known Vectors</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
