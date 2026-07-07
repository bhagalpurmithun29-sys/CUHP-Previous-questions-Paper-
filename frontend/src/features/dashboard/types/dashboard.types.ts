export interface DashboardStatistics {
  downloadedPapers: number;
  bookmarkedPapers: number;
  uploadedPapers: number;
  pendingUploads: number;
  approvedUploads: number;
  rejectedUploads: number;
}

export interface DashboardActivity {
  id: string;
  type: 'DOWNLOAD' | 'BOOKMARK' | 'UPLOAD' | 'LOGIN';
  title: string;
  timestamp: string;
  status?: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
}

export interface DashboardBookmark {
  id: string;
  paperId: string;
  title: string;
  course: string;
  semester: number;
  year: number;
}
