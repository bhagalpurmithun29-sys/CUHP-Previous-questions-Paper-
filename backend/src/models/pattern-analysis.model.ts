import mongoose, { Document, Schema } from 'mongoose';

export interface IPatternAnalysis extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  blueprint: {
    sectionCount: number;
    totalQuestionCount: number;
    totalMarks: number;
    sectionStructures: {
      sectionName: string;
      questionCount: number;
      marksPerQuestion: number;
      totalMarks: number;
      choicePattern: string;
      dominantBloom: string;
      dominantTopic: string;
    }[];
  };
  recurringStructures: {
    type: string;
    frequency: number;
    description: string;
  }[];
  patternSummary: string;
  blueprintSimilarityScore: number;
  confidenceScore: number;
  reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  errorMessage?: string;
}

const PatternAnalysisSchema = new Schema<IPatternAnalysis>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    blueprint: { type: Object, default: null },
    recurringStructures: { type: [Schema.Types.Mixed], default: [] },
    patternSummary: { type: String, default: '' },
    blueprintSimilarityScore: { type: Number, default: 0 },
    confidenceScore: { type: Number, default: 0 },
    reviewStatus: { type: String, enum: ['PENDING_REVIEW', 'APPROVED', 'REJECTED'], default: 'PENDING_REVIEW' },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const PatternAnalysis = mongoose.model<IPatternAnalysis>('PatternAnalysis', PatternAnalysisSchema);
