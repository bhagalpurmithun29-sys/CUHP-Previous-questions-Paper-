import React, { useState } from 'react';
import { useModeration } from '../hooks/useModeration';
import { ModerationQueue } from '../components/ModerationQueue';
import { FiShield, FiFilter } from 'react-icons/fi';

export const ModerationDashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const { reportsData, isLoading } = useModeration({ status: statusFilter || undefined });

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiShield className="mr-3 text-blue-600 dark:text-blue-400" />
            Moderation Queue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Quality assurance and issue tracking for the Question Paper Repository.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 shadow-sm">
          <span className="pl-3 text-gray-500"><FiFilter /></span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-0 py-2 pr-10"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">Total Reports</div>
          <div className="text-4xl font-bold text-gray-900 dark:text-white">{reportsData?.total || 0}</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30 shadow-sm">
          <div className="text-sm text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider mb-2">Critical Issues</div>
          <div className="text-4xl font-bold text-red-700 dark:text-red-400">
            {reportsData?.data?.filter((r: any) => r.priority === 'CRITICAL' && r.status !== 'RESOLVED' && r.status !== 'CLOSED').length || 0}
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30 shadow-sm">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-2">Pending Review</div>
          <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
            {reportsData?.data?.filter((r: any) => r.status === 'OPEN' || r.status === 'ASSIGNED').length || 0}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30 shadow-sm">
          <div className="text-sm text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider mb-2">Resolved</div>
          <div className="text-4xl font-bold text-green-700 dark:text-green-400">
            {reportsData?.data?.filter((r: any) => r.status === 'RESOLVED').length || 0}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-sm"></div>
        </div>
      ) : (
        <ModerationQueue reports={reportsData?.data || []} />
      )}
    </div>
  );
};
