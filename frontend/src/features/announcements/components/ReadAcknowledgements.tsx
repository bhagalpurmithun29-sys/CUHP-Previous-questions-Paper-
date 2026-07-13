import React from 'react';

export const ReadAcknowledgements: React.FC<{ readCount: number, totalExpected?: number }> = ({ readCount, totalExpected }) => {
  const percentage = totalExpected ? Math.round((readCount / totalExpected) * 100) : null;
  
  return (
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {readCount} {readCount === 1 ? 'View' : 'Views'} {percentage !== null ? `(\${percentage}%)` : ''}
      </span>
    </div>
  );
};
