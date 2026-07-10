import mongoose, { Document, Schema } from 'mongoose';

export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export interface IBloomClassification extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  classifications: {
    questionId: string;
    bloomLevel: BloomLevel;
    confidenceScore: number;
    reasoningSummary: string;
    reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'EDITED';
    manualOverrideLevel?: BloomLevel;
  }[];
  distribution: {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
  };
  overallConfidence: number;
  errorMessage?: string;
}

const BloomClassificationSchema = new Schema<IBloomClassification>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    classifications: { type: [Schema.Types.Mixed], default: [] },
    distribution: { 
      type: Object, 
      default: { remember: 0, understand: 0, apply: 0, analyze: 0, evaluate: 0, create: 0 }
    },
    overallConfidence: { type: Number, default: 0 },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const BloomClassification = mongoose.model<IBloomClassification>('BloomClassification', BloomClassificationSchema);
