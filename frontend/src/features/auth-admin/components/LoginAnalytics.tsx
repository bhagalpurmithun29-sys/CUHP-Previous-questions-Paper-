import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // assuming these exist, otherwise native tailwind
import { Loader2 } from 'lucide-react';

interface LoginAnalyticsProps {
  data: any;
  isLoading: boolean;
}

export const LoginAnalytics: React.FC<LoginAnalyticsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const { successRate, failureRate, totalLogins, peakHours } = data?.analytics || {};

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Login Analytics (24h)</CardTitle>
        <CardDescription>Authentication success and failure rates over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Success Rate</h4>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{successRate?.toFixed(1) || 0}%</p>
          </div>
          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Failure Rate</h4>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">{failureRate?.toFixed(1) || 0}%</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
            <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Logins</h4>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalLogins || 0}</p>
          </div>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={peakHours}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
