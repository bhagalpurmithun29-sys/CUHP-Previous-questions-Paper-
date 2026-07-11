import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export const ConversationSettings: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors group">
        <Cog6ToothIcon className="w-5 h-5 group-hover:rotate-45 transition-transform" />
      </button>
      {/* Dropdown for settings can go here (e.g. Model selection, Creativity slider) */}
    </div>
  );
};
