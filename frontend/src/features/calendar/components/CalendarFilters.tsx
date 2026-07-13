import React, { useState } from 'react';

export const CalendarFilters: React.FC<{ filter: string, setFilter: (f: string) => void }> = ({ filter, setFilter }) => {
  const types = ['ALL', 'UNIVERSITY_EVENT', 'DEPARTMENT_EVENT', 'COURSE_EVENT', 'EXAMINATION', 'HOLIDAY'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {types.map(t => (
        <button
          key={t}
          onClick={() => setFilter(t)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors \${filter === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
          {t.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
};
