import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiDownload, FiBookmark, FiUpload, FiLogIn, FiActivity } from 'react-icons/fi';
import type { DashboardActivity } from '../types/dashboard.types';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

interface RecentActivityProps {
  activities: DashboardActivity[];
  isLoading: boolean;
}

const getActivityIcon = (type: DashboardActivity['type']) => {
  switch (type) {
    case 'DOWNLOAD':
      return <FiDownload className="text-blue-500" />;
    case 'BOOKMARK':
      return <FiBookmark className="text-indigo-500" />;
    case 'UPLOAD':
      return <FiUpload className="text-purple-500" />;
    case 'LOGIN':
      return <FiLogIn className="text-gray-500" />;
    default:
      return <FiActivity className="text-gray-500" />;
  }
};

const getActivityColor = (type: DashboardActivity['type']) => {
  switch (type) {
    case 'DOWNLOAD':
      return 'bg-blue-50 border-blue-100';
    case 'BOOKMARK':
      return 'bg-indigo-50 border-indigo-100';
    case 'UPLOAD':
      return 'bg-purple-50 border-purple-100';
    case 'LOGIN':
      return 'bg-gray-50 border-gray-100';
    default:
      return 'bg-gray-50 border-gray-100';
  }
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, isLoading }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{DASHBOARD_CONSTANTS.TITLES.RECENT_ACTIVITY}</h3>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex h-12 w-full animate-pulse rounded-lg bg-gray-50" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-sm text-gray-500">{DASHBOARD_CONSTANTS.MESSAGES.NO_ACTIVITY}</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center rounded-xl border p-3 ${getActivityColor(activity.type)} transition-colors hover:bg-white`}
            >
              <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                {getActivityIcon(activity.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500 capitalize">{activity.type.toLowerCase()}</p>
              </div>
              <div className="ml-4 shrink-0 text-right">
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
                {activity.status && (
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${
                    activity.status === 'SUCCESS' ? 'text-green-600' :
                    activity.status === 'FAILED' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {activity.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
