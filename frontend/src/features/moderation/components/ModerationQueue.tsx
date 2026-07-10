import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface ModerationQueueProps {
  reports: any[];
}

export const ModerationQueue: React.FC<ModerationQueueProps> = ({ reports }) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'OPEN': return <FiAlertCircle className="text-yellow-500" />;
      case 'ASSIGNED': return <FiClock className="text-blue-500" />;
      case 'RESOLVED': return <FiCheckCircle className="text-green-500" />;
      case 'CLOSED': return <FiXCircle className="text-red-500" />;
      default: return <FiAlertCircle className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  if (!reports || reports.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">No reports found in the queue.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Paper</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reporter</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {reports.map((report) => (
            <tr key={report._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(report.status)}
                  <span className="ml-2 text-sm text-gray-900 dark:text-gray-100 font-medium">{report.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                {report.type.replace(/_/g, ' ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                {report.paperId?.title || 'Unknown Paper'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {report.reporterId?.firstName} {report.reporterId?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/moderation/${report._id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md transition-colors">
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
