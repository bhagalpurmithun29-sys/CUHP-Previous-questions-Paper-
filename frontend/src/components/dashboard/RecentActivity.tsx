import React from 'react';
import { FiClock, FiFileText, FiSearch, FiZap, FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const activities = [
  { id: 1, type: 'paper', title: 'Advanced Algorithms 2023', subtitle: 'Viewed 2 hours ago', icon: <FiFileText className="text-blue-500" /> },
  { id: 2, type: 'search', title: 'Machine Learning Basics', subtitle: 'Searched yesterday', icon: <FiSearch className="text-purple-500" /> },
  { id: 3, type: 'chat', title: 'Explained P vs NP', subtitle: 'AI Chat 2 days ago', icon: <FiZap className="text-indigo-500" /> },
  { id: 4, type: 'upload', title: 'Operating Systems 2022', subtitle: 'Uploaded last week', icon: <FiUpload className="text-emerald-500" /> },
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiClock /> Recent Activity
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <Link 
            key={activity.id} 
            to="#" 
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">{activity.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
