import React, { useState } from 'react';
import { useAIFeedback } from '../hooks/useAIFeedback';

interface ReviewerWorkspaceProps {
  item: any;
  onComplete: () => void;
}

export const ReviewerWorkspace: React.FC<ReviewerWorkspaceProps> = ({ item, onComplete }) => {
  const { submitEvaluation } = useAIFeedback();
  const [decision, setDecision] = useState<'ACCEPT' | 'REJECT' | 'NEEDS_IMPROVEMENT'>('NEEDS_IMPROVEMENT');
  const [notes, setNotes] = useState('');

  if (!item) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-center h-full">
        <p className="text-gray-500">Select an item from the queue to evaluate.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEvaluation.mutate(
      { feedbackId: item.id, evaluation: { decision, notes } },
      { onSuccess: () => { setNotes(''); onComplete(); } }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white">Workspace Evaluation</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">User Feedback Details</h4>
          <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
             <div className="mb-2"><span className="font-semibold text-sm">Type:</span> <span className="text-sm">{item.type}</span></div>
             <div><span className="font-semibold text-sm">Comment:</span> <span className="text-sm text-gray-600 dark:text-gray-400 italic">"{item.writtenFeedback || 'N/A'}"</span></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Evaluation Decision</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setDecision('ACCEPT')} className={`flex-1 py-2 rounded text-xs font-bold transition-colors \${decision === 'ACCEPT' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'}`}>VALID FEEDBACK (ACCEPT)</button>
              <button type="button" onClick={() => setDecision('NEEDS_IMPROVEMENT')} className={`flex-1 py-2 rounded text-xs font-bold transition-colors \${decision === 'NEEDS_IMPROVEMENT' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'}`}>NEEDS PROMPT TUNING</button>
              <button type="button" onClick={() => setDecision('REJECT')} className={`flex-1 py-2 rounded text-xs font-bold transition-colors \${decision === 'REJECT' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'}`}>INVALID FEEDBACK (REJECT)</button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Reviewer Notes (Analysis & Next Steps)</label>
            <textarea 
              value={notes} onChange={(e) => setNotes(e.target.value)} required
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              placeholder="e.g. The user's feedback is correct. The RAG context did not pull chapter 4. We should add a constraint to the Search Prompt."
            />
          </div>

          <button 
            type="submit" 
            disabled={submitEvaluation.isPending || !notes.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitEvaluation.isPending ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </form>
      </div>
    </div>
  );
};
