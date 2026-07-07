import mongoose, { Schema } from 'mongoose';
import { IActivityLog } from '../interfaces/models.interface';

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { 
      type: String, 
      enum: ['LOGIN', 'LOGOUT', 'UPLOAD', 'APPROVE', 'REJECT', 'DOWNLOAD', 'BOOKMARK'],
      required: true
    },
    targetId: { type: Schema.Types.ObjectId },
    targetModel: { type: String, enum: ['QuestionPaper', 'User', 'Department'] },
    metadata: { type: Schema.Types.Mixed }, // Flexible JSON for arbitrary audit data
    ipAddress: { type: String },
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// High-performance index for filtering audit logs
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
