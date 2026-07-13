import React from 'react';

export const UnreadCounter: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full">
      {count} new
    </span>
  );
};
