import React from 'react';
import { useMobileOperations } from '../hooks/useMobileOperations';

export const IncidentCenter: React.FC = () => {
  const { incidents, isIncidentsLoading } = useMobileOperations();

  if (isIncidentsLoading) {
    return <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Incidents</h2>
        <button className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold px-3 py-1.5 rounded">
          + Declare Incident
        </button>
      </div>
      {incidents?.length === 0 ? (
         <div className="p-8 text-center text-sm text-gray-500">No active incidents.</div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {incidents?.map((inc: any) => (
            <li key={inc.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gray-500">{inc.id}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{inc.title}</h3>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`}>
                  {inc.severity}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Status: <strong className="text-gray-900 dark:text-gray-300">{inc.status}</strong></span>
                <span>Opened: {new Date(inc.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
