import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useBookmarkStore } from '../store/bookmarkStore';
import { FiFileText, FiTrash2, FiStar, FiExternalLink, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const BookmarkList: React.FC = () => {
  const { bookmarks, removeBookmark, updateBookmark, isLoading } = useBookmarks();
  const { searchQuery, activeFilter } = useBookmarkStore();

  let filteredBookmarks = bookmarks;
  
  if (activeFilter === 'FAVORITES') {
    filteredBookmarks = filteredBookmarks?.filter((b: any) => b.isFavorite);
  } else if (activeFilter === 'PAPER' || activeFilter === 'PAGE') {
    filteredBookmarks = filteredBookmarks?.filter((b: any) => b.type === activeFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredBookmarks = filteredBookmarks?.filter((b: any) => 
      b.paperId?.title?.toLowerCase().includes(q) || 
      b.note?.toLowerCase().includes(q) ||
      b.tags?.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  if (isLoading) return <div className="text-center p-12"><div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div></div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {activeFilter === 'FAVORITES' ? 'Favorite Bookmarks' : 'All Bookmarks'} ({filteredBookmarks?.length || 0})
        </h3>
      </div>
      
      {filteredBookmarks?.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredBookmarks.map((bookmark: any) => (
            <li key={bookmark._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex flex-col md:flex-row md:items-start justify-between">
              <div className="flex-1 mr-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${bookmark.type === 'PAGE' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                    {bookmark.type} {bookmark.pageNumber ? `(Pg ${bookmark.pageNumber})` : ''}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 line-clamp-2">
                  {bookmark.paperId?.title || 'Unknown Paper'}
                </h4>
                {bookmark.note && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 italic bg-gray-50 dark:bg-gray-700/50 p-2 rounded border border-gray-100 dark:border-gray-600">"{bookmark.note}"</p>
                )}
                {bookmark.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {bookmark.tags.map((tag: string, i: number) => (
                      <span key={i} className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded font-medium">
                        <FiTag className="mr-1.5" size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center mt-4 md:mt-0 space-x-2 md:flex-col md:space-x-0 md:space-y-3">
                <Link to={`/viewer/${bookmark.paperId?._id}${bookmark.pageNumber ? `?page=${bookmark.pageNumber}` : ''}`} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg text-sm font-medium flex items-center w-full justify-center transition-colors">
                  Open <FiExternalLink className="ml-1.5" size={14} />
                </Link>
                <div className="flex space-x-2 w-full justify-center md:justify-end">
                  <button onClick={() => updateBookmark.mutate({ id: bookmark._id, data: { isFavorite: !bookmark.isFavorite } })} className={`p-2 rounded-lg transition-colors ${bookmark.isFavorite ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'}`} title="Toggle Favorite">
                    <FiStar className={bookmark.isFavorite ? 'fill-current' : ''} size={18} />
                  </button>
                  <button onClick={() => removeBookmark.mutate(bookmark._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Bookmark">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-16 text-center text-gray-500 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FiBookmark className="text-gray-400" size={32} />
          </div>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">No bookmarks found</p>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};
