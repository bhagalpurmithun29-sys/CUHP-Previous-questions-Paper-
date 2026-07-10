import React from 'react';
import { FiTarget } from 'react-icons/fi';

export const ExecutiveSummary: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.executiveSummary) return null;

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-8 border border-indigo-700">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <FiTarget size={120} />
            </div>
            <div className="relative z-10">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4 flex items-center">
                    <FiTarget className="mr-2" /> AI Executive Summary
                </h3>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-indigo-50 max-w-4xl">
                    "{data.executiveSummary}"
                </p>
            </div>
        </div>
    );
};
