import mongoose, { Schema } from 'mongoose';
import { IReportComment } from '../interfaces/report.interface';

const reportCommentSchema = new Schema<IReportComment>(
  {
    reportId: { type: Schema.Types.ObjectId, ref: 'Report', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 1000 },
    isInternalNote: { type: Boolean, default: false },
    attachmentUrlPlaceholder: { type: String }
  },
  { timestamps: true }
);

export const ReportComment = mongoose.model<IReportComment>('ReportComment', reportCommentSchema);
