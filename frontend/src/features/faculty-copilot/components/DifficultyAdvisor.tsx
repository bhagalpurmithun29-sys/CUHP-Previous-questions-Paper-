import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DifficultyAdvisorProps {
  distribution: { easy: number; medium: number; hard: number };
}

export const DifficultyAdvisor: React.FC<DifficultyAdvisorProps> = ({ distribution }) => {
  const data = [
    { name: 'Easy', value: distribution.easy, fill: '#10b981' },
    { name: 'Medium', value: distribution.medium, fill: '#f59e0b' },
    { name: 'Hard', value: distribution.hard, fill: '#ef4444' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Difficulty Index</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={60} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-\${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
