import React from 'react';

interface NotificationCardProps {
  notification: any;
  onRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onRead, onArchive, onDelete }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'PAPER_APPROVED': return <span className="bg-green-100 text-green-600 p-2 rounded-full">✓</span>;
      case 'PAPER_REJECTED': return <span className="bg-red-100 text-red-600 p-2 rounded-full">✗</span>;
      case 'SYSTEM_ALERT': return <span className="bg-orange-100 text-orange-600 p-2 rounded-full">!</span>;
      default: return <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full">i</span>;
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all \${notification.isRead ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-75' : 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800 shadow-sm'}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm font-semibold \${notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {notification.message}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            {notification.link ? (
              <a href={notification.link} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                View Details →
              </a>
            ) : <div />}
            
            <div className="flex gap-3">
              {!notification.isRead && (
                <button onClick={() => onRead(notification._id)} className="text-xs font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Mark Read
                </button>
              )}
              {!notification.isArchived && (
                <button onClick={() => onArchive(notification._id)} className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  Archive
                </button>
              )}
              <button onClick={() => onDelete(notification._id)} className="text-xs font-medium text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
