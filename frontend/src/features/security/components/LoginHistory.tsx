import React from 'react';
import { useLoginHistory } from '../hooks/useSecurityCenter';
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const LoginHistory: React.FC = () => {
  const { data: history, isLoading } = useLoginHistory();

  if (isLoading) return <div className="animate-pulse h-48 bg-muted/20 rounded-2xl"></div>;
  if (!history || history.length === 0) return null;

  const getEventIcon = (action: string) => {
    switch (action) {
      case 'LOGIN': return <ArrowRightOnRectangleIcon className="w-5 h-5 text-success" />;
      case 'LOGOUT': return <ArrowLeftOnRectangleIcon className="w-5 h-5 text-muted-foreground" />;
      case 'FAILED_LOGIN': return <XCircleIcon className="w-5 h-5 text-destructive" />;
      default: return <ArrowRightOnRectangleIcon className="w-5 h-5 text-primary" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/10">
        <h3 className="font-semibold text-lg">Login History</h3>
        <p className="text-sm text-muted-foreground mt-1">Review your recent authentication activity.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="bg-muted/30 text-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Event</th>
              <th className="px-6 py-4 font-semibold">IP Address</th>
              <th className="px-6 py-4 font-semibold">Date & Time</th>
              <th className="px-6 py-4 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white dark:bg-gray-900">
            {history.map((event: any) => (
              <tr key={event._id} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      {getEventIcon(event.action)}
                    </div>
                    <span className="font-medium text-foreground">
                      {event.action.replace(/_/g, ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{event.ipAddress || 'Unknown'}</td>
                <td className="px-6 py-4">{formatDate(event.createdAt)}</td>
                <td className="px-6 py-4">
                  {event.metadata?.reason && <span className="text-destructive font-medium">{event.metadata.reason}</span>}
                  {event.metadata?.action && <span className="text-success font-medium">{event.metadata.action}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
