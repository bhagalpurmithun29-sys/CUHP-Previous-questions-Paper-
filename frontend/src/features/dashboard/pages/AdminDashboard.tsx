import React from 'react';
import { StatCards } from '../components/StatCards';
import { AcademicTreeViewer } from '../components/AcademicTreeViewer';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { FiAlertCircle, FiSettings, FiDownload } from 'react-icons/fi';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Administration</h1>
          <p className="text-gray-500 text-sm mt-1">Manage schools, departments, courses, and system settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <FiDownload /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <FiSettings /> Settings
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <StatCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          <AcademicTreeViewer />
          
          {/* Quick Actions / Validation alerts could go here */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-800/50 rounded-xl text-orange-600 dark:text-orange-400">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-300">Data Validation Warnings</h3>
                <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                  We detected 2 courses without active departments. Please review the validation report to ensure data integrity.
                </p>
                <button className="mt-3 text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline">
                  View Validation Report &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          <ActivityTimeline />
        </div>

      </div>
    </div>
  );
};
