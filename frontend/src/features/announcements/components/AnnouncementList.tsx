import React from 'react';
import { AnnouncementCard } from './AnnouncementCard';

export const AnnouncementList: React.FC<{ announcements: any[], isLoading: boolean, onAcknowledge: (id: string) => void, isAdmin?: boolean }> = ({ announcements, isLoading, onAcknowledge, isAdmin }) => {
  if (isLoading) {
    return <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>)}
    </div>;
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No announcements found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map(ann => (
        <AnnouncementCard 
          key={ann._id} 
          announcement={ann} 
          onAcknowledge={onAcknowledge}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};
