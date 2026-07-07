export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'MODERATOR' | 'ADMIN';
  departmentId?: string;
  avatar?: string;
  createdAt: string;
}

export interface QuestionPaper {
  id: string;
  title: string;
  courseCode: string;
  departmentId: string;
  semester: number;
  year: number;
  fileUrl: string;
  uploadedBy: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  downloads: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  limit: number;
  total: number;
}
