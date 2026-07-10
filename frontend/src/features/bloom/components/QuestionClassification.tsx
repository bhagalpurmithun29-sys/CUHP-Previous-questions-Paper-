import React, { useState } from 'react';
import { FiCheckCircle, FiEdit3, FiXCircle } from 'react-icons/fi';

const BloomColors: Record<string, string> = {
    'Remember': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    'Understand': 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
    'Apply': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
    'Analyze': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'Evaluate': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
    'Create': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
};

export const QuestionClassification: React.FC<{ 
    classification: any, 
    onReview: (qId: string, action: 'APPROVE'|'REJECT'|'EDIT', level?: string) => void 
}> = ({ classification, onReview }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [overrideLevel, setOverrideLevel] = useState(classification.bloomLevel);
    
    const activeLevel = classification.manualOverrideLevel || classification.bloomLevel;

    return (
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        ID: {classification.questionId}
                    </span>
                    <span className={`px-3 py-1 text-xs font-black rounded-lg border shadow-sm uppercase tracking-wider ${BloomColors[activeLevel] || 'bg-gray-100 text-gray-800'}`}>
                        {activeLevel}
                    </span>
                    {classification.manualOverrideLevel && (
                        <span className="text-[10px] font-black text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded shadow-sm uppercase">Manual Override</span>
                    )}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-500">AI Confidence:</span>
                    <span className={`text-sm font-black ${classification.confidenceScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {classification.confidenceScore}%
                    </span>
                </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium italic border-l-4 border-indigo-200 dark:border-indigo-800 pl-4 py-2 mb-4 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/50 rounded-r-xl">
                " {classification.reasoningSummary} "
            </p>
            
            {classification.reviewStatus === 'PENDING_REVIEW' && !isEditing && (
                <div className="flex gap-3 justify-end border-t border-gray-100 dark:border-gray-700 pt-3">
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-lg transition-colors"><FiEdit3 /> Edit</button>
                    <button onClick={() => onReview(classification.questionId, 'REJECT')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors"><FiXCircle /> Reject</button>
                    <button onClick={() => onReview(classification.questionId, 'APPROVE')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 rounded-lg transition-colors"><FiCheckCircle /> Approve</button>
                </div>
            )}
            
            {isEditing && (
                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 mt-2">
                    <select 
                        value={overrideLevel}
                        onChange={(e) => setOverrideLevel(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Remember">Remember</option>
                        <option value="Understand">Understand</option>
                        <option value="Apply">Apply</option>
                        <option value="Analyze">Analyze</option>
                        <option value="Evaluate">Evaluate</option>
                        <option value="Create">Create</option>
                    </select>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancel</button>
                    <button onClick={() => {
                        onReview(classification.questionId, 'EDIT', overrideLevel);
                        setIsEditing(false);
                    }} className="px-4 py-2 text-sm text-white bg-blue-600 font-bold hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Save Override</button>
                </div>
            )}
            
            {classification.reviewStatus !== 'PENDING_REVIEW' && (
                <div className="flex justify-end mt-2">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded shadow-sm border ${
                        classification.reviewStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        classification.reviewStatus === 'EDITED' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                        'bg-rose-50 text-rose-600 border-rose-200'
                    }`}>
                        {classification.reviewStatus}
                    </span>
                </div>
            )}
        </div>
    );
};
