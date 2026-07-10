import React from 'react';
import { FiCheckSquare, FiAlertCircle } from 'react-icons/fi';

export const InternalChoiceAnalysis: React.FC<{ blueprint: any }> = ({ blueprint }) => {
    if (!blueprint || !blueprint.sectionStructures) return null;

    const hasChoice = blueprint.sectionStructures.some((s: any) => s.choicePattern !== 'No Choice');

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-full">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Internal Choice Mapping</h4>
            <div className="flex items-center gap-3 mb-6">
                {hasChoice ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg text-sm font-bold">
                        <FiCheckSquare /> Internal Choices Detected
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-lg text-sm font-bold">
                        <FiAlertCircle /> Fully Mandatory Paper
                    </div>
                )}
            </div>
            
            <div className="space-y-3">
                {blueprint.sectionStructures.map((sec: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Section {sec.sectionName}</span>
                        <span className={`text-xs font-black uppercase ${sec.choicePattern === 'No Choice' ? 'text-gray-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {sec.choicePattern}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
