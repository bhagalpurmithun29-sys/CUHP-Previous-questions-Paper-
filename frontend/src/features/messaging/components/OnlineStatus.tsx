import React from 'react';

export const OnlineStatus: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 \${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
  );
};
