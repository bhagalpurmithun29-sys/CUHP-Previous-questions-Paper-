import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MFAAnalyticsProps {
  data: any;
  isLoading: boolean;
}

export const MFAAnalytics: React.FC<MFAAnalyticsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="flex h-48 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const { totalUsers, mfaEnabled, mfaEnrollmentRate } = data?.identityStats || {};
  
  const mfaData = [
    { name: 'MFA Enabled', value: mfaEnabled || 0 },
    { name: 'MFA Disabled', value: (totalUsers || 0) - (mfaEnabled || 0) }
  ];

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <Card className="col-span-1 md:col-span-1">
      <CardHeader>
        <CardTitle>MFA Adoption</CardTitle>
        <CardDescription>Multi-factor authentication statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-3xl font-bold">{mfaEnrollmentRate?.toFixed(1) || 0}%</h4>
            <p className="text-sm text-muted-foreground">Enrollment Rate</p>
          </div>
          <div className={`p-3 rounded-full ${mfaEnrollmentRate > 50 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {mfaEnrollmentRate > 50 ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mfaData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {mfaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
