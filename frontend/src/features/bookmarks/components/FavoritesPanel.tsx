import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { FiStar, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const FavoritesPanel: React.FC = () => {
  const { bookmarks } = useBookmarks();
  const favorites = bookmarks?.filter((b: any) => b.isFavorite);

  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-yellow-200/50 dark:border-yellow-800/30 shadow-sm">
      <h3 className="font-semibold text-yellow-800 dark:text-yellow-500 flex items-center mb-5 text-lg">
        <FiStar className="mr-2 fill-current" /> Quick Access Favorites
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {favorites.slice(0, 3).map((bookmark: any) => (
          <Link 
            key={bookmark._id} 
            to={`/viewer/${bookmark.paperId?._id}${bookmark.pageNumber ? `?page=${bookmark.pageNumber}` : ''}`}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1"
          >
            <div className="flex items-start mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3 flex-shrink-0">
                <FiFileText className="text-yellow-600 dark:text-yellow-500" />
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                {bookmark.paperId?.title || 'Unknown Paper'}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50">
              {bookmark.type} {bookmark.pageNumber ? `(Pg ${bookmark.pageNumber})` : ''}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
