import mongoose, { Schema } from 'mongoose';
import { IAuthAuditLog } from '../interfaces/auth.interface';
import { AuthAction } from '../enums/auth.enum';

const authAuditLogSchema = new Schema<IAuthAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Nullable for failed logins where user doesn't exist
    emailAttempted: { type: String },
    action: { 
      type: String, 
      enum: Object.values(AuthAction),
      required: true 
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// High-performance index for security analysis
authAuditLogSchema.index({ userId: 1, createdAt: -1 });
authAuditLogSchema.index({ ipAddress: 1, action: 1 });
authAuditLogSchema.index({ createdAt: -1 });
// TTL Index: Delete logs older than 1 year (365 days)
authAuditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 31536000 });

export const AuthAuditLog = mongoose.model<IAuthAuditLog>('AuthAuditLog', authAuditLogSchema);
