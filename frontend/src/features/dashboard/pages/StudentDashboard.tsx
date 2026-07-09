import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../hooks/useDashboard';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';

import { ProfileCard } from '../components/ProfileCard';
import { AcademicCard } from '../components/AcademicCard';
import { QuickActions } from '../components/QuickActions';
import { StatisticsGrid } from '../components/StatisticsGrid';
import { RecentDownloads } from '../components/RecentDownloads';
import { RecentUploads } from '../components/RecentUploads';
import { BookmarksWidget } from '../components/BookmarksWidget';
import { NotificationsWidget } from '../components/NotificationsWidget';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { ProfileCompletion } from '../components/ProfileCompletion';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: dashboardData, loading: dashboardLoading } = useDashboard();
  const { profile, loading: profileLoading } = useProfile();

  const isModerator = user?.role === 'MODERATOR' || user?.role === 'ADMIN';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <ProfileCard profile={profile} loading={profileLoading} />
        </div>
        <div className="w-full md:w-80 shrink-0">
          <ProfileCompletion completion={profile?.completion} loading={profileLoading} />
        </div>
      </div>

      <StatisticsGrid statistics={dashboardData?.statistics} loading={dashboardLoading} />

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityTimeline activities={dashboardData?.recentActivity} loading={dashboardLoading} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentDownloads downloads={dashboardData?.recentDownloads} loading={dashboardLoading} />
            {isModerator ? (
              <RecentUploads uploads={dashboardData?.recentUploads} loading={dashboardLoading} />
            ) : (
              <BookmarksWidget bookmarks={dashboardData?.recentBookmarks} loading={dashboardLoading} />
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <AcademicCard profile={profile} loading={profileLoading} />
          <NotificationsWidget notifications={dashboardData?.recentNotifications} loading={dashboardLoading} />
          {!isModerator && (
            <RecentUploads uploads={dashboardData?.recentUploads} loading={dashboardLoading} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
