import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTicketDetails, useCloseTicket } from '../hooks/useSupport';
import { TicketStatusBadge } from '../components/TicketStatusBadge';
import { TicketTimeline } from '../components/TicketTimeline';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

export const TicketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ticket, isLoading, isError } = useTicketDetails(id as string);
  const closeMutation = useCloseTicket();

  if (isLoading) return <div className="min-h-screen py-20 text-center">Loading ticket...</div>;
  if (isError || !ticket) return <div className="min-h-screen py-20 text-center text-red-500">Ticket not found or access denied.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/support" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-8">
          <FiArrowLeft /> Back to Support Center
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">#{ticket.ticketNumber}</span>
                <TicketStatusBadge status={ticket.status} />
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{ticket.priority} Priority</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{ticket.subject}</h1>
              <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700 dark:text-gray-300">{ticket.category}</span></p>
            </div>
            
            {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to close this ticket?')) {
                    closeMutation.mutate(ticket._id);
                  }
                }}
                disabled={closeMutation.isPending}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors text-sm"
              >
                <FiAlertTriangle /> Close Ticket
              </button>
            )}
          </div>

          <TicketTimeline ticket={ticket} />
        </div>

      </div>
    </div>
  );
};
