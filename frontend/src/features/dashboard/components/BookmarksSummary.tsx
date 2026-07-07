import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark, FiArrowRight } from 'react-icons/fi';
import type { DashboardBookmark } from '../types/dashboard.types';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

interface BookmarksSummaryProps {
  bookmarks: DashboardBookmark[];
  isLoading: boolean;
}

export const BookmarksSummary: React.FC<BookmarksSummaryProps> = ({ bookmarks, isLoading }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{DASHBOARD_CONSTANTS.TITLES.BOOKMARKS}</h3>
        <Link to="/dashboard/bookmarks" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
          View All <FiArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex h-16 w-full animate-pulse rounded-lg bg-gray-50" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <p className="text-sm text-gray-500">{DASHBOARD_CONSTANTS.MESSAGES.NO_BOOKMARKS}</p>
      ) : (
        <div className="space-y-3">
          {bookmarks.slice(0, 3).map((bookmark) => (
            <div key={bookmark.id} className="group relative rounded-xl border border-gray-100 bg-white p-3 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 line-clamp-1">{bookmark.title}</h4>
                  <p className="mt-1 text-xs text-gray-500">
                    {bookmark.course} • Sem {bookmark.semester} • {bookmark.year}
                  </p>
                </div>
                <button className="text-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1 transition-colors">
                  <FiBookmark className="h-5 w-5 fill-current" />
                  <span className="sr-only">Remove bookmark</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
