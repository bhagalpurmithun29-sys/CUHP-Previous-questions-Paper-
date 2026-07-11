import React from 'react';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ContinueReading: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4 text-primary">
          <FiBookOpen className="w-5 h-5" />
          <h2 className="font-bold text-gray-900 dark:text-white">Continue Reading</h2>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          Machine Learning End Term Paper 2023
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          You left off at page 4 of 12. Topic: Support Vector Machines.
        </p>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: '33%' }}></div>
        </div>
        
        <Link 
          to="/viewer/123" 
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
        >
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-primary">Resume Reading</span>
          <FiArrowRight className="text-gray-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
