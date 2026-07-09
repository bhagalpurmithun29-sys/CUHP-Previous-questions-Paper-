import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Notification } from '../types/dashboard.types';
import { FiBell, FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

interface NotificationsWidgetProps {
  notifications?: Notification[];
  loading?: boolean;
}

export const NotificationsWidget: React.FC<NotificationsWidgetProps> = ({ notifications = [], loading }) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'SUCCESS': return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'WARNING': return <FiAlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'ERROR': return <FiXCircle className="w-4 h-4 text-red-500" />;
      case 'INFO':
      default:
        return <FiInfo className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBg = (type: Notification['type'], read: boolean) => {
    if (read) return 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
    switch (type) {
      case 'SUCCESS': return 'bg-green-50 text-green-700 dark:bg-green-900/20';
      case 'WARNING': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20';
      case 'ERROR': return 'bg-red-50 text-red-700 dark:bg-red-900/20';
      case 'INFO':
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiBell className="text-primary" />
          Notifications
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
        <Link to="/notifications" className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light">
          All Notifications
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.slice(0, 4).map((notification, idx) => (
              <motion.li 
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-lg ${!notification.read ? 'bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700' : ''}`}
              >
                <div className={`p-2 rounded-full shrink-0 ${getBg(notification.type, notification.read)}`}>
                  {getIcon(notification.type)}
                </div>
                <div>
                  <p className={`text-sm ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100 font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <FiBell className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};
