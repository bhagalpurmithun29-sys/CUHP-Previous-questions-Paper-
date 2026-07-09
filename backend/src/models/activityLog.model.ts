import mongoose, { Schema, Document } from 'mongoose';

export enum AuditAction {
  // Authentication
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  FAILED_LOGIN = 'FAILED_LOGIN',
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  
  // Academic
  CREATE_SCHOOL = 'CREATE_SCHOOL',
  UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT',
  ARCHIVE_COURSE = 'ARCHIVE_COURSE',
  DELETE_SEMESTER = 'DELETE_SEMESTER',
  RESTORE_SUBJECT = 'RESTORE_SUBJECT',
  
  // Papers
  PAPER_UPLOADED = 'PAPER_UPLOADED',
  PAPER_UPDATED = 'PAPER_UPDATED',
  PAPER_APPROVED = 'PAPER_APPROVED',
  PAPER_REJECTED = 'PAPER_REJECTED',
  PAPER_ARCHIVED = 'PAPER_ARCHIVED',
  PAPER_DOWNLOADED = 'PAPER_DOWNLOADED',
  PAPER_VIEWED = 'PAPER_VIEWED',
  PAPER_BOOKMARKED = 'PAPER_BOOKMARKED',
  
  // Admin & System
  ROLE_CHANGED = 'ROLE_CHANGED',
  PERMISSION_CHANGED = 'PERMISSION_CHANGED',
  SETTINGS_UPDATED = 'SETTINGS_UPDATED',
  BROADCAST_SENT = 'BROADCAST_SENT',
  MODERATOR_ASSIGNED = 'MODERATOR_ASSIGNED',
  
  // QA
  REPORT_SUBMITTED = 'REPORT_SUBMITTED',
  REPORT_ASSIGNED = 'REPORT_ASSIGNED',
  REPORT_RESOLVED = 'REPORT_RESOLVED',
  REPORT_CLOSED = 'REPORT_CLOSED',
}

export interface IActivityLog extends Document {
  userId?: mongoose.Types.ObjectId; // Optional for system events
  userRole?: string;
  
  action: AuditAction;
  
  entityType?: string; // e.g., 'QuestionPaper', 'User', 'Report', 'Setting'
  entityId?: mongoose.Types.ObjectId | string;
  
  oldValue?: any;
  newValue?: any;
  
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  
  requestId?: string;
  correlationId?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userRole: { type: String },
    
    action: { type: String, enum: Object.values(AuditAction), required: true, index: true },
    
    entityType: { type: String, index: true },
    entityId: { type: Schema.Types.Mixed, index: true },
    
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    
    ipAddress: { type: String },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    
    requestId: { type: String, index: true },
    correlationId: { type: String, index: true }
  },
  { timestamps: true }
);

// High-performance compound indexes for Admin Search and Timelines
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
