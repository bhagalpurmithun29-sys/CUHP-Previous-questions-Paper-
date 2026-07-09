import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types/dashboard.types';
import { FiBook, FiAward, FiClock } from 'react-icons/fi';

interface AcademicCardProps {
  profile?: UserProfile;
  loading?: boolean;
}

export const AcademicCard: React.FC<AcademicCardProps> = ({ profile, loading }) => {
  if (loading || !profile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse h-full">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiBook className="text-primary" />
        Academic Summary
      </h3>
      
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">School</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{profile.school}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium flex items-center gap-1">
              <FiAward className="w-3 h-3 text-gray-400" />
              {profile.course}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Semester</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{profile.semester}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Subjects</p>
          <div className="flex flex-wrap gap-2">
            {profile.subjects.map((sub, idx) => (
              <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <FiClock className="w-3 h-3" />
          Academic Year
        </p>
        <span className="text-sm font-semibold text-primary dark:text-primary-light">{profile.currentAcademicYear}</span>
      </div>
    </motion.div>
  );
};
