import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '../types/dashboard.types';
import { FiActivity, FiDownload, FiUpload, FiBookmark, FiFlag } from 'react-icons/fi';

interface ActivityTimelineProps {
  activities?: Activity[];
  loading?: boolean;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities = [], loading }) => {
  const getActionIcon = (action: Activity['action']) => {
    switch (action) {
      case 'DOWNLOAD': return <FiDownload className="w-4 h-4 text-blue-500" />;
      case 'UPLOAD': return <FiUpload className="w-4 h-4 text-green-500" />;
      case 'BOOKMARK': return <FiBookmark className="w-4 h-4 text-yellow-500" />;
      case 'REPORT': return <FiFlag className="w-4 h-4 text-red-500" />;
      default: return <FiActivity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionBg = (action: Activity['action']) => {
    switch (action) {
      case 'DOWNLOAD': return 'bg-blue-100 dark:bg-blue-900/30 ring-blue-50 dark:ring-blue-900/20';
      case 'UPLOAD': return 'bg-green-100 dark:bg-green-900/30 ring-green-50 dark:ring-green-900/20';
      case 'BOOKMARK': return 'bg-yellow-100 dark:bg-yellow-900/30 ring-yellow-50 dark:ring-yellow-900/20';
      case 'REPORT': return 'bg-red-100 dark:bg-red-900/30 ring-red-50 dark:ring-red-900/20';
      default: return 'bg-gray-100 dark:bg-gray-800 ring-gray-50 dark:ring-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FiActivity className="text-primary" />
        Recent Activity
      </h3>

      {loading ? (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.125rem] before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative flex items-center gap-4 animate-pulse">
              <div className="relative z-10 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length > 0 ? (
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.125rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
          <ul className="space-y-6">
            {activities.slice(0, 5).map((activity, idx) => (
              <motion.li 
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-center gap-4"
              >
                <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-800 ${getActionBg(activity.action)}`}>
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {activity.action.toLowerCase()}: 
                    </span>{' '}
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(activity.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
            <FiActivity className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity found.</p>
        </div>
      )}
    </div>
  );
};
