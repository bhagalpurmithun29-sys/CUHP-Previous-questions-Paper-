import { Document, Types } from 'mongoose';

export enum ReportType {
  WRONG_SUBJECT = 'WRONG_SUBJECT',
  WRONG_SEMESTER = 'WRONG_SEMESTER',
  WRONG_COURSE = 'WRONG_COURSE',
  WRONG_ACADEMIC_YEAR = 'WRONG_ACADEMIC_YEAR',
  DUPLICATE_PAPER = 'DUPLICATE_PAPER',
  CORRUPTED_PDF = 'CORRUPTED_PDF',
  MISSING_PAGES = 'MISSING_PAGES',
  LOW_QUALITY_SCAN = 'LOW_QUALITY_SCAN',
  UNREADABLE_PDF = 'UNREADABLE_PDF',
  INCORRECT_METADATA = 'INCORRECT_METADATA',
  BROKEN_DOWNLOAD = 'BROKEN_DOWNLOAD',
  COPYRIGHT_CONCERN = 'COPYRIGHT_CONCERN',
  OTHER = 'OTHER'
}

export enum ReportStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REOPENED = 'REOPENED'
}

export enum ReportPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface IReport extends Document {
  reporterId: Types.ObjectId;
  paperId: Types.ObjectId;
  assigneeId?: Types.ObjectId;
  
  type: ReportType;
  priority: ReportPriority;
  status: ReportStatus;
  
  description: string;
  screenshotUrlPlaceholder?: string;
  
  resolvedAt?: Date;
  resolvedById?: Types.ObjectId;
  resolutionNotes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface IReportComment extends Document {
  reportId: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  isInternalNote: boolean;
  attachmentUrlPlaceholder?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
