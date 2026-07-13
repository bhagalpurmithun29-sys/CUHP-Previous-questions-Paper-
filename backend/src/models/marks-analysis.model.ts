import mongoose, { Document, Schema } from 'mongoose';

export interface IMarksAnalysis extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  totalMarks: number;
  sectionBreakdown: {
    sectionName: string;
    totalMarks: number;
    questionCount: number;
    mandatoryMarks: number;
    optionalMarks: number;
  }[];
  weightage: {
    bloom: Record<string, number>;
    difficulty: Record<string, number>;
    unit: Record<string, number>;
    topic: Record<string, number>;
  };
  assessmentQualityScore: number;
  balanceIndicators: {
    marksBalance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    sectionBalance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    topicCoverage: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    difficultyDistribution: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    bloomDistribution: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  };
  internalChoiceAnalysis: {
    totalChoiceQuestions: number;
    totalChoiceMarks: number;
    choiceBalance: string;
  };
  reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  confidenceScore: number;
  errorMessage?: string;
}

const MarksAnalysisSchema = new Schema<IMarksAnalysis>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    totalMarks: { type: Number, default: 0 },
    sectionBreakdown: { type: [Schema.Types.Mixed] as any, default: [] },
    weightage: { type: Object, default: { bloom: {}, difficulty: {}, unit: {}, topic: {} } },
    assessmentQualityScore: { type: Number, default: 0 },
    balanceIndicators: { type: Object, default: {} },
    internalChoiceAnalysis: { type: Object, default: {} },
    reviewStatus: { type: String, enum: ['PENDING_REVIEW', 'APPROVED', 'REJECTED'], default: 'PENDING_REVIEW' },
    confidenceScore: { type: Number, default: 0 },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const MarksAnalysis = mongoose.model<IMarksAnalysis>('MarksAnalysis', MarksAnalysisSchema);
