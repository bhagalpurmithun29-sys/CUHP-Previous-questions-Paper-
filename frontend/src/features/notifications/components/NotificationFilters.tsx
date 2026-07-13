import React from 'react';

export const NotificationFilters: React.FC<{ filter: string, setFilter: (f: string) => void }> = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
      {[
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'archived', label: 'Archived' }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors \${filter === tab.id ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
