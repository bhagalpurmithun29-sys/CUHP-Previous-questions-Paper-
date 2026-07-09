import React from 'react';
import { FiCheckCircle, FiClock, FiAlertCircle, FiXCircle, FiUser } from 'react-icons/fi';

export const TicketStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status.toUpperCase()) {
      case 'OPEN': return { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: FiAlertCircle };
      case 'ASSIGNED': return { color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', icon: FiUser };
      case 'IN_PROGRESS':
      case 'IN PROGRESS': return { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: FiClock };
      case 'WAITING_FOR_USER':
      case 'WAITING FOR USER': return { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: FiClock };
      case 'RESOLVED': return { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: FiCheckCircle };
      case 'CLOSED': return { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: FiXCircle };
      case 'REOPENED': return { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: FiAlertCircle };
      default: return { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: FiAlertCircle };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};
