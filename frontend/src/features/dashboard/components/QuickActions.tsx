import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFileText, FiBookmark, FiUploadCloud, FiClock, FiSettings } from 'react-icons/fi';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

export const QuickActions: React.FC = () => {
  const actions = [
    { title: 'Search Papers', icon: FiSearch, path: '/papers/search', color: 'bg-blue-500 text-white hover:bg-blue-600' },
    { title: 'Browse Papers', icon: FiFileText, path: '/papers', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
    { title: 'Bookmarks', icon: FiBookmark, path: '/dashboard/bookmarks', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
    { title: 'My Uploads', icon: FiUploadCloud, path: '/dashboard/uploads', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
    { title: 'Download History', icon: FiClock, path: '/dashboard/downloads', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
    { title: 'Settings', icon: FiSettings, path: '/settings', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{DASHBOARD_CONSTANTS.TITLES.QUICK_ACTIONS}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action, index) => (
          <Link to={action.path} key={action.title}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center rounded-xl p-4 text-center transition-colors ${action.color}`}
            >
              <action.icon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">{action.title}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
