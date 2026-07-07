import mongoose, { Schema } from 'mongoose';
import { IReport } from '../interfaces/models.interface';

const reportSchema = new Schema<IReport>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    reason: { 
      type: String, 
      enum: ['WRONG_SUBJECT', 'WRONG_SEMESTER', 'WRONG_YEAR', 'DUPLICATE', 'CORRUPTED_PDF', 'OTHER'],
      required: true
    },
    description: { type: String, maxlength: 500 },
    status: { 
      type: String, 
      enum: ['PENDING', 'RESOLVED', 'DISMISSED'], 
      default: 'PENDING' 
    },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ paperId: 1 });

export const Report = mongoose.model<IReport>('Report', reportSchema);
