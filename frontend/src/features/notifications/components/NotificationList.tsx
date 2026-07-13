import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationList: React.FC<{ notifications: any[], onRead: any, onArchive: any, onDelete: any, isLoading: boolean }> = ({ notifications, onRead, onArchive, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>)}
    </div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No notifications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <NotificationCard 
          key={notification._id}
          notification={notification}
          onRead={onRead}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
