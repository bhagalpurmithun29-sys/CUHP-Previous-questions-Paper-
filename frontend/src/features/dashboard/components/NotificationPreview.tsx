import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiBell, FiCheckCircle, FiInfo, FiAlertTriangle, FiXCircle } from 'react-icons/fi';
import type { DashboardNotification } from '../types/dashboard.types';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

interface NotificationPreviewProps {
  notifications: DashboardNotification[];
  isLoading: boolean;
}

const getNotificationIcon = (type: DashboardNotification['type']) => {
  switch (type) {
    case 'SUCCESS':
      return <FiCheckCircle className="h-5 w-5 text-green-500" />;
    case 'WARNING':
      return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'ERROR':
      return <FiXCircle className="h-5 w-5 text-red-500" />;
    case 'INFO':
    default:
      return <FiInfo className="h-5 w-5 text-blue-500" />;
  }
};

export const NotificationPreview: React.FC<NotificationPreviewProps> = ({ notifications, isLoading }) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">{DASHBOARD_CONSTANTS.TITLES.NOTIFICATIONS}</h3>
          {unreadCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          Mark all as read
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex h-16 w-full animate-pulse rounded-lg bg-gray-50" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
          <FiBell className="mb-2 h-8 w-8 opacity-20" />
          <p className="text-sm">{DASHBOARD_CONSTANTS.MESSAGES.NO_NOTIFICATIONS}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 rounded-xl border border-gray-100 p-3 transition-colors ${
                notification.isRead ? 'bg-white opacity-70' : 'bg-blue-50/30'
              }`}
            >
              <div className="mt-0.5 shrink-0">{getNotificationIcon(notification.type)}</div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm ${notification.isRead ? 'font-medium text-gray-700' : 'font-semibold text-gray-900'}`}>
                  {notification.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{notification.message}</p>
                <p className="mt-1 text-[10px] text-gray-400 font-medium">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
              {!notification.isRead && (
                <div className="shrink-0 mt-1">
                  <span className="block h-2 w-2 rounded-full bg-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
