import React from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { FiBook, FiExternalLink, FiWifiOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const OfflineLibrary: React.FC = () => {
  const { offlineLibrary, isLoadingOffline } = useDownloads();

  if (isLoadingOffline) return <div className="h-40 flex items-center justify-center"><div className="animate-pulse flex space-x-4"><div className="h-10 w-10 bg-gray-200 rounded-full"></div><div className="space-y-3"><div className="h-2 w-20 bg-gray-200 rounded"></div><div className="h-2 w-32 bg-gray-200 rounded"></div></div></div></div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {offlineLibrary?.length > 0 ? offlineLibrary.map((item: any) => (
        <div key={item._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group relative flex flex-col h-full transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <FiBook size={20} />
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
              {(item.paperId?.fileSize / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2" title={item.paperId?.title}>
            {item.paperId?.title || 'Unknown Paper'}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex-1">
            Downloaded on {new Date(item.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <Link to={`/viewer/${item.paperId?._id}`} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center w-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 py-2.5 rounded-lg transition-colors">
              Open in Viewer <FiExternalLink className="ml-2" size={14} />
            </Link>
          </div>
        </div>
      )) : (
        <div className="col-span-full p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-gray-500 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FiWifiOff className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">Your offline library is empty</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Download question papers to access them securely when you're not connected to the internet.</p>
        </div>
      )}
    </div>
  );
};
