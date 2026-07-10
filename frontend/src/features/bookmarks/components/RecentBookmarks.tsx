import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { FiClock, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const RecentBookmarks: React.FC = () => {
  const { bookmarks } = useBookmarks();
  
  if (!bookmarks || bookmarks.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center mb-4">
        <FiClock className="mr-2 text-gray-500" /> Recently Bookmarked
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookmarks.slice(0, 4).map((bookmark: any) => (
          <Link 
            key={bookmark._id}
            to={`/viewer/${bookmark.paperId?._id}${bookmark.pageNumber ? `?page=${bookmark.pageNumber}` : ''}`}
            className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`p-2 rounded-lg mr-3 flex-shrink-0 transition-colors ${bookmark.type === 'PAGE' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
              <FiFileText size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {bookmark.paperId?.title || 'Unknown'}
              </p>
              <p className="text-xs font-medium text-gray-500 mt-1">
                {new Date(bookmark.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
