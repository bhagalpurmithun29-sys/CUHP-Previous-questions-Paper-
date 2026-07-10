import React from 'react';
import { FiDatabase, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

export const OverviewCards: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Storage</p>
            <h3 className="text-3xl font-black mt-2 text-indigo-600 dark:text-indigo-500 drop-shadow-sm">{data.totalStorageMB} MB</h3>
          </div>
          <div className="p-3.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 rounded-2xl shadow-inner border border-indigo-100 dark:border-indigo-800">
            <FiDatabase size={28} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved</p>
            <h3 className="text-3xl font-black mt-2 text-emerald-600 dark:text-emerald-500 drop-shadow-sm">{data.approvedPapers}</h3>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 rounded-2xl shadow-inner border border-emerald-100 dark:border-emerald-800">
            <FiCheckCircle size={28} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending</p>
            <h3 className="text-3xl font-black mt-2 text-amber-500 dark:text-amber-400 drop-shadow-sm">{data.pendingPapers}</h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 dark:bg-amber-900/30 rounded-2xl shadow-inner border border-amber-100 dark:border-amber-800">
            <FiClock size={28} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rejected</p>
            <h3 className="text-3xl font-black mt-2 text-rose-600 dark:text-rose-500 drop-shadow-sm">{data.rejectedPapers}</h3>
          </div>
          <div className="p-3.5 bg-rose-50 text-rose-600 dark:bg-rose-900/30 rounded-2xl shadow-inner border border-rose-100 dark:border-rose-800">
            <FiXCircle size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};
