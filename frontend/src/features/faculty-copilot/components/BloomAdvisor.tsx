import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BloomAdvisorProps {
  distribution: { [key: string]: number };
}

export const BloomAdvisor: React.FC<BloomAdvisorProps> = ({ distribution }) => {
  const data = Object.keys(distribution).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: distribution[key]
  }));

  const COLORS = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Bloom's Taxonomy Balance</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            {entry.name} ({entry.value}%)
          </div>
        ))}
      </div>
    </div>
  );
};
