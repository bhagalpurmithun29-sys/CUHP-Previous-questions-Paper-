import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthAdmin } from '../hooks/useAuthAdmin';
import { Loader2, AlertTriangle, Lock, ShieldX, KeyRound } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const SecurityEvents: React.FC = () => {
  const { useSecurityEvents } = useAuthAdmin();
  const { data: events, isLoading } = useSecurityEvents();

  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Recent Security Events</CardTitle></CardHeader>
        <CardContent className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></CardContent>
      </Card>
    );
  }

  const getEventIcon = (action: string) => {
    switch (action) {
      case 'LOGIN_FAILED': return <ShieldX className="w-4 h-4 text-red-500" />;
      case 'ACCOUNT_LOCKED': return <Lock className="w-4 h-4 text-red-600" />;
      case 'PASSWORD_RESET_REQUESTED': return <KeyRound className="w-4 h-4 text-amber-500" />;
      case 'MFA_FAILED': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventBg = (action: string) => {
    switch (action) {
      case 'LOGIN_FAILED': return 'bg-red-500/10 border-red-500/20';
      case 'ACCOUNT_LOCKED': return 'bg-red-600/10 border-red-600/20';
      case 'PASSWORD_RESET_REQUESTED': return 'bg-amber-500/10 border-amber-500/20';
      case 'MFA_FAILED': return 'bg-orange-500/10 border-orange-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Security Events</CardTitle>
        <CardDescription>Latest alerts requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events?.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">No recent security events detected.</div>
          ) : (
            events?.map((event: any) => (
              <div key={event._id} className={`flex items-start gap-4 p-3 rounded-lg border ${getEventBg(event.action)}`}>
                <div className="mt-1">{getEventIcon(event.action)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.action.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.userId ? `${event.userId.firstName} ${event.userId.lastName}` : event.emailAttempted} • IP: {event.ipAddress}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
