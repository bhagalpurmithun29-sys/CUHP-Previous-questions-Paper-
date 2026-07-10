import React from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { ContinueReading } from '../components/ContinueReading';
import { StudyStatistics } from '../components/StudyStatistics';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { FiBook, FiClock, FiDownload, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const MyLibraryPage: React.FC = () => {
  const { overview, isLoading } = useLibrary();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-sm"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <FiBook className="mr-3 text-blue-600 dark:text-blue-400" />
          My Personal Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Your centralized workspace for all study materials and progress.</p>
      </div>

      <StudyStatistics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <ContinueReading />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <FiStar className="mr-2 text-yellow-500" /> Saved Papers
              </h3>
              <Link to="/bookmarks" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-md transition-colors">View All</Link>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {overview?.saved?.slice(0, 5).map((bookmark: any) => (
                <li key={bookmark._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <Link to={`/viewer/${bookmark.paperId?._id}`} className="block">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{bookmark.paperId?.title || 'Unknown'}</h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{new Date(bookmark.createdAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
              {!overview?.saved?.length && (
                <li className="p-10 text-center text-gray-500 text-sm bg-gray-50/50 dark:bg-gray-800/30">No saved papers yet. Explore the repository to add some!</li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <RecommendationPanel />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <FiClock className="mr-2 text-gray-500" /> Recently Viewed
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {overview?.recent?.slice(0, 5).map((item: any) => (
                <li key={item._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <Link to={`/viewer/${item.paperId?._id}`} className="block">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.paperId?.title || 'Unknown'}</h4>
                    <p className="text-xs text-gray-400 mt-1.5">{new Date(item.updatedAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
              {!overview?.recent?.length && (
                <li className="p-8 text-center text-gray-500 text-sm">No recent activity.</li>
              )}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <FiDownload className="mr-2 text-green-500" /> Recent Downloads
              </h3>
              <Link to="/downloads" className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Manage</Link>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {overview?.downloads?.slice(0, 3).map((item: any) => (
                <li key={item._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <Link to={`/viewer/${item.paperId?._id}`} className="block">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.paperId?.title || 'Unknown'}</h4>
                    <p className="text-xs text-gray-500 mt-1.5 font-medium">Downloaded on {new Date(item.completedAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
              {!overview?.downloads?.length && (
                <li className="p-8 text-center text-gray-500 text-sm">No downloads yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
