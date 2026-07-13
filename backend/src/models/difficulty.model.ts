import mongoose, { Document, Schema } from 'mongoose';

export type DifficultyLevel = 'Very Easy' | 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
export type ComplexityType = 'Single Concept' | 'Multi Concept' | 'Multi Step Reasoning' | 'Analytical Reasoning' | 'Problem Solving' | 'Critical Thinking';

export interface IDifficultyAnalysis extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  analyses: {
    questionId: string;
    difficultyLevel: DifficultyLevel;
    complexityType: ComplexityType;
    expectedSolvingTimeMinutes: number;
    prerequisiteKnowledge: string[];
    confidenceScore: number;
    reasoningSummary: string;
    reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'EDITED';
    manualOverrides?: {
      difficultyLevel?: DifficultyLevel;
      expectedSolvingTimeMinutes?: number;
    };
  }[];
  distribution: {
    difficulty: Record<DifficultyLevel, number>;
    complexity: Record<ComplexityType, number>;
    averageSolvingTimeMinutes: number;
  };
  overallConfidence: number;
  errorMessage?: string;
}

const DifficultyAnalysisSchema = new Schema<IDifficultyAnalysis>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    analyses: { type: [Schema.Types.Mixed] as any, default: [] },
    distribution: { 
      type: Schema.Types.Mixed as any, 
      default: { difficulty: {}, complexity: {}, averageSolvingTimeMinutes: 0 }
    },
    overallConfidence: { type: Number, default: 0 },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const DifficultyAnalysis = mongoose.model<IDifficultyAnalysis>('DifficultyAnalysis', DifficultyAnalysisSchema);
