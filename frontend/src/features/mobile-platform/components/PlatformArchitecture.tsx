import React from 'react';
import { useMobilePlatform } from '../hooks/useMobilePlatform';

export const PlatformArchitecture: React.FC = () => {
  const { dependencies, isDependenciesLoading } = useMobilePlatform();

  if (isDependenciesLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Core Modules Architecture</h2>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {dependencies?.map((dep: any, idx: number) => (
          <li key={idx} className="p-4 flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">{dep.module}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded \${dep.status === 'INTEGRATED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
              {dep.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
