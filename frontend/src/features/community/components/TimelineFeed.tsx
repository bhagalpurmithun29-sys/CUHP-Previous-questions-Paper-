import React from 'react';
import { FiCheckCircle, FiUploadCloud, FiFlag } from 'react-icons/fi';

interface TimelineFeedProps {
  timeline: any[];
}

export const TimelineFeed: React.FC<TimelineFeedProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <div className="text-sm text-gray-500 py-4">No recent activity.</div>;
  }

  const getActionDetails = (action: string) => {
    switch(action.toUpperCase()) {
      case 'UPLOAD': return { color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30', icon: FiUploadCloud, label: 'Uploaded a new paper' };
      case 'VERIFY': return { color: 'text-green-500 bg-green-100 dark:bg-green-900/30', icon: FiCheckCircle, label: 'Verified a paper' };
      case 'REPORT': return { color: 'text-red-500 bg-red-100 dark:bg-red-900/30', icon: FiFlag, label: 'Submitted a report' };
      case 'EARN_BADGE': return { color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30', icon: FiCheckCircle, label: 'Earned a new badge' };
      default: return { color: 'text-gray-500 bg-gray-100 dark:bg-gray-800', icon: FiCheckCircle, label: 'Performed an action' };
    }
  };

  return (
    <div className="flow-root mt-6">
      <ul className="-mb-8">
        {timeline.map((event, idx) => {
          const config = getActionDetails(event.action || event.entityType);
          const Icon = config.icon;
          
          return (
            <li key={event._id || idx}>
              <div className="relative pb-8">
                {idx !== timeline.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${config.color}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-gray-300">
                        {config.label}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-xs text-gray-500">
                      <time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
