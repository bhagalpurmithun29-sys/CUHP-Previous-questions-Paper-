import mongoose, { Schema, Document } from 'mongoose';

export interface IAIReview extends Document {
  paperId: mongoose.Types.ObjectId;
  analysisType: 'EXTRACTION' | 'BLOOM' | 'TOPIC' | 'DIFFICULTY' | 'PATTERN' | 'INSIGHT';
  confidenceScore: number;
  status: 'PENDING_REVIEW' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'MANUALLY_CORRECTED';
  assignedTo?: mongoose.Types.ObjectId;
  errorCategory?: string;
  reviewerNotes?: string;
  originalOutput: any;
  correctedOutput?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema({
  paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
  analysisType: { type: String, enum: ['EXTRACTION', 'BLOOM', 'TOPIC', 'DIFFICULTY', 'PATTERN', 'INSIGHT'], required: true },
  confidenceScore: { type: Number, required: true },
  status: { type: String, enum: ['PENDING_REVIEW', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'MANUALLY_CORRECTED'], default: 'PENDING_REVIEW' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  errorCategory: { type: String },
  reviewerNotes: { type: String },
  originalOutput: { type: Schema.Types.Mixed },
  correctedOutput: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const QualityReview = mongoose.model<IAIReview>('QualityReview', ReviewSchema);
