import React from 'react';
import { FiGrid } from 'react-icons/fi';

export const BlueprintViewer: React.FC<{ blueprint: any }> = ({ blueprint }) => {
    if (!blueprint || !blueprint.sectionStructures) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex items-center mb-6">
                <FiGrid className="text-indigo-500 mr-3" size={24} />
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Generated Exam Blueprint</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sections</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{blueprint.sectionCount}</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Questions</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{blueprint.totalQuestionCount}</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Marks</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{blueprint.totalMarks}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-3 text-sm font-bold text-gray-500">Section</th>
                            <th className="pb-3 text-sm font-bold text-gray-500">Questions</th>
                            <th className="pb-3 text-sm font-bold text-gray-500">Marks/Q</th>
                            <th className="pb-3 text-sm font-bold text-gray-500">Choice Pattern</th>
                            <th className="pb-3 text-sm font-bold text-gray-500">Dominant Bloom</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {blueprint.sectionStructures.map((sec: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="py-4 font-bold text-gray-900 dark:text-white">{sec.sectionName}</td>
                                <td className="py-4 text-gray-600 dark:text-gray-300">{sec.questionCount}</td>
                                <td className="py-4 text-gray-600 dark:text-gray-300">{sec.marksPerQuestion}</td>
                                <td className="py-4 text-gray-600 dark:text-gray-300">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${sec.choicePattern === 'No Choice' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
                                        {sec.choicePattern}
                                    </span>
                                </td>
                                <td className="py-4 text-gray-600 dark:text-gray-300">{sec.dominantBloom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
