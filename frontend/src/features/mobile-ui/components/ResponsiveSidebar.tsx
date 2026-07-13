import React from 'react';

export const ResponsiveSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col h-full">
      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">CUHP System</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <a href="#" className="block px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 font-medium">Dashboard</a>
        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Repositories</a>
        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Collaboration</a>
        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Admin</a>
      </nav>
    </aside>
  );
};
