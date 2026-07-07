import React from 'react';
import { motion } from 'framer-motion';
import type { DashboardStatistics } from '../types/dashboard.types';
import { FiDownload, FiBookmark, FiUpload, FiClock, FiCheck, FiX } from 'react-icons/fi';

interface StatisticsCardsProps {
  stats?: DashboardStatistics;
  isLoading: boolean;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats, isLoading }) => {
  const cards = [
    { title: 'Downloaded', value: stats?.downloadedPapers ?? 0, icon: FiDownload, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Bookmarked', value: stats?.bookmarkedPapers ?? 0, icon: FiBookmark, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { title: 'Uploaded', value: stats?.uploadedPapers ?? 0, icon: FiUpload, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Pending', value: stats?.pendingUploads ?? 0, icon: FiClock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { title: 'Approved', value: stats?.approvedUploads ?? 0, icon: FiCheck, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Rejected', value: stats?.rejectedUploads ?? 0, icon: FiX, color: 'text-red-600', bgColor: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className={`rounded-xl p-2.5 ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            {isLoading ? (
              <div className="h-6 w-8 animate-pulse rounded bg-gray-200" />
            ) : (
              <span className="text-2xl font-bold text-gray-900">{card.value}</span>
            )}
          </div>
          <p className="mt-4 text-sm font-medium text-gray-500">{card.title}</p>
        </motion.div>
      ))}
    </div>
  );
};
