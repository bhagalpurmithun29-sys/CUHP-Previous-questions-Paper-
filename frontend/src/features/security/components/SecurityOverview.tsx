import React from 'react';
import { SecurityScore } from './SecurityScore';
import { useSecurityOverview } from '../hooks/useSecurityCenter';

export const SecurityOverview: React.FC = () => {
  const { data, isLoading } = useSecurityOverview();

  if (isLoading) {
    return <div className="h-48 bg-muted/20 animate-pulse rounded-2xl"></div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <SecurityScore score={data.score} checks={data.checks} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Active Sessions</h4>
          <p className="text-3xl font-display font-bold text-foreground">{data.metrics.activeSessions}</p>
        </div>
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Trusted Devices</h4>
          <p className="text-3xl font-display font-bold text-foreground">{data.metrics.trustedDevices}</p>
        </div>
      </div>
    </div>
  );
};
