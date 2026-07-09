import mongoose, { Schema, Document } from 'mongoose';
import { IPaperReport } from '../interfaces/paper.interface';

const paperReportSchema = new Schema<IPaperReport>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    details: { type: String },
    status: { 
      type: String, 
      enum: ['OPEN', 'INVESTIGATING', 'RESOLVED', 'DISMISSED'], 
      default: 'OPEN' 
    },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    resolutionNotes: { type: String }
  },
  { 
    timestamps: true 
  }
);

// High-performance index for filtering unresolved reports and querying by paper
paperReportSchema.index({ status: 1, createdAt: -1 });
paperReportSchema.index({ paperId: 1, status: 1 });

export const PaperReport = mongoose.model<IPaperReport & Document>('PaperReport', paperReportSchema);
