import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const BloomDistributionDashboard: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;
    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-80">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Bloom's Taxonomy Allocation</h4>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
