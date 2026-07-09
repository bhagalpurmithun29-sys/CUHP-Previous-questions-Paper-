import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthAdmin } from '../hooks/useAuthAdmin';
import { Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const IdentityProviders: React.FC = () => {
  const { useIdentityProviders } = useAuthAdmin();
  const { data, isLoading } = useIdentityProviders();

  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Identity Providers</CardTitle></CardHeader>
        <CardContent className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></CardContent>
      </Card>
    );
  }

  const chartData = [
    { name: 'Local Auth', users: data?.local || 0, color: '#3b82f6' },
    { name: 'Google', users: data?.google || 0, color: '#ef4444' },
    { name: 'Microsoft', users: data?.microsoft || 0, color: '#0ea5e9' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Providers</CardTitle>
        <CardDescription>User distribution by SSO provider</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
              <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip 
                cursor={{ fill: 'var(--muted)' }}
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
              />
              <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
