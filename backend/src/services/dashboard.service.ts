import { User } from '../models/user.model';
import { QuestionPaper as Paper } from '../models/paper.model';
import { Bookmark } from '../models/bookmark.model';
import { DownloadHistory } from '../models/downloadHistory.model';
import { ActivityLog } from '../models/activityLog.model';
import { Notification } from '../models/notification.model';
import { Report } from '../models/report.model';
import { Collection } from '../models/collection.model';

export const DashboardService = {
  getStatistics: async (userId: string) => {
    const downloadedPapers = await DownloadHistory.countDocuments({ user: userId });
    const bookmarkedPapers = await Bookmark.countDocuments({ user: userId });
    const uploadedPapers = await Paper.countDocuments({ uploaderId: userId, status: 'APPROVED' });
    const collections = await Collection.countDocuments({ user: userId });
    const reportsSubmitted = await Report.countDocuments({ reportedBy: userId });

    return {
      downloadedPapers,
      bookmarkedPapers,
      uploadedPapers,
      collections,
      reportsSubmitted
    };
  },

  getProfile: async (userId: string) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');

    const completionFields = ['avatarUrl', 'bio', 'phoneNumber', 'department', 'course', 'semester', 'school'];
    let filledFields = 0;
    const missingFields: string[] = [];

    completionFields.forEach(field => {
      // @ts-ignore
      if (user[field]) {
        filledFields++;
      } else {
        missingFields.push(field);
      }
    });

    const percentage = Math.round((filledFields / completionFields.length) * 100);

    return {
      id: user._id,
      avatarUrl: (user as any).avatarUrl,
      bio: (user as any).bio,
      phoneNumber: (user as any).phoneNumber,
      // Using fallback strings if user schema doesn't have these populated yet
      department: (user as any).department?.name || 'Unknown Department',
      course: (user as any).course?.name || 'Unknown Course',
      semester: (user as any).semester?.number || 1,
      school: (user as any).school?.name || 'Unknown School',
      subjects: ['Data Structures', 'Operating Systems', 'Networks'], // Mocked for dashboard if missing
      currentAcademicYear: '2025-2026',
      completion: {
        percentage,
        missingFields
      }
    };
  },

  getActivity: async (userId: string) => {
    const activities = await ActivityLog.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('action entityId createdAt');

    return activities.map(act => ({
      id: act._id,
      action: act.action,
      description: act.action.replace(/_/g, ' ').toLowerCase(),
      date: act.createdAt,
      paperId: act.entityId
    }));
  },

  getDashboardData: async (userId: string) => {
    const statistics = await DashboardService.getStatistics(userId);
    const recentActivity = await DashboardService.getActivity(userId);

    const downloads = await DownloadHistory.find({ user: userId })
      .populate('paper', 'title code year')
      .sort({ downloadedAt: -1 })
      .limit(5);

    const recentDownloads = downloads.map((d: any) => ({
      id: d.paper?._id,
      title: d.paper?.title,
      code: d.paper?.code,
      year: d.paper?.year,
      date: d.downloadedAt
    }));

    const uploads = await Paper.find({ uploaderId: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title code year status moderatorFeedback createdAt');

    const recentUploads = uploads.map((u: any) => ({
      id: u._id,
      title: u.title,
      code: u.code,
      year: u.year,
      date: u.createdAt,
      status: u.status,
      feedback: u.moderatorFeedback
    }));

    const bookmarksData = await Bookmark.find({ user: userId })
      .populate('paper', 'title code year')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBookmarks = bookmarksData.map((b: any) => ({
      id: b.paper?._id,
      title: b.paper?.title,
      code: b.paper?.code,
      year: b.paper?.year,
      date: b.createdAt
    }));

    const notificationsData = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentNotifications = notificationsData.map((n: any) => ({
      id: n._id,
      title: n.title,
      message: n.message,
      read: n.read,
      date: n.createdAt,
      type: n.type || 'INFO'
    }));

    return {
      statistics,
      recentDownloads,
      recentUploads,
      recentBookmarks,
      recentNotifications,
      recentActivity
    };
  }
};
