import mongoose, { Document, Schema } from 'mongoose';

export interface ITopicMapping extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  mappings: {
    questionId: string;
    unit: string;
    chapter: string;
    topic: string;
    subtopic: string;
    keywords: string[];
    learningOutcome: string;
    confidenceScore: number;
    reasoningSummary: string;
    reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'EDITED';
    manualOverrides?: {
      unit?: string;
      chapter?: string;
      topic?: string;
      subtopic?: string;
    };
  }[];
  coverage: {
    totalUnits: number;
    totalTopics: number;
    unitDistribution: Record<string, number>;
  };
  overallConfidence: number;
  errorMessage?: string;
}

const TopicMappingSchema = new Schema<ITopicMapping>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    mappings: { type: [Schema.Types.Mixed], default: [] },
    coverage: { 
      type: Object, 
      default: { totalUnits: 0, totalTopics: 0, unitDistribution: {} }
    },
    overallConfidence: { type: Number, default: 0 },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const TopicMapping = mongoose.model<ITopicMapping>('TopicMapping', TopicMappingSchema);
