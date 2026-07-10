import React from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const HierarchyTree: React.FC<{ questions: any[] }> = ({ questions }) => {
    if (!questions || questions.length === 0) return <p className="text-gray-500">No questions extracted.</p>;

    return (
        <div className="space-y-4">
            {questions.map((q, index) => (
                <div key={q.id || index} className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-black text-sm shadow-inner">
                                {q.section ? `Sec ${q.section}` : ''} Q{q.questionNumber}{q.subQuestion ? `.${q.subQuestion}` : ''}
                            </span>
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 rounded-md border border-purple-100 dark:border-purple-800">
                                {q.questionType}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300">
                                {q.marks ? `[${q.marks} Marks]` : ''}
                            </span>
                            {q.estimatedConfidence >= 90 ? (
                                <FiCheckCircle className="text-emerald-500" title={`Confidence: ${q.estimatedConfidence}%`} size={18} />
                            ) : (
                                <FiAlertCircle className="text-amber-500" title={`Low Confidence: ${q.estimatedConfidence}%`} size={18} />
                            )}
                        </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {q.questionText}
                    </p>
                    {q.choiceGroup && (
                        <div className="mt-4 inline-block px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-lg border border-amber-200 dark:border-amber-800/50 shadow-sm">
                            OR Choice Group: {q.choiceGroup}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
