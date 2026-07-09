import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/hooks/useAuth';
import { UserProfile } from '../types/dashboard.types';
import { FiUser, FiMail, FiBookOpen, FiAward } from 'react-icons/fi';

interface ProfileCardProps {
  profile?: UserProfile;
  loading?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, loading }) => {
  const { user } = useAuth();

  if (loading || !user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <FiUser className="w-32 h-32 text-primary" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
        <div className="relative h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 shrink-0">
          {profile?.avatarUrl ? (
             <img src={profile.avatarUrl} alt={user.fullName} className="h-full w-full rounded-full object-cover" />
          ) : (
             <span className="text-3xl font-bold">{user.firstName[0]}{user.lastName[0]}</span>
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {user.fullName}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {user.role}
            </span>
          </h2>
          
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              <span className="truncate">{user.email}</span>
            </div>
            {profile && (
              <div className="flex items-center gap-2">
                <FiBookOpen className="w-4 h-4" />
                <span className="truncate">{profile.department}</span>
              </div>
            )}
            {profile && (
              <div className="flex items-center gap-2">
                <FiAward className="w-4 h-4" />
                <span>{profile.course} - Sem {profile.semester}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
