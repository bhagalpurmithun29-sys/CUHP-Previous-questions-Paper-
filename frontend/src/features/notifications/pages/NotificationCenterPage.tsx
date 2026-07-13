import React, { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationList } from '../components/NotificationList';
import { NotificationFilters } from '../components/NotificationFilters';
import { NotificationPreferences } from '../components/NotificationPreferences';

export const NotificationCenterPage: React.FC = () => {
  const [filter, setFilter] = useState('all'); // all, unread, archived
  
  const queryFilters: any = {};
  if (filter === 'unread') queryFilters.unreadOnly = 'true';
  if (filter === 'archived') queryFilters.archived = 'true';

  const { 
    notifications, 
    isLoading, 
    markAsRead, 
    markAllAsRead, 
    archiveNotification, 
    deleteNotification 
  } = useNotifications(queryFilters);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Inbox */}
        <div className="lg:col-span-8">
          <header className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Notification Center</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Stay updated on your repositories, reviews, and AI analysis.</p>
            </div>
            {notifications.length > 0 && filter !== 'archived' && (
              <button 
                onClick={() => markAllAsRead.mutate()}
                disabled={markAllAsRead.isPending}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Mark all as read
              </button>
            )}
          </header>

          <NotificationFilters filter={filter} setFilter={setFilter} />

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 min-h-[500px]">
             <NotificationList 
                notifications={notifications} 
                isLoading={isLoading}
                onRead={(id) => markAsRead.mutate(id)}
                onArchive={(id) => archiveNotification.mutate(id)}
                onDelete={(id) => deleteNotification.mutate(id)}
             />
          </div>
        </div>

        {/* Sidebar: Preferences */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            <NotificationPreferences />
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationCenterPage;
