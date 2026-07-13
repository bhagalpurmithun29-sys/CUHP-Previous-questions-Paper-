import React from 'react';
import { useMobileOperations } from '../hooks/useMobileOperations';

export const ServiceStatus: React.FC = () => {
  const { health, isHealthLoading } = useMobileOperations();

  if (isHealthLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Global Infrastructure Status</h2>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {health?.map((service: any, idx: number) => (
          <li key={idx} className="p-4 flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full \${service.status === 'OPERATIONAL' ? 'bg-green-500' : 'bg-orange-500'}`} />
              <span className={`text-sm font-semibold \${service.status === 'OPERATIONAL' ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
                {service.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
