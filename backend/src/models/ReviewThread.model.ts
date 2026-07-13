import mongoose, { Schema, Document } from 'mongoose';

export enum ThreadStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  REOPENED = 'REOPENED',
  LOCKED = 'LOCKED',
  ARCHIVED = 'ARCHIVED'
}

export enum ThreadTarget {
  QUESTION_PAPER = 'QUESTION_PAPER',
  QUESTION = 'QUESTION',
  OCR_RESULT = 'OCR_RESULT',
  METADATA = 'METADATA',
  AI_ANALYSIS = 'AI_ANALYSIS'
}

export interface IReviewThread extends Document {
  resourceId: mongoose.Types.ObjectId; // E.g., Paper ID or Question ID
  targetType: ThreadTarget;
  title: string;
  status: ThreadStatus;
  creatorId: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId[];
  metadata?: any; // For storing exact PDF coordinates, line numbers, etc.
  createdAt: Date;
  updatedAt: Date;
}

const ReviewThreadSchema = new Schema<IReviewThread>({
  resourceId: { type: Schema.Types.ObjectId, required: true, index: true },
  targetType: { type: String, enum: Object.values(ThreadTarget), required: true },
  title: { type: String, required: true },
  status: { type: String, enum: Object.values(ThreadStatus), default: ThreadStatus.OPEN },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const ReviewThread = mongoose.model<IReviewThread>('ReviewThread', ReviewThreadSchema);
