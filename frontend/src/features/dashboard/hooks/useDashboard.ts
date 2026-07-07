import { useQuery } from '@tanstack/react-query';
import type { DashboardStatistics, DashboardActivity, DashboardNotification, DashboardBookmark } from '../types/dashboard.types';

// Using mock fetch functions as the actual API layer for the dashboard is not yet specified.
export const useDashboard = () => {
  const { data: stats, isLoading: isStatsLoading } = useQuery<DashboardStatistics>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      // Mock data
      return {
        downloadedPapers: 45,
        bookmarkedPapers: 12,
        uploadedPapers: 5,
        pendingUploads: 2,
        approvedUploads: 3,
        rejectedUploads: 0,
      };
    },
  });

  const { data: activities = [], isLoading: isActivitiesLoading } = useQuery<DashboardActivity[]>({
    queryKey: ['dashboard', 'activities'],
    queryFn: async () => {
      return [
        { id: '1', type: 'DOWNLOAD', title: 'Data Structures 2023 Paper', timestamp: new Date().toISOString(), status: 'SUCCESS' },
        { id: '2', type: 'LOGIN', title: 'New login from Mac OS', timestamp: new Date().toISOString(), status: 'SUCCESS' },
      ];
    },
  });

  const { data: notifications = [], isLoading: isNotificationsLoading } = useQuery<DashboardNotification[]>({
    queryKey: ['dashboard', 'notifications'],
    queryFn: async () => {
      return [
        { id: '1', title: 'Upload Approved', message: 'Your paper upload was approved.', isRead: false, createdAt: new Date().toISOString(), type: 'SUCCESS' },
      ];
    },
  });

  const { data: bookmarks = [], isLoading: isBookmarksLoading } = useQuery<DashboardBookmark[]>({
    queryKey: ['dashboard', 'bookmarks'],
    queryFn: async () => {
      return [
        { id: '1', paperId: 'p1', title: 'Operating Systems Midterm 2022', course: 'Computer Science', semester: 4, year: 2022 },
      ];
    },
  });

  return {
    stats,
    activities,
    notifications,
    bookmarks,
    isLoading: isStatsLoading || isActivitiesLoading || isNotificationsLoading || isBookmarksLoading,
  };
};
