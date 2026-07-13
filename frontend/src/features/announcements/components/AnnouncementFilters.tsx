import React from 'react';

export const AnnouncementFilters: React.FC<{ filter: string, setFilter: (f: string) => void }> = ({ filter, setFilter }) => {
  const categories = [
    { id: 'ALL', label: 'All Announcements' },
    { id: 'UNIVERSITY_NOTICE', label: 'University Notices' },
    { id: 'COURSE_CIRCULAR', label: 'Course Circulars' },
    { id: 'EMERGENCY_ALERT', label: 'Emergency Alerts' }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(tab => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors \${filter === tab.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
