import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RecentPaper } from '../types/dashboard.types';
import { FiBookmark, FiExternalLink } from 'react-icons/fi';

interface BookmarksWidgetProps {
  bookmarks?: RecentPaper[];
  loading?: boolean;
}

export const BookmarksWidget: React.FC<BookmarksWidgetProps> = ({ bookmarks = [], loading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiBookmark className="text-primary" />
          Bookmarks
        </h3>
        <Link to="/library/bookmarks" className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light">
          View All
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
        ) : bookmarks.length > 0 ? (
          <ul className="space-y-4">
            {bookmarks.slice(0, 4).map((paper, idx) => (
              <motion.li 
                key={paper.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg shrink-0">
                    <FiBookmark className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-primary transition-colors">
                      {paper.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {paper.code} • {paper.year}
                    </p>
                  </div>
                </div>
                <Link 
                  to={`/papers/${paper.id}`}
                  className="p-1.5 text-gray-400 hover:text-primary dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Quick Open"
                >
                  <FiExternalLink className="w-4 h-4" />
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <FiBookmark className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">You haven't bookmarked any papers yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
