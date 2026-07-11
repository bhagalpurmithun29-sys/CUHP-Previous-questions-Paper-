import React from 'react';
import { FiBell } from 'react-icons/fi';

export const NotificationDropdown: React.FC = () => {
  return (
    <div className="relative">
      <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
        <FiBell className="w-5 h-5" />
        <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full group-hover:animate-pulse"></span>
      </button>
      
      {/* Dropdown content can be added here later */}
    </div>
  );
};
