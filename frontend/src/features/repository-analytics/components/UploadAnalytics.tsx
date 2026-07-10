import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const UploadAnalytics: React.FC<{ data: any }> = ({ data }) => {
  if (!data?.timeline) return null;

  const chartData = data.timeline.map((item: any) => ({
    name: item._id,
    uploads: item.uploads
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upload Timeline (30 Days)</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} allowDecimals={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              cursor={{fill: 'rgba(79, 70, 229, 0.05)'}}
            />
            <Bar dataKey="uploads" fill="#4F46E5" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
