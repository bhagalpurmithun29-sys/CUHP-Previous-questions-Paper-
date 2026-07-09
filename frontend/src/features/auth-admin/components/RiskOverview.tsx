import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertOctagon, UserX, ShieldAlert } from 'lucide-react';

interface RiskOverviewProps {
  data: any;
  isLoading: boolean;
}

export const RiskOverview: React.FC<RiskOverviewProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="flex h-32 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const { highRiskIPs, recentAlerts, repeatedFailedLogins } = data?.riskOverview || {};

  return (
    <Card className="bg-destructive/5 border-destructive/20 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertOctagon className="w-5 h-5" /> Threat & Risk Intelligence
        </CardTitle>
        <CardDescription>Automated detection of suspicious activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4 border flex flex-col items-center text-center">
            <ShieldAlert className="w-8 h-8 text-orange-500 mb-2" />
            <h4 className="text-3xl font-bold text-orange-600">{highRiskIPs || 0}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Flagged IPs (24h)</p>
          </div>
          
          <div className="bg-background rounded-lg p-4 border flex flex-col items-center text-center">
            <UserX className="w-8 h-8 text-destructive mb-2" />
            <h4 className="text-3xl font-bold text-destructive">{data?.identityStats?.lockedAccounts || 0}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Locked Accounts</p>
          </div>
        </div>

        {repeatedFailedLogins && repeatedFailedLogins.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-2">Top Targeted IPs (Brute Force Attempts)</h4>
            <div className="space-y-2">
              {repeatedFailedLogins.slice(0, 3).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center bg-background border p-2 rounded text-sm">
                  <span className="font-mono text-xs">{item._id}</span>
                  <span className="text-destructive font-bold">{item.count} attempts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
