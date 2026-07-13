import React from 'react';
import { useDeviceSecurity } from '../hooks/useDeviceSecurity';

export const ActiveSessions: React.FC = () => {
  const { activeSessions, isSessionsLoading, revokeSession, revokeOtherSessions } = useDeviceSecurity();

  if (isSessionsLoading) return <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-900 dark:text-white">Active Sessions</h3>
        <button 
          onClick={() => revokeOtherSessions.mutate()}
          className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 transition-colors"
        >
          Sign out of all other devices
        </button>
      </div>

      <div className="space-y-4">
        {activeSessions?.map((session: any) => (
          <div key={session.id} className={`flex items-center justify-between p-4 rounded-lg border \${session.isCurrent ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-gray-200 dark:bg-gray-950 dark:border-gray-800'}`}>
            <div className="flex items-start gap-4">
               <div className="text-3xl mt-1">
                 {session.os === 'macOS' || session.os === 'Windows' ? '💻' : '📱'}
               </div>
               <div>
                 <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                   {session.device}
                   {session.isCurrent && <span className="text-[10px] uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded-full">This Device</span>}
                 </h4>
                 <p className="text-sm text-gray-500 mt-1">{session.browser} on {session.os}</p>
                 <p className="text-xs text-gray-400 mt-1">{session.location} • Last active {new Date(session.lastActive).toLocaleString()}</p>
               </div>
            </div>
            {!session.isCurrent && (
               <button 
                 onClick={() => revokeSession.mutate(session.id)}
                 className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
               >
                 Revoke
               </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
