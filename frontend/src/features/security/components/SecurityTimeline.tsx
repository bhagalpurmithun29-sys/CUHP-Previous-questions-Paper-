import React from 'react';
import { useSecurityEvents } from '../hooks/useSecurityCenter';
import { 
  ShieldCheckIcon, KeyIcon, DevicePhoneMobileIcon, EnvelopeIcon, 
  ExclamationTriangleIcon, ShieldExclamationIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export const SecurityTimeline: React.FC = () => {
  const { data: events, isLoading } = useSecurityEvents();

  if (isLoading) return <div className="animate-pulse h-48 bg-muted/20 rounded-2xl"></div>;
  if (!events || events.length === 0) return null;

  const getEventIcon = (action: string) => {
    switch (action) {
      case 'PASSWORD_CHANGED': return <KeyIcon className="w-5 h-5 text-primary" />;
      case 'EMAIL_CHANGED': return <EnvelopeIcon className="w-5 h-5 text-warning" />;
      case 'MFA_ENABLED': return <ShieldCheckIcon className="w-5 h-5 text-success" />;
      case 'MFA_DISABLED': return <ShieldExclamationIcon className="w-5 h-5 text-destructive" />;
      case 'PROVIDER_LINKED': return <DevicePhoneMobileIcon className="w-5 h-5 text-info" />;
      case 'SESSION_REVOKED': return <TrashIcon className="w-5 h-5 text-muted-foreground" />;
      case 'DEVICE_REVOKED': return <ExclamationTriangleIcon className="w-5 h-5 text-warning" />;
      default: return <ShieldCheckIcon className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getEventColor = (action: string) => {
    switch (action) {
      case 'PASSWORD_CHANGED': return 'bg-primary/10 border-primary/20';
      case 'EMAIL_CHANGED': return 'bg-warning/10 border-warning/20';
      case 'MFA_ENABLED': return 'bg-success/10 border-success/20';
      case 'MFA_DISABLED': return 'bg-destructive/10 border-destructive/20';
      case 'PROVIDER_LINKED': return 'bg-info/10 border-info/20';
      case 'SESSION_REVOKED': return 'bg-muted/20 border-border';
      case 'DEVICE_REVOKED': return 'bg-warning/10 border-warning/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card rounded-2xl border shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-6">Security Event Timeline</h3>
      <div className="relative border-l-2 border-border ml-4 space-y-8">
        {events.map((event: any) => (
          <div key={event._id} className="relative pl-8">
            <div className={`absolute -left-4 w-8 h-8 rounded-full border-2 bg-card flex items-center justify-center ${getEventColor(event.action)}`}>
              {getEventIcon(event.action)}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{event.action.replace(/_/g, ' ')}</h4>
              <p className="text-xs font-mono text-muted-foreground mt-1 mb-2">{formatDate(event.createdAt)} • IP: {event.ipAddress || 'System'}</p>
              {event.metadata && Object.keys(event.metadata).length > 0 && (
                <div className="bg-muted/20 p-3 rounded-lg text-sm font-mono text-muted-foreground border border-border">
                  {JSON.stringify(event.metadata)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
