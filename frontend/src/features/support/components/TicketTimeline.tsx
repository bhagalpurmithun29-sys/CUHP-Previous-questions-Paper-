import React, { useState } from 'react';
import { useAddReply } from '../hooks/useSupport';
import { useAuth } from '../../auth/hooks/useAuth';

export const TicketTimeline: React.FC<{ ticket: any }> = ({ ticket }) => {
  const { user } = useAuth();
  const mutation = useAddReply();
  const [reply, setReply] = useState('');

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    mutation.mutate({ id: ticket._id, payload: { message: reply } }, {
      onSuccess: () => setReply('')
    });
  };

  return (
    <div className="space-y-8">
      {/* Original Description */}
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
          {ticket.userId?.firstName?.[0] || 'U'}
        </div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-gray-900 dark:text-white">{ticket.userId?.firstName || 'User'}</span>
            <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
          </div>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{ticket.description}</div>
        </div>
      </div>

      {/* Replies */}
      {ticket.replies?.map((r: any, idx: number) => (
        <div key={idx} className={`flex gap-4 ${r.isAdmin ? 'flex-row-reverse' : ''}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${r.isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-primary/20 text-primary'}`}>
            {r.senderName?.[0]}
          </div>
          <div className={`flex-1 rounded-2xl p-5 border ${r.isAdmin ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800'}`}>
            <div className={`flex justify-between items-start mb-2 ${r.isAdmin ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-white">{r.senderName}</span>
                {r.isAdmin && <span className="bg-amber-200 text-amber-800 text-[10px] px-2 py-0.5 rounded uppercase font-bold">Support</span>}
              </div>
              <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</span>
            </div>
            <div className={`text-sm whitespace-pre-wrap ${r.isAdmin ? 'text-amber-900 dark:text-amber-200 text-right' : 'text-gray-700 dark:text-gray-300'}`}>
              {r.message}
            </div>
          </div>
        </div>
      ))}

      {/* Reply Box */}
      {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
        <form onSubmit={handleReply} className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-primary focus:border-primary resize-none"
            placeholder="Type your reply here..."
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button 
              type="submit" 
              disabled={mutation.isPending || !reply.trim()}
              className="bg-primary text-white font-bold px-6 py-2 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
