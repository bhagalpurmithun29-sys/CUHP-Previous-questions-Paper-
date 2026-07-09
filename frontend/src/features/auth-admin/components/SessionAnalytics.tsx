import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, MonitorSmartphone, Globe, Activity } from 'lucide-react';

interface SessionAnalyticsProps {
  data: any;
  isLoading: boolean;
}

export const SessionAnalytics: React.FC<SessionAnalyticsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="flex h-32 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const { activeSessions } = data?.analytics || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Health</CardTitle>
        <CardDescription>Real-time active sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 text-primary rounded-full">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concurrent Active</p>
              <h3 className="text-4xl font-bold">{activeSessions || 0}</h3>
            </div>
          </div>
          
          <div className="hidden sm:block space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4" /> Multi-device tracking enabled
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Geo-location active
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
