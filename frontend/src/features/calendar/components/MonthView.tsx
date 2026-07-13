import React from 'react';

export const MonthView: React.FC<{ events: any[], currentDate: Date }> = ({ events, currentDate }) => {
  // Simplified calendar grid logic for demonstration
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    if (dayNum > 0 && dayNum <= daysInMonth) return dayNum;
    return null;
  });

  return (
    <div className="grid grid-cols-7 border-t border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="h-10 border-b border-r border-gray-200 dark:border-gray-800 flex items-center justify-center text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
          {day}
        </div>
      ))}
      {days.map((day, i) => (
        <div key={i} className="min-h-[120px] p-2 border-b border-r border-gray-200 dark:border-gray-800 relative group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
          {day && (
            <>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
              <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px]">
                {events
                  .filter(e => new Date(e.startDate).getDate() === day)
                  .map(e => (
                    <div key={e._id} className="text-[10px] px-1.5 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded truncate cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-900" title={e.title}>
                      {e.title}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
