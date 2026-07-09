import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { ProfileCard } from '../components/ProfileCard';
import { AcademicCard } from '../components/AcademicCard';
import { ProfileCompletion } from '../components/ProfileCompletion';
import { FiEdit3, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { profile, loading } = useProfile();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <div className="flex gap-3">
          <Link
            to="/profile/edit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiEdit3 /> Edit Profile
          </Link>
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white border border-transparent rounded-lg text-sm font-medium shadow-sm hover:bg-primary-dark transition-colors"
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </div>

      <ProfileCard profile={profile} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AcademicCard profile={profile} loading={loading} />
        <ProfileCompletion completion={profile?.completion} loading={loading} />
      </div>

      {!loading && profile && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
          {profile.bio ? (
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{profile.bio}</p>
          ) : (
            <div className="text-center py-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No bio added yet.</p>
              <Link to="/profile/edit" className="text-sm font-medium text-primary hover:underline">
                Add a short bio about yourself
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                  {profile.phoneNumber || <span className="text-gray-400 italic">Not provided</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
