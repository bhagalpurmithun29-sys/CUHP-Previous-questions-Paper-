import { Document, Types, Model } from 'mongoose';
import { IBaseDocument } from './models.interface';

export enum PaperApprovalStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum PaperVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  HIDDEN = 'HIDDEN',
  ARCHIVED = 'ARCHIVED'
}

export enum ExamType {
  MID_SEMESTER = 'MID_SEMESTER',
  END_SEMESTER = 'END_SEMESTER',
  PRACTICAL = 'PRACTICAL',
  LAB = 'LAB',
  SUPPLEMENTARY = 'SUPPLEMENTARY',
  REAPPEAR = 'REAPPEAR',
  ENTRANCE = 'ENTRANCE'
}

export enum ExamSession {
  ODD = 'ODD',
  EVEN = 'EVEN',
  SUMMER = 'SUMMER',
  WINTER = 'WINTER'
}

export enum Language {
  ENGLISH = 'ENGLISH',
  HINDI = 'HINDI',
  BILINGUAL = 'BILINGUAL'
}

export enum StorageProvider {
  LOCAL = 'LOCAL',
  CLOUDINARY = 'CLOUDINARY',
  S3 = 'S3',
  AZURE = 'AZURE',
  GCS = 'GCS'
}

export enum ReportReason {
  WRONG_SUBJECT = 'WRONG_SUBJECT',
  DUPLICATE = 'DUPLICATE',
  CORRUPTED_FILE = 'CORRUPTED_FILE',
  MISSING_PAGES = 'MISSING_PAGES',
  COPYRIGHT_ISSUE = 'COPYRIGHT_ISSUE',
  OTHER = 'OTHER'
}

export interface IQuestionPaper extends Document {
  // Core Fields
  paperId: string;
  title: string;
  description?: string;
  academicYear: string;
  examYear: number;
  examMonth: string;
  examType: ExamType;
  session: ExamSession;
  language: Language;
  maximumMarks: number;
  passingMarks?: number;
  duration?: number;
  
  // Academic Relationships
  subjectId: Types.ObjectId;
  semesterId: Types.ObjectId;
  courseId: Types.ObjectId;
  departmentId: Types.ObjectId;
  schoolId: Types.ObjectId;
  
  // Document Fields
  originalFileName: string;
  storedFileName: string;
  storageProvider: StorageProvider;
  storagePath: string;
  fileUrl: string;
  thumbnailUrl?: string;
  previewImages?: string[];
  fileSize: number;
  fileType: string;
  checksum: string;
  sha256Hash: string;
  pageCount?: number;
  pdfVersion?: string;
  
  // Upload Information
  uploaderId: Types.ObjectId;
  uploadedAt: Date;
  uploadSource: string;
  ipAddress?: string;
  deviceInformation?: string;
  
  // Approval
  approvalStatus: PaperApprovalStatus;
  reviewerId?: Types.ObjectId;
  reviewedAt?: Date;
  approverId?: Types.ObjectId;
  approvedAt?: Date;
  rejectedReason?: string;
  
  // Visibility
  visibility: PaperVisibility;
  
  // Analytics
  downloadCount: number;
  viewCount: number;
  bookmarkCount: number;
  reportCount: number;
  likeCount: number;
  shareCount: number;
  
  // Search
  tags: string[];
  keywords: string[];
  searchTokens: string[];
  ocrTextPlaceholder?: string;
  
  // Versioning
  version: number;
  isCurrentVersion: boolean;
  previousVersionId?: Types.ObjectId;
  parentPaperId?: Types.ObjectId;
  
  // Base Auditing
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Virtuals
  isApproved: boolean;
  fileSizeMb: number;
}

export interface IQuestionPaperModel extends Model<IQuestionPaper> {
  // Statics
  findBySubject(subjectId: string): Promise<IQuestionPaper[]>;
  findTrending(limit?: number): Promise<IQuestionPaper[]>;
}

// Repository Interfaces
export interface IQuestionPaperRepository {
  create(data: Partial<IQuestionPaper>): Promise<IQuestionPaper>;
  findById(id: string): Promise<IQuestionPaper | null>;
  findByPaperId(paperId: string): Promise<IQuestionPaper | null>;
  update(id: string, data: Partial<IQuestionPaper>): Promise<IQuestionPaper | null>;
  delete(id: string): Promise<boolean>;
  
  // Specialized queries
  findBySubjectId(subjectId: string, pagination?: any): Promise<any>;
  findPendingApprovals(pagination?: any): Promise<any>;
  search(query: string, filters: any, pagination?: any): Promise<any>;
  incrementAnalytics(id: string, field: 'downloadCount' | 'viewCount' | 'shareCount' | 'reportCount'): Promise<void>;
  updateApprovalStatus(id: string, status: PaperApprovalStatus, userId: string, reason?: string): Promise<IQuestionPaper | null>;
}

// Paper Report Interface
export interface IPaperReport extends Document {
  paperId: Types.ObjectId;
  reporterId: Types.ObjectId;
  reason: string;
  details?: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  resolvedBy?: Types.ObjectId;
  resolvedAt?: Date;
  resolutionNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Paper Version Interface
export interface IPaperVersion extends Document {
  paperId: Types.ObjectId;
  versionNumber: number;
  storageUrl: string;
  checksum: string;
  uploaderId: Types.ObjectId;
  pdfMetadata: {
    originalName: string;
    sizeBytes: number;
    mimeType: string;
    pageCount?: number;
    pdfVersion?: string;
    isEncrypted?: boolean;
  };
  changeLog?: string;
  createdAt: Date;
}
