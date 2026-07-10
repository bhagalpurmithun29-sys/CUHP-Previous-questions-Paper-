import React, { useState } from 'react';
import { FiCheckCircle, FiEdit3, FiXCircle, FiClock, FiLink } from 'react-icons/fi';

const DifficultyColors: Record<string, string> = {
    'Very Easy': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    'Easy': 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
    'Medium': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'Hard': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    'Very Hard': 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
};

export const QuestionDifficulty: React.FC<{ 
    analysis: any, 
    onReview: (qId: string, action: 'APPROVE'|'REJECT'|'EDIT', overrides?: any) => void 
}> = ({ analysis, onReview }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [overrideDiff, setOverrideDiff] = useState(analysis.difficultyLevel);
    const [overrideTime, setOverrideTime] = useState(analysis.expectedSolvingTimeMinutes);
    
    const activeDifficulty = analysis.manualOverrides?.difficultyLevel || analysis.difficultyLevel;
    const activeTime = analysis.manualOverrides?.expectedSolvingTimeMinutes || analysis.expectedSolvingTimeMinutes;

    return (
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        ID: {analysis.questionId}
                    </span>
                    <span className={`px-4 py-1 text-xs font-black rounded-lg border shadow-sm uppercase tracking-wider ${DifficultyColors[activeDifficulty] || 'bg-gray-100 text-gray-800'}`}>
                        {activeDifficulty}
                    </span>
                    {analysis.manualOverrides && (
                        <span className="text-[10px] font-black text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded shadow-sm uppercase">Manual Override</span>
                    )}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-500">AI Confidence:</span>
                    <span className={`text-sm font-black ${analysis.confidenceScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {analysis.confidenceScore}%
                    </span>
                </div>
            </div>
            
            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center mb-1.5">Cognitive Complexity</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{analysis.complexityType}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center mb-1.5"><FiClock className="mr-1.5" size={14} /> Expected Time</p>
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">{activeTime} minutes</p>
                </div>
            </div>
            
            <div className="mb-5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center"><FiLink className="mr-1.5" /> Prerequisite Knowledge</p>
                <div className="flex flex-wrap gap-2">
                    {analysis.prerequisiteKnowledge?.map((kw: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                            {kw}
                        </span>
                    ))}
                </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium italic border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-5">
                {analysis.reasoningSummary}
            </p>
            
            {analysis.reviewStatus === 'PENDING_REVIEW' && !isEditing && (
                <div className="flex gap-3 justify-end border-t border-gray-100 dark:border-gray-700 pt-4">
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-lg transition-colors"><FiEdit3 /> Edit</button>
                    <button onClick={() => onReview(analysis.questionId, 'REJECT')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors"><FiXCircle /> Reject</button>
                    <button onClick={() => onReview(analysis.questionId, 'APPROVE')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 rounded-lg transition-colors"><FiCheckCircle /> Approve</button>
                </div>
            )}
            
            {isEditing && (
                <div className="flex flex-col md:flex-row items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 mt-2">
                    <div className="flex flex-1 gap-3 w-full">
                        <select 
                            value={overrideDiff}
                            onChange={(e) => setOverrideDiff(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
                        >
                            <option value="Very Easy">Very Easy</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Very Hard">Very Hard</option>
                        </select>
                        <input 
                            type="number"
                            min="1"
                            max="60"
                            value={overrideTime}
                            onChange={(e) => setOverrideTime(parseInt(e.target.value))}
                            className="w-24 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-center"
                            placeholder="Mins"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none px-4 py-2 text-sm text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancel</button>
                        <button onClick={() => {
                            onReview(analysis.questionId, 'EDIT', { difficultyLevel: overrideDiff, expectedSolvingTimeMinutes: overrideTime });
                            setIsEditing(false);
                        }} className="flex-1 md:flex-none px-4 py-2 text-sm text-white bg-blue-600 font-bold hover:bg-blue-700 rounded-lg shadow-sm transition-colors">Save</button>
                    </div>
                </div>
            )}
            
            {analysis.reviewStatus !== 'PENDING_REVIEW' && (
                <div className="flex justify-end mt-2">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded shadow-sm border ${
                        analysis.reviewStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        analysis.reviewStatus === 'EDITED' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                        'bg-rose-50 text-rose-600 border-rose-200'
                    }`}>
                        {analysis.reviewStatus}
                    </span>
                </div>
            )}
        </div>
    );
};
