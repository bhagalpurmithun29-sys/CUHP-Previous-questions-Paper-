import React from 'react';
import { useReminders } from '../hooks/useReminders';

export const ReminderList: React.FC = () => {
  const { reminders, isLoading, snoozeReminder, completeReminder } = useReminders();

  if (isLoading) return <div className="p-4 text-gray-500">Loading reminders...</div>;

  return (
    <div className="space-y-4">
      {reminders.map((reminder: any) => (
        <div key={reminder._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded \${
                reminder.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                reminder.status === 'SNOOZED' ? 'bg-yellow-100 text-yellow-700' :
                reminder.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {reminder.status}
              </span>
              <span className="text-xs text-gray-500">
                Scheduled: {new Date(reminder.scheduledTime).toLocaleString()}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{reminder.title}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reminder.message}</p>
          </div>
          
          {reminder.status !== 'COMPLETED' && (
            <div className="flex gap-2">
              <button 
                onClick={() => snoozeReminder.mutate({ id: reminder._id, minutes: 15 })}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                Snooze 15m
              </button>
              <button 
                onClick={() => completeReminder.mutate(reminder._id)}
                className="px-3 py-1.5 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 rounded"
              >
                Mark Done
              </button>
            </div>
          )}
        </div>
      ))}
      
      {reminders.length === 0 && (
        <div className="text-center p-8 text-gray-500 text-sm">
          No reminders found.
        </div>
      )}
    </div>
  );
};
