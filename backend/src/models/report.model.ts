import mongoose, { Schema } from 'mongoose';
import { IReport, ReportType, ReportStatus, ReportPriority } from '../interfaces/report.interface';

const reportSchema = new Schema<IReport>(
  {
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, index: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    
    type: { type: String, enum: Object.values(ReportType), required: true },
    priority: { type: String, enum: Object.values(ReportPriority), default: ReportPriority.LOW },
    status: { type: String, enum: Object.values(ReportStatus), default: ReportStatus.OPEN, index: true },
    
    description: { type: String, required: true, maxlength: 1000 },
    screenshotUrlPlaceholder: { type: String },
    
    resolvedAt: { type: Date },
    resolvedById: { type: Schema.Types.ObjectId, ref: 'User' },
    resolutionNotes: { type: String, maxlength: 1000 }
  },
  { timestamps: true }
);

// High-performance compound indexes for Moderator Queue filtering
reportSchema.index({ status: 1, priority: -1, createdAt: -1 });
reportSchema.index({ assigneeId: 1, status: 1 });

export const Report = mongoose.model<IReport>('Report', reportSchema);
