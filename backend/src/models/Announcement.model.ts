import mongoose, { Schema, Document } from 'mongoose';

export enum AnnouncementType {
  UNIVERSITY_NOTICE = 'UNIVERSITY_NOTICE',
  DEPARTMENT_NOTICE = 'DEPARTMENT_NOTICE',
  SCHOOL_NOTICE = 'SCHOOL_NOTICE',
  COURSE_CIRCULAR = 'COURSE_CIRCULAR',
  FACULTY_ANNOUNCEMENT = 'FACULTY_ANNOUNCEMENT',
  STUDENT_NOTICE = 'STUDENT_NOTICE',
  EMERGENCY_ALERT = 'EMERGENCY_ALERT',
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE'
}

export enum AnnouncementStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  EXPIRED = 'EXPIRED'
}

export interface IAnnouncement extends Document {
  title: string;
  content: string; // HTML rich text
  type: AnnouncementType;
  status: AnnouncementStatus;
  
  authorId: mongoose.Types.ObjectId;
  
  // Targeting
  targetRoles: string[]; // e.g., 'STUDENT', 'FACULTY', 'ADMIN'
  targetDepartments: mongoose.Types.ObjectId[];
  targetSchools: mongoose.Types.ObjectId[];
  targetCourses: mongoose.Types.ObjectId[];
  
  // Attachments
  attachments: { name: string; url: string; size: number }[];
  
  isPinned: boolean;
  
  // Scheduling
  publishAt: Date;
  expireAt?: Date;
  
  // Tracking
  readCount: number;
  acknowledgedBy: mongoose.Types.ObjectId[];
  
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: Object.values(AnnouncementType), required: true },
  status: { type: String, enum: Object.values(AnnouncementStatus), default: AnnouncementStatus.DRAFT },
  
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  targetRoles: [{ type: String }],
  targetDepartments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  targetSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
  targetCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  
  attachments: [{
    name: { type: String },
    url: { type: String },
    size: { type: Number }
  }],
  
  isPinned: { type: Boolean, default: false },
  
  publishAt: { type: Date, default: Date.now },
  expireAt: { type: Date },
  
  readCount: { type: Number, default: 0 },
  acknowledgedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

AnnouncementSchema.index({ status: 1, publishAt: -1 });
AnnouncementSchema.index({ targetRoles: 1 });
AnnouncementSchema.index({ targetDepartments: 1 });

export const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
