import React from 'react';

interface SafetyEventsProps {
  events: any[];
}

export const SafetyEvents: React.FC<SafetyEventsProps> = ({ events }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex-1 overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Security & Audit Logs</h3>
      
      {!events || events.length === 0 ? (
        <div className="text-sm text-gray-500">No recent events.</div>
      ) : (
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="mt-1 shrink-0">
                {event.action === 'BLOCKED' ? (
                  <div className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-100 dark:ring-red-900/30"></div>
                ) : event.action === 'FLAGGED' ? (
                  <div className="w-2 h-2 rounded-full bg-orange-500 ring-4 ring-orange-100 dark:ring-orange-900/30"></div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.type}</p>
                <p className="text-xs text-gray-500 mt-1">{event.details}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] text-gray-400">{new Date(event.timestamp).toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400">• User: {event.userId.substring(0,6)}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
