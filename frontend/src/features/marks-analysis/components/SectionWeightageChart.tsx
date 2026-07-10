import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#0ea5e9', '#3b82f6'];

export const SectionWeightageChart: React.FC<{ breakdown: any[] }> = ({ breakdown }) => {
    if (!breakdown || breakdown.length === 0) return null;
    
    const data = breakdown.map(s => ({
        name: `Section ${s.sectionName}`,
        value: s.totalMarks
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-80">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Section Marks Distribution</h4>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`${value} Marks`, 'Weight']}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
