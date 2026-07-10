import React from 'react';
import { FiActivity, FiCheckCircle, FiAlertTriangle, FiFileText } from 'react-icons/fi';

export const RepositoryHealth: React.FC<{ healthData: any }> = ({ healthData }) => {
  if (!healthData) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Health Score</p>
            <h3 className={`text-3xl font-bold mt-2 ${healthData.score >= 90 ? 'text-emerald-600 dark:text-emerald-500' : healthData.score >= 70 ? 'text-amber-500 dark:text-amber-400' : 'text-rose-600 dark:text-rose-500'}`}>
              {healthData.score}%
            </h3>
          </div>
          <div className={`p-3.5 rounded-2xl shadow-inner ${healthData.score >= 90 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30'}`}>
            {healthData.score >= 90 ? <FiCheckCircle size={28} /> : <FiAlertTriangle size={28} />}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Papers</p>
            <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{healthData.metrics.totalPapers}</h3>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 rounded-2xl shadow-inner">
            <FiFileText size={28} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duplicates</p>
            <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{healthData.metrics.unresolvedDuplicates}</h3>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-600 dark:bg-purple-900/30 rounded-2xl shadow-inner">
            <FiAlertTriangle size={28} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Integrity Missing</p>
            <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{healthData.metrics.orphans + healthData.metrics.missingFiles}</h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 dark:bg-amber-900/30 rounded-2xl shadow-inner">
            <FiActivity size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};
