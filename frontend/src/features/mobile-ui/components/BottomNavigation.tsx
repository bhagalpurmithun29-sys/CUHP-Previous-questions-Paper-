import React from 'react';

export const BottomNavigation: React.FC = () => {
  // Stub for Bottom Navigation (Appears only on mobile via ResponsiveLayout)
  const navItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Search', icon: '🔍' },
    { label: 'Bookmarks', icon: '🔖' },
    { label: 'Menu', icon: '☰' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 px-6 py-3 flex justify-between items-center pb-[env(safe-area-inset-bottom,12px)]">
      {navItems.map((item, idx) => (
        <button key={idx} className="flex flex-col items-center justify-center text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
          <span className="text-xl mb-1">{item.icon}</span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
