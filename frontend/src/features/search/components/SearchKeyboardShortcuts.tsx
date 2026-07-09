import React, { useEffect } from 'react';

export const SearchKeyboardShortcuts: React.FC = () => {
  return (
    <div className="hidden lg:block bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Keyboard Shortcuts</h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="flex items-center justify-between">
          <span>Focus Search</span>
          <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md font-mono text-xs shadow-sm">
            ⌘ + K
          </kbd>
        </li>
        <li className="flex items-center justify-between">
          <span>Close Overlay</span>
          <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md font-mono text-xs shadow-sm">
            Esc
          </kbd>
        </li>
        <li className="flex items-center justify-between">
          <span>Navigate Results</span>
          <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md font-mono text-xs shadow-sm">
            ↑ ↓
          </kbd>
        </li>
        <li className="flex items-center justify-between">
          <span>Open Result</span>
          <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md font-mono text-xs shadow-sm">
            Enter
          </kbd>
        </li>
      </ul>
    </div>
  );
};
