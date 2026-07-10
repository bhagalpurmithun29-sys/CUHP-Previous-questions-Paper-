import React, { useState } from 'react';
import { DownloadHistory } from '../components/DownloadHistory';
import { DownloadQueue } from '../components/DownloadQueue';
import { OfflineLibrary } from '../components/OfflineLibrary';
import { StorageUsageCard } from '../components/StorageUsageCard';
import { DownloadManager } from '../components/DownloadManager';
import { FiDownloadCloud, FiClock, FiHardDrive } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const DownloadCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'history' | 'queue'>('library');

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <FiDownloadCloud className="mr-3 text-blue-600" />
          Download Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your offline library, view download history, and monitor active downloads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Read Anywhere, Anytime</h2>
            <p className="text-blue-100 opacity-90 max-w-md">Your offline library automatically syncs across devices when you're online. Downloaded papers remain accessible even without an internet connection.</p>
          </div>
          <div className="hidden sm:block opacity-20">
            <FiDownloadCloud size={100} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <StorageUsageCard />
        </div>
      </div>

      <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === 'library' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('library')}
        >
          <FiHardDrive className="mr-2" /> Offline Library
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === 'history' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('history')}
        >
          <FiClock className="mr-2" /> Download History
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === 'queue' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('queue')}
        >
          <FiDownloadCloud className="mr-2" /> Active Queue
        </button>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="pb-24"
      >
        {activeTab === 'library' && <OfflineLibrary />}
        {activeTab === 'history' && <DownloadHistory />}
        {activeTab === 'queue' && (
          <div className="max-w-3xl">
            <DownloadQueue />
          </div>
        )}
      </motion.div>

      <DownloadManager />
    </div>
  );
};
