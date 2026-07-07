import React from 'react';
import { motion } from 'framer-motion';
import { ProfileCard } from '../components/ProfileCard';
import { StatisticsCards } from '../components/StatisticsCards';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';
import { BookmarksSummary } from '../components/BookmarksSummary';
import { NotificationPreview } from '../components/NotificationPreview';
import { ProfileCompletion } from '../components/ProfileCompletion';
import { useDashboard } from '../hooks/useDashboard';

export const StudentDashboardPage: React.FC = () => {
  const { stats, activities, notifications, bookmarks, isLoading } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header / Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your academic activities.</p>
        </motion.div>

        <ProfileCard />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProfileCompletion />
            
            <section aria-labelledby="statistics-heading">
              <h2 id="statistics-heading" className="sr-only">Statistics</h2>
              <StatisticsCards stats={stats} isLoading={isLoading} />
            </section>

            <section aria-labelledby="quick-actions-heading">
              <h2 id="quick-actions-heading" className="sr-only">Quick Actions</h2>
              <QuickActions />
            </section>

            <section aria-labelledby="recent-activity-heading">
              <h2 id="recent-activity-heading" className="sr-only">Recent Activity</h2>
              <RecentActivity activities={activities} isLoading={isLoading} />
            </section>
          </div>

          <div className="space-y-6">
            <section aria-labelledby="bookmarks-heading">
              <h2 id="bookmarks-heading" className="sr-only">Bookmarks Summary</h2>
              <BookmarksSummary bookmarks={bookmarks} isLoading={isLoading} />
            </section>

            <section aria-labelledby="notifications-heading">
              <h2 id="notifications-heading" className="sr-only">Recent Notifications</h2>
              <NotificationPreview notifications={notifications} isLoading={isLoading} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
