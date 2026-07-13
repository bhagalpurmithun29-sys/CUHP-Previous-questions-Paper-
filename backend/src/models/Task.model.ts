import mongoose, { Schema, Document } from 'mongoose';

export enum TaskType {
  REPOSITORY_REVIEW = 'REPOSITORY_REVIEW',
  OCR_REVIEW = 'OCR_REVIEW',
  AI_VALIDATION = 'AI_VALIDATION',
  METADATA_CORRECTION = 'METADATA_CORRECTION',
  PAPER_APPROVAL = 'PAPER_APPROVAL',
  DUPLICATE_DETECTION = 'DUPLICATE_DETECTION',
  MODERATOR_REVIEW = 'MODERATOR_REVIEW',
  FACULTY_REVIEW = 'FACULTY_REVIEW',
  ANNOUNCEMENT_REVIEW = 'ANNOUNCEMENT_REVIEW',
  GENERAL_ADMIN = 'GENERAL_ADMIN'
}

export enum TaskStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_REVIEW = 'WAITING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ITask extends Document {
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  
  assignedTo?: mongoose.Types.ObjectId;
  assignedRole?: string; // If waiting to be claimed by a role
  creatorId: mongoose.Types.ObjectId;
  
  relatedResourceId?: mongoose.Types.ObjectId; // e.g., Paper ID
  workflowId?: mongoose.Types.ObjectId; // Link to parent workflow
  
  dueDate?: Date;
  estimatedMinutes?: number;
  
  checklist: { title: string; isCompleted: boolean }[];
  labels: string[];
  tags: string[];
  attachments: { url: string; name: string }[];
  
  activityHistory: { action: string; userId: mongoose.Types.ObjectId; timestamp: Date }[];
  
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: Object.values(TaskType), required: true },
  status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
  priority: { type: String, enum: Object.values(TaskPriority), default: TaskPriority.MEDIUM },
  
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  assignedRole: { type: String },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  relatedResourceId: { type: Schema.Types.ObjectId, index: true },
  workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', index: true },
  
  dueDate: { type: Date },
  estimatedMinutes: { type: Number },
  
  checklist: [{ title: String, isCompleted: { type: Boolean, default: false } }],
  labels: [{ type: String }],
  tags: [{ type: String }],
  attachments: [{ url: String, name: String }],
  
  activityHistory: [{
    action: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

TaskSchema.index({ assignedTo: 1, status: 1 });
TaskSchema.index({ type: 1, status: 1 });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
