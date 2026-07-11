import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStatistics } from '../types/dashboard.types';
import { FiDownload, FiBookmark, FiUpload, FiFolder, FiFlag } from 'react-icons/fi';

interface StatisticsGridProps {
  statistics?: DashboardStatistics;
  loading?: boolean;
}

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({ statistics, loading }) => {
  const stats = [
    { label: 'Downloaded Papers', value: statistics?.downloadedPapers || 0, icon: FiDownload, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Bookmarked Papers', value: statistics?.bookmarkedPapers || 0, icon: FiBookmark, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Contributed Papers', value: statistics?.uploadedPapers || 0, icon: FiUpload, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Collections', value: statistics?.collections || 0, icon: FiFolder, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Reports Submitted', value: statistics?.reportsSubmitted || 0, icon: FiFlag, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex flex-col justify-between"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
