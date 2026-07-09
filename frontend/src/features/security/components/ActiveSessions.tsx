import React from 'react';
import { useSecuritySessions, useRevokeSession } from '../hooks/useSecurityCenter';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, TrashIcon } from '@heroicons/react/24/outline';

export const ActiveSessions: React.FC = () => {
  const { data: sessions, isLoading } = useSecuritySessions();
  const { mutate: revokeSession, isPending } = useRevokeSession();

  if (isLoading) return <div className="animate-pulse h-48 bg-muted/20 rounded-2xl"></div>;
  if (!sessions || sessions.length === 0) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  const isCurrentSession = (index: number) => index === 0; // Usually the current session is the most recently active or the one making the request. In a real app, compare sessionId with token.

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/10">
        <h3 className="font-semibold text-lg">Active Sessions</h3>
        <p className="text-sm text-muted-foreground mt-1">Manage the devices and browsers currently logged into your account.</p>
      </div>
      <div className="divide-y divide-border">
        {sessions.map((session: any, index: number) => {
          const current = isCurrentSession(index);
          return (
            <div key={session._id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 gap-4">
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center flex-shrink-0 text-muted-foreground">
                  {session.platform?.toLowerCase().includes('ios') || session.platform?.toLowerCase().includes('android') ? 
                    <DevicePhoneMobileIcon className="w-6 h-6" /> : <ComputerDesktopIcon className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{session.browser || 'Unknown Browser'} on {session.platform || 'Unknown OS'}</h4>
                    {current && <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Current</span>}
                  </div>
                  <div className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <p>IP: {session.ip || 'Unknown'}</p>
                    <p>Location: {session.city ? `${session.city}, ${session.country}` : 'Unknown Location'}</p>
                    <p>Started: {formatDate(session.loginAt)}</p>
                    <p>Last Active: {formatDate(session.lastActivity)}</p>
                  </div>
                </div>
              </div>
              {!current && (
                <button 
                  onClick={() => revokeSession(session._id)}
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors flex-shrink-0 flex items-center gap-2 disabled:opacity-50 w-full md:w-auto justify-center"
                >
                  <TrashIcon className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
