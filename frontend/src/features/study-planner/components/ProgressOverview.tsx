import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProgressOverviewProps {
  weeklyCompleted: number;
  weeklyTotal: number;
  monthlyCompleted: number;
  monthlyTotal: number;
  overallCompletion: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({ weeklyCompleted, weeklyTotal, monthlyCompleted, monthlyTotal, overallCompletion }) => {
  const data = [
    { name: 'Completed', value: overallCompletion },
    { name: 'Remaining', value: 100 - overallCompletion }
  ];
  const COLORS = ['#3B82F6', '#E5E7EB'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
      <div className="flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-800">
        <div className="h-32 w-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={40} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry, index) => (
                  <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `\${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{overallCompletion}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium mt-2">Overall Progress</p>
      </div>
      
      <div className="flex flex-col justify-center px-6">
        <p className="text-sm text-gray-500 font-medium mb-1">Weekly Targets</p>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyCompleted}</span>
          <span className="text-gray-500 mb-1">/ {weeklyTotal} tasks</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `\${weeklyTotal > 0 ? (weeklyCompleted/weeklyTotal)*100 : 0}%` }}></div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center px-6">
        <p className="text-sm text-gray-500 font-medium mb-1">Monthly Targets</p>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{monthlyCompleted}</span>
          <span className="text-gray-500 mb-1">/ {monthlyTotal} tasks</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `\${monthlyTotal > 0 ? (monthlyCompleted/monthlyTotal)*100 : 0}%` }}></div>
        </div>
      </div>
    </div>
  );
};
