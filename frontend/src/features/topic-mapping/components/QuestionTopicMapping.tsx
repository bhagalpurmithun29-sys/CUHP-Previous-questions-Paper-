import React, { useState } from 'react';
import { FiCheckCircle, FiEdit3, FiXCircle, FiBookOpen, FiBookmark, FiHash } from 'react-icons/fi';

export const QuestionTopicMapping: React.FC<{ 
    mapping: any, 
    onReview: (qId: string, action: 'APPROVE'|'REJECT'|'EDIT', overrides?: any) => void 
}> = ({ mapping, onReview }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const activeUnit = mapping.manualOverrides?.unit || mapping.unit;
    const activeTopic = mapping.manualOverrides?.topic || mapping.topic;

    return (
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        ID: {mapping.questionId}
                    </span>
                    {mapping.manualOverrides && (
                        <span className="text-[10px] font-black text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded shadow-sm uppercase">Manual Override</span>
                    )}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-500">AI Confidence:</span>
                    <span className={`text-sm font-black ${mapping.confidenceScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {mapping.confidenceScore}%
                    </span>
                </div>
            </div>
            
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center mb-1.5"><FiBookOpen className="mr-1.5" size={14} /> Unit</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{activeUnit}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center mb-1.5"><FiBookmark className="mr-1.5" size={14} /> Topic</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{activeTopic}</p>
                </div>
            </div>
            
            <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center"><FiHash className="mr-1.5" /> Detected Keywords</p>
                <div className="flex flex-wrap gap-2">
                    {mapping.keywords?.map((kw: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                            {kw}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-4 mt-5">
                <p className="text-[10px] font-black uppercase text-indigo-500 mb-1.5 tracking-wider">Learning Outcome</p>
                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {mapping.learningOutcome}
                </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium italic border-l-4 border-blue-300 dark:border-blue-700 pl-3 py-1 mb-5">
                {mapping.reasoningSummary}
            </p>
            
            {mapping.reviewStatus === 'PENDING_REVIEW' && !isEditing && (
                <div className="flex gap-3 justify-end border-t border-gray-100 dark:border-gray-700 pt-4">
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-lg transition-colors"><FiEdit3 /> Edit</button>
                    <button onClick={() => onReview(mapping.questionId, 'REJECT')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors"><FiXCircle /> Reject</button>
                    <button onClick={() => onReview(mapping.questionId, 'APPROVE')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 rounded-lg transition-colors"><FiCheckCircle /> Approve</button>
                </div>
            )}
            
            {mapping.reviewStatus !== 'PENDING_REVIEW' && (
                <div className="flex justify-end mt-2">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded shadow-sm border ${
                        mapping.reviewStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        mapping.reviewStatus === 'EDITED' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                        'bg-rose-50 text-rose-600 border-rose-200'
                    }`}>
                        {mapping.reviewStatus}
                    </span>
                </div>
            )}
        </div>
    );
};
