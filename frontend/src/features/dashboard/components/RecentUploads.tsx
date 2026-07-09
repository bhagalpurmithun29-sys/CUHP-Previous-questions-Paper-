import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadedPaper } from '../types/dashboard.types';
import { FiUpload, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

interface RecentUploadsProps {
  uploads?: UploadedPaper[];
  loading?: boolean;
}

export const RecentUploads: React.FC<RecentUploadsProps> = ({ uploads = [], loading }) => {
  const getStatusIcon = (status: UploadedPaper['status']) => {
    switch (status) {
      case 'APPROVED': return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'PENDING': return <FiClock className="w-4 h-4 text-yellow-500" />;
      case 'REJECTED': return <FiXCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBg = (status: UploadedPaper['status']) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'PENDING': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'REJECTED': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiUpload className="text-primary" />
          Recent Uploads
        </h3>
        <Link to="/upload" className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light">
          Upload New
        </Link>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : uploads.length > 0 ? (
          <ul className="space-y-4">
            {uploads.slice(0, 4).map((paper, idx) => (
              <motion.li 
                key={paper.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${getStatusBg(paper.status)}`}>
                    {getStatusIcon(paper.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                      {paper.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {paper.code} • {paper.year}
                    </p>
                    {paper.status === 'REJECTED' && paper.feedback && (
                      <p className="text-xs text-red-500 mt-1 line-clamp-1">Reason: {paper.feedback}</p>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <FiUpload className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No papers uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
