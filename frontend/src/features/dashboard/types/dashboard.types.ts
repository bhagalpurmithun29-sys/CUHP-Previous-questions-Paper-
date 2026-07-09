export interface DashboardStatistics {
  downloadedPapers: number;
  bookmarkedPapers: number;
  uploadedPapers: number;
  collections: number;
  reportsSubmitted: number;
}

export interface RecentPaper {
  id: string;
  title: string;
  code: string;
  year: number;
  date: string;
}

export interface UploadedPaper extends RecentPaper {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  feedback?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
}

export interface Activity {
  id: string;
  action: 'DOWNLOAD' | 'UPLOAD' | 'BOOKMARK' | 'REPORT';
  description: string;
  date: string;
  paperId?: string;
}

export interface DashboardData {
  statistics: DashboardStatistics;
  recentDownloads: RecentPaper[];
  recentUploads: UploadedPaper[];
  recentBookmarks: RecentPaper[];
  recentNotifications: Notification[];
  recentActivity: Activity[];
}

export interface ProfileCompletionStatus {
  percentage: number;
  missingFields: string[];
}

export interface UserProfile {
  id: string;
  avatarUrl?: string;
  bio?: string;
  phoneNumber?: string;
  department: string;
  course: string;
  semester: number;
  school: string;
  subjects: string[];
  currentAcademicYear: string;
  completion: ProfileCompletionStatus;
}
