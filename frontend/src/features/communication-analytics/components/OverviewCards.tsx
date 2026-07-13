import React from 'react';
import { useCommunicationAnalytics } from '../hooks/useCommunicationAnalytics';

export const OverviewCards: React.FC = () => {
  const { overview, isOverviewLoading } = useCommunicationAnalytics();

  if (isOverviewLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const metrics = [
    { title: 'Total Notifications', value: overview.totalNotifications || 0 },
    { title: 'Delivered Reminders', value: overview.deliveredReminders || 0 },
    { title: 'Completed Tasks', value: overview.completedTasks || 0 },
    { title: 'Engagement Rate', value: `\${overview.engagementRate || 0}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{metric.title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};
