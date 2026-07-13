import mongoose, { Schema, Document } from 'mongoose';

export enum WorkspaceType {
  UNIVERSITY = 'UNIVERSITY',
  SCHOOL = 'SCHOOL',
  DEPARTMENT = 'DEPARTMENT',
  COURSE = 'COURSE',
  RESEARCH_GROUP = 'RESEARCH_GROUP',
  COMMITTEE = 'COMMITTEE',
  PROJECT = 'PROJECT'
}

export enum WorkspaceRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

export interface IWorkspace extends Document {
  name: string;
  description: string;
  type: WorkspaceType;
  
  parentWorkspaceId?: mongoose.Types.ObjectId;
  departmentId?: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  
  members: {
    userId: mongoose.Types.ObjectId;
    role: WorkspaceRole;
    joinedAt: Date;
  }[];
  
  knowledgeBoards: {
    title: string;
    content: string; // Markdown
    lastEditedBy: mongoose.Types.ObjectId;
    lastEditedAt: Date;
  }[];
  
  sharedResources: {
    title: string;
    url: string;
    resourceType: string;
    addedBy: mongoose.Types.ObjectId;
  }[];
  
  activityFeed: {
    action: string;
    userId: mongoose.Types.ObjectId;
    timestamp: Date;
    metadata?: any;
  }[];
  
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: Object.values(WorkspaceType), required: true },
  
  parentWorkspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace' },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  
  members: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: Object.values(WorkspaceRole), default: WorkspaceRole.MEMBER },
    joinedAt: { type: Date, default: Date.now }
  }],
  
  knowledgeBoards: [{
    title: String,
    content: String,
    lastEditedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastEditedAt: { type: Date, default: Date.now }
  }],
  
  sharedResources: [{
    title: String,
    url: String,
    resourceType: String,
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  
  activityFeed: [{
    action: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed
  }],
  
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

WorkspaceSchema.index({ 'members.userId': 1 });

export const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
