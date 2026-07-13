import React from 'react';
import { ReminderList } from '../components/ReminderList';

export const ReminderDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reminder Engine</h1>
            <p className="text-sm text-gray-500 mt-1">Manage scheduled notifications, tasks, and system escalations.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            + New Reminder
          </button>
        </header>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <ReminderList />
        </div>
      </div>
    </div>
  );
};

export default ReminderDashboardPage;
