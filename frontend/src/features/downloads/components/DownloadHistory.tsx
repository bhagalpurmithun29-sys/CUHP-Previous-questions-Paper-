import React from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { FiTrash2, FiFileText, FiDownload } from 'react-icons/fi';
import { useDownloadStore } from '../store/downloadStore';

export const DownloadHistory: React.FC = () => {
  const { history, isLoadingHistory, removeHistory } = useDownloads();
  const { addToQueue } = useDownloadStore();

  if (isLoadingHistory) return <div className="p-8 text-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div></div>;

  const handleRedownload = (item: any) => {
      addToQueue({
          id: item.paperId?._id,
          title: item.paperId?.title || 'Unknown',
          size: item.paperId?.fileSize || 0,
          status: 'PENDING',
          progress: 0,
          url: item.downloadUrl
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">History Logs</h3>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Paper</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history?.length > 0 ? history.map((item: any) => (
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded mr-3">
                    <FiFileText className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <span className="truncate max-w-[200px] md:max-w-xs" title={item.paperId?.title || 'Unknown Paper'}>
                    {item.paperId?.title || 'Unknown Paper'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : item.status === 'FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end space-x-3">
                  <button onClick={() => handleRedownload(item)} className="text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors" title="Redownload"><FiDownload size={18} /></button>
                  <button onClick={() => removeHistory(item._id)} className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 transition-colors" title="Delete Log"><FiTrash2 size={18} /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <FiFileText className="mx-auto mb-2 opacity-50" size={24} />
                  No download history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
