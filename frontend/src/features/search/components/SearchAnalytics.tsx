import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { ChartBarIcon, ArrowTrendingUpIcon, ClockIcon } from '@heroicons/react/24/outline';

export const SearchAnalytics: React.FC = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['searchAnalyticsDashboard'],
    queryFn: async () => {
      // In a real scenario, this endpoint would aggregate metrics for the admin.
      // For now, we mock some advanced dashboard metrics based on backend capabilities.
      return {
        totalVolume: 42500,
        avgResponseTime: 120, // ms
        zeroResultRate: 3.5, // %
        ctr: 68.2 // %
      };
    },
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading || !analytics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ChartBarIcon className="w-5 h-5 text-indigo-500" />
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Volume</h4>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalVolume.toLocaleString()}</p>
        <span className="text-xs text-green-500 font-medium mt-1 inline-block">+12% from last week</span>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ClockIcon className="w-5 h-5 text-green-500" />
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Response Time</h4>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.avgResponseTime}ms</p>
        <span className="text-xs text-green-500 font-medium mt-1 inline-block">-15ms from last week</span>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Zero-Result Rate</h4>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.zeroResultRate}%</p>
        <span className="text-xs text-red-500 font-medium mt-1 inline-block">+0.5% from last week</span>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Click-Through Rate</h4>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.ctr}%</p>
        <span className="text-xs text-green-500 font-medium mt-1 inline-block">+2.1% from last week</span>
      </div>
    </div>
  );
};
