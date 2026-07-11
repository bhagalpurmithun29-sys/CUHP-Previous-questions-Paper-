import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUploadCloud, FiZap, FiCalendar, FiFolder, FiBookmark, FiDownload, FiPieChart } from 'react-icons/fi';

const actions = [
  { name: 'Search Papers', icon: <FiSearch />, path: '/search', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Upload Paper', icon: <FiUploadCloud />, path: '/upload', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { name: 'AI Assistant', icon: <FiZap />, path: '/ai', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { name: 'Study Planner', icon: <FiCalendar />, path: '/study-planner', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'My Library', icon: <FiFolder />, path: '/library', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { name: 'Bookmarks', icon: <FiBookmark />, path: '/bookmarks', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  { name: 'Downloads', icon: <FiDownload />, path: '/downloads', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { name: 'Analytics', icon: <FiPieChart />, path: '/statistics', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/20' },
];

export const QuickActions: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.path}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform group-hover:scale-110 ${action.bg} ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
