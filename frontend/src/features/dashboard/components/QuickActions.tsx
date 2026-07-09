import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiUpload, FiFolder, FiBookmark, FiDownload, FiSettings } from 'react-icons/fi';

const actions = [
  { label: 'Browse Papers', icon: FiSearch, to: '/papers', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: 'Search Papers', icon: FiSearch, to: '/search', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'Upload Paper', icon: FiUpload, to: '/upload', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'My Library', icon: FiFolder, to: '/library', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Bookmarks', icon: FiBookmark, to: '/library/bookmarks', color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { label: 'Download History', icon: FiDownload, to: '/library/history', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
  { label: 'Profile Settings', icon: FiSettings, to: '/profile/settings', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
];

export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={action.to}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light hover:shadow-md transition-all group h-full"
              >
                <div className={`p-3 rounded-full mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
