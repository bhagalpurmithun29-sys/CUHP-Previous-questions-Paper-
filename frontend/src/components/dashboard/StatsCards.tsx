import React from 'react';
import { FiFileText, FiBookOpen, FiDownload, FiBookmark, FiClock, FiTrendingUp } from 'react-icons/fi';

const stats = [
  { label: 'Question Papers', value: '1,248', icon: <FiFileText />, trend: '+12% this month' },
  { label: 'Subjects Covered', value: '156', icon: <FiBookOpen />, trend: '+4 new' },
  { label: 'Total Downloads', value: '45.2K', icon: <FiDownload />, trend: '+8.4% this week' },
  { label: 'My Bookmarks', value: '34', icon: <FiBookmark />, trend: '2 to review' },
  { label: 'Study Hours', value: '128h', icon: <FiClock />, trend: '+4h this week' },
  { label: 'Reading Progress', value: '68%', icon: <FiTrendingUp />, trend: 'On track' },
];

export const StatsCards: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Statistics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
            <div className="text-xs text-primary font-medium">{stat.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
