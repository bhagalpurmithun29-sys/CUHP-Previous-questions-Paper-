import React from 'react';
import { usePatternAnalysis } from '../hooks/usePatternAnalysis';
import { FiCopy, FiExternalLink } from 'react-icons/fi';

export const PatternComparison: React.FC<{ paperId: string }> = ({ paperId }) => {
    const { getSimilar } = usePatternAnalysis(paperId);
    
    if (getSimilar.isLoading) return <div className="p-6 text-center text-gray-500">Loading similarity data...</div>;
    if (!getSimilar.data || !getSimilar.data.matches) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex items-center mb-6">
                <FiCopy className="text-blue-500 mr-3" size={24} />
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Historical Pattern Matches</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSimilar.data.matches.map((match: any, idx: number) => (
                    <div key={idx} className="p-4 border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl flex justify-between items-center transition-all hover:shadow-md">
                        <div>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Similar Blueprint Found</p>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">{match.paperId}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-black text-blue-600 dark:text-blue-400">{match.similarity}%</span>
                            <button className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:text-blue-600 transition-colors">
                                <FiExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {getSimilar.data.matches.length === 0 && (
                    <p className="text-gray-500 text-sm">No historically matching blueprints found. This layout appears unique.</p>
                )}
            </div>
        </div>
    );
};
