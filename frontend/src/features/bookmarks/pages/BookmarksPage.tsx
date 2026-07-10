import React from 'react';
import { BookmarkList } from '../components/BookmarkList';
import { FavoritesPanel } from '../components/FavoritesPanel';
import { ReadingLists } from '../components/ReadingLists';
import { FiBookmark, FiSearch, FiStar, FiList } from 'react-icons/fi';
import { useBookmarkStore } from '../store/bookmarkStore';

export const BookmarksPage: React.FC = () => {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter } = useBookmarkStore();

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiBookmark className="mr-3 text-blue-600 dark:text-blue-400" />
            My Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Organize your papers, pages, and reading lists for quick access.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookmarks & notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200 shadow-sm transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider">Filters</h3>
            </div>
            <ul className="p-2 space-y-1 text-sm font-medium">
              <li>
                <button onClick={() => setActiveFilter('ALL')} className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center transition-colors ${activeFilter === 'ALL' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <FiBookmark className="mr-3" /> All Bookmarks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveFilter('FAVORITES')} className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center transition-colors ${activeFilter === 'FAVORITES' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <FiStar className="mr-3" /> Favorites
                </button>
              </li>
              <li>
                <button onClick={() => setActiveFilter('LISTS')} className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center transition-colors ${activeFilter === 'LISTS' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <FiList className="mr-3" /> Reading Lists
                </button>
              </li>
            </ul>
          </div>
          
          <ReadingLists />
        </div>
        
        <div className="lg:col-span-3 space-y-8">
          {(activeFilter === 'ALL' || activeFilter === 'FAVORITES') && <FavoritesPanel />}
          <BookmarkList />
        </div>
      </div>
    </div>
  );
};
