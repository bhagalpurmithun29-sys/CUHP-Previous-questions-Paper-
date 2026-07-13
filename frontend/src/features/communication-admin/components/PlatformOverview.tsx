import React from 'react';
import { useCommunicationAdmin } from '../hooks/useCommunicationAdmin';

export const PlatformOverview: React.FC = () => {
  const { overview, isOverviewLoading } = useCommunicationAdmin();

  if (isOverviewLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const metrics = [
    { title: 'Total Notifications', value: overview.totalNotifications || 0 },
    { title: 'Messages Today', value: overview.messagesToday || 0 },
    { title: 'Announcements Published', value: overview.announcementsPublished || 0 },
    { title: 'Reminder Queue', value: overview.reminderQueue || 0 },
    { title: 'Delivery Health', value: `\${overview.deliveryHealth || 0}%` },
    { title: 'Comm Health Score', value: overview.communicationHealthScore || 0 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm hover:border-indigo-500 transition-colors">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">{metric.title}</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};
