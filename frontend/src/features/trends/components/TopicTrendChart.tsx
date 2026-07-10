import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TopicTrendChart: React.FC<{ data: any[] }> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const chartData = data.map(yearData => {
        const row: any = { year: yearData.year };
        yearData.topics.forEach((t: any) => {
            row[t.name] = t.count;
        });
        return row;
    });

    const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-96">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Topic Evolution (Frequency)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Area type="monotone" dataKey="Data Structures" stackId="1" stroke={colors[0]} fill={colors[0]} fillOpacity={0.6} />
                    <Area type="monotone" dataKey="Algorithms" stackId="1" stroke={colors[1]} fill={colors[1]} fillOpacity={0.6} />
                    <Area type="monotone" dataKey="Machine Learning" stackId="1" stroke={colors[2]} fill={colors[2]} fillOpacity={0.6} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
