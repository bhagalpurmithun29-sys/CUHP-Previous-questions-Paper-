import mongoose, { Schema, Document } from 'mongoose';

export interface IAIInsight extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  executiveSummary: string;
  facultyInsights: {
      assessmentBalance: string;
      coverageObservations: string;
      difficultyDistribution: string;
  };
  studentInsights: {
      studyPriorities: string;
      topicCoverageSummary: string;
      preparationSummary: string;
  };
  explainability: {
      confidenceScore: number;
      evidenceReferences: string[];
      reasoningSummary: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const InsightSchema = new Schema({
  paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
  status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'QUEUED' },
  executiveSummary: { type: String },
  facultyInsights: {
      assessmentBalance: { type: String },
      coverageObservations: { type: String },
      difficultyDistribution: { type: String }
  },
  studentInsights: {
      studyPriorities: { type: String },
      topicCoverageSummary: { type: String },
      preparationSummary: { type: String }
  },
  explainability: {
      confidenceScore: { type: Number, default: 0 },
      evidenceReferences: [{ type: String }],
      reasoningSummary: { type: String }
  }
}, { timestamps: true });

export const InsightAnalysis = mongoose.model<IAIInsight>('AIInsight', InsightSchema);
