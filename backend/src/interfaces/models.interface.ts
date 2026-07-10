import { Document, Types } from 'mongoose';

export interface IBaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}

export interface IUser extends IBaseDocument {
  fullName: string;
  email: string;
  password?: string; // Optional if OAuth
  profileImage?: string;
  role: UserRole;
  departmentId?: Types.ObjectId;
  courseId?: Types.ObjectId;
  semester?: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  emailVerified: boolean;
  lastLogin?: Date;
  refreshToken?: string;
}

export enum PaperStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  NEEDS_CHANGES = 'NEEDS_CHANGES',
  PUBLISHED = 'PUBLISHED'
}

export interface IQuestionPaper extends IBaseDocument {
  title: string;
  schoolId: Types.ObjectId;
  departmentId: Types.ObjectId;
  courseId: Types.ObjectId;
  subjectId: Types.ObjectId;
  semester: number;
  academicYear: string; // e.g., '2023-2024'
  examType: 'MID_TERM' | 'END_TERM' | 'SUPPLEMENTARY';
  session: 'WINTER' | 'SUMMER';
  pdfUrl: string;
  cloudinaryPublicId: string;
  uploadedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  approvalDate?: Date;
  status: PaperStatus;
  downloads: number;
  views: number;
  bookmarkCount: number;
  reportCount: number;
  tags: string[];
}

export interface IDownload extends IBaseDocument {
  userId?: Types.ObjectId; // Nullable for anonymous downloads if allowed
  paperId: Types.ObjectId;
  downloadDate: Date;
  ipAddress?: string;
  device?: string;
}

export interface IBookmark extends IBaseDocument {
  userId: Types.ObjectId;
  paperId: Types.ObjectId;
  type: 'PAPER' | 'PAGE' | 'SECTION' | 'SEARCH_RESULT';
  pageNumber?: number;
  sectionId?: string;
  note?: string;
  tags?: string[];
  isFavorite?: boolean;
  colorLabel?: string;
}

export interface IReadingList extends IBaseDocument {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  isFavorite?: boolean;
  bookmarks?: Types.ObjectId[];
}

export interface IReport extends IBaseDocument {
  userId: Types.ObjectId;
  paperId: Types.ObjectId;
  reason: 'WRONG_SUBJECT' | 'WRONG_SEMESTER' | 'WRONG_YEAR' | 'DUPLICATE' | 'CORRUPTED_PDF' | 'OTHER';
  description?: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  resolvedBy?: Types.ObjectId;
}

export interface INotification extends IBaseDocument {
  recipientId: Types.ObjectId;
  senderId?: Types.ObjectId;
  type: 'USER' | 'ADMIN' | 'SYSTEM';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
}

export interface IActivityLog extends IBaseDocument {
  userId: Types.ObjectId;
  action: 'LOGIN' | 'LOGOUT' | 'UPLOAD' | 'APPROVE' | 'REJECT' | 'DOWNLOAD' | 'BOOKMARK';
  targetId?: Types.ObjectId; // E.g., Paper ID
  targetModel?: 'QuestionPaper' | 'User';
  metadata?: any;
  ipAddress?: string;
}
