import React from 'react';
import { useRepositoryAnalytics } from '../hooks/useRepositoryAnalytics';
import { OverviewCards } from '../components/OverviewCards';
import { UploadAnalytics } from '../components/UploadAnalytics';
import { FiPieChart } from 'react-icons/fi';

export const RepositoryAnalyticsPage: React.FC = () => {
  const { getOverview, getUploads } = useRepositoryAnalytics();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <span className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mr-3.5 border border-indigo-100 dark:border-indigo-800">
            <FiPieChart className="text-indigo-600 dark:text-indigo-400" size={26} />
          </span>
          Repository Analytics & Operations
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
          Comprehensive operational dashboard tracking storage, uploads, and automated data processing pipelines.
        </p>
      </div>

      {getOverview.isLoading ? (
        <div className="animate-pulse h-36 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-10"></div>
      ) : (
        <OverviewCards data={getOverview.data} />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {getUploads.isLoading ? (
             <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
          ) : (
             <UploadAnalytics data={getUploads.data} />
          )}
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-50/50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-200 dark:border-blue-800">
                 <FiPieChart className="text-5xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Storage Analytics</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">Detailed storage utilization, department quotas, and duplicate space consumption charts will mount here.</p>
          </div>
      </div>
    </div>
  );
};
