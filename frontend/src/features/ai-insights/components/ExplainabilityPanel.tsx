import React from 'react';
import { FiCpu, FiCheckCircle } from 'react-icons/fi';

export const ExplainabilityPanel: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.explainability) return null;

    return (
        <div className="bg-slate-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm mt-8">
            <div className="flex items-center mb-6">
                <FiCpu className="text-slate-500 mr-3" size={24} />
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Explainable AI Reasoning</h4>
            </div>

            <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 text-sm">
                {data.explainability.reasoningSummary}
            </p>

            <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Traceable Evidence References</p>
                {data.explainability.evidenceReferences.map((ref: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-gray-800 p-3 rounded-xl border border-slate-100 dark:border-gray-700">
                        <FiCheckCircle className="text-emerald-500 mr-3 mt-0.5 shrink-0" />
                        <span>{ref}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
