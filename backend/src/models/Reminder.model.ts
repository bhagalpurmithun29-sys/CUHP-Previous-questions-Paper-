import mongoose, { Schema, Document } from 'mongoose';

export enum ReminderStatus {
  SCHEDULED = 'SCHEDULED',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  SNOOZED = 'SNOOZED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ReminderType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
  DEADLINE = 'DEADLINE',
  ESCALATION = 'ESCALATION',
  FOLLOW_UP = 'FOLLOW_UP',
  SMART = 'SMART'
}

export interface IReminder extends Document {
  title: string;
  message: string;
  type: ReminderType;
  status: ReminderStatus;
  
  targetUserId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  
  sourceType: string; // e.g., 'TASK', 'CALENDAR_EVENT', 'ANNOUNCEMENT'
  sourceId: mongoose.Types.ObjectId;
  
  scheduledTime: Date;
  deliveryMethods: ('IN_APP' | 'EMAIL' | 'PUSH' | 'WEBHOOK')[];
  
  isRecurring: boolean;
  cronExpression?: string;
  
  escalationLevel: number;
  maxEscalations: number;
  
  activityHistory: {
    action: string;
    timestamp: Date;
    metadata?: any;
  }[];
  
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: Object.values(ReminderType), required: true },
  status: { type: String, enum: Object.values(ReminderStatus), default: ReminderStatus.SCHEDULED },
  
  targetUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  sourceType: { type: String, required: true },
  sourceId: { type: Schema.Types.ObjectId, required: true, index: true },
  
  scheduledTime: { type: Date, required: true, index: true },
  deliveryMethods: [{ type: String, enum: ['IN_APP', 'EMAIL', 'PUSH', 'WEBHOOK'] }],
  
  isRecurring: { type: Boolean, default: false },
  cronExpression: String,
  
  escalationLevel: { type: Number, default: 0 },
  maxEscalations: { type: Number, default: 3 },
  
  activityHistory: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed
  }]
}, { timestamps: true });

ReminderSchema.index({ status: 1, scheduledTime: 1 }); // Important for Queue Worker

export const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);
