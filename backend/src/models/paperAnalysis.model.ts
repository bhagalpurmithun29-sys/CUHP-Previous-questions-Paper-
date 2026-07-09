import mongoose, { Document, Schema } from 'mongoose';

export interface IPaperAnalysis extends Document {
  paperId: mongoose.Types.ObjectId;
  subjectId?: mongoose.Types.ObjectId;
  overallDifficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topicBreakdown: {
    topic: string;
    percentage: number;
    description: string;
  }[];
  keyConcepts: string[];
  examPattern: {
    section: string;
    marks: number;
    questionCount: number;
    type: 'OBJECTIVE' | 'SUBJECTIVE' | 'MIXED';
  }[];
  repeatedTopics: {
    topic: string;
    frequency: number;
  }[];
  importantTopics: string[];
  preparationTips: string[];
  summary: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  error?: string;
  processedAt?: Date;
}

const PaperAnalysisSchema = new Schema<IPaperAnalysis>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, index: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', index: true },
    overallDifficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'MEDIUM' },
    topicBreakdown: [
      {
        topic: String,
        percentage: Number,
        description: String,
      }
    ],
    keyConcepts: [String],
    examPattern: [
      {
        section: String,
        marks: Number,
        questionCount: Number,
        type: { type: String, enum: ['OBJECTIVE', 'SUBJECTIVE', 'MIXED'] },
      }
    ],
    repeatedTopics: [
      {
        topic: String,
        frequency: Number,
      }
    ],
    importantTopics: [String],
    preparationTips: [String],
    summary: { type: String },
    status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'PENDING', index: true },
    error: { type: String },
    processedAt: { type: Date },
  },
  { timestamps: true }
);

export const PaperAnalysis = mongoose.model<IPaperAnalysis>('PaperAnalysis', PaperAnalysisSchema);
