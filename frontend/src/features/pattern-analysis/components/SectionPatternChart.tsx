import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SectionPatternChart: React.FC<{ blueprint: any }> = ({ blueprint }) => {
    if (!blueprint || !blueprint.sectionStructures) return null;

    const data = blueprint.sectionStructures.map((sec: any) => ({
        name: sec.sectionName,
        Questions: sec.questionCount,
        'Marks/Q': sec.marksPerQuestion
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-80">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Section Blueprint Pattern</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f3f4f6' }}
                    />
                    <Legend />
                    <Bar dataKey="Questions" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Marks/Q" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
