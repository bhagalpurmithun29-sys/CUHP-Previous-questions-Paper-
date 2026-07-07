import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useSession } from '../../auth/hooks/useSession';

export const ProfileCard: React.FC = () => {
  const { user } = useSession();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
    >
      <div className="relative">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.fullName || 'Profile'}
            className="h-24 w-24 rounded-full object-cover border-4 border-gray-50"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-3xl font-bold text-blue-600 border-4 border-gray-50">
            {user.firstName?.[0] || 'U'}
          </div>
        )}
        <div className="absolute bottom-0 right-0 rounded-full bg-white p-1">
          <span className={`block h-4 w-4 rounded-full ${user.accountStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900">{user.fullName || `${user.firstName} ${user.lastName}`}</h2>
        <div className="mt-1 flex flex-col md:flex-row items-center md:space-x-2 text-sm text-gray-500">
          <span>{user.email}</span>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center space-x-1 mt-1 md:mt-0">
            {user.emailVerified ? (
              <span className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                <FiCheckCircle className="mr-1 h-3 w-3" />
                Verified
              </span>
            ) : (
              <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-medium">
                <FiAlertCircle className="mr-1 h-3 w-3" />
                Unverified
              </span>
            )}
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium capitalize">
              {user.role.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium text-gray-900">{user.department || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Course</p>
            <p className="font-medium text-gray-900">{user.course || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Semester</p>
            <p className="font-medium text-gray-900">{user.semester || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium text-gray-900 capitalize">{user.accountStatus.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="pt-2 md:pt-0">
        <button className="flex items-center justify-center space-x-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <FiEdit2 className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>
    </motion.div>
  );
};
