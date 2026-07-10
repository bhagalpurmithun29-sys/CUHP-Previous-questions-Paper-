import mongoose, { Document, Schema } from 'mongoose';

export interface ISuggestionField {
  value: string | number;
  confidence: number;
  isAccepted?: boolean;
}

export interface IAIMetadata extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW';
  suggestions: {
    title?: ISuggestionField;
    subject?: ISuggestionField;
    course?: ISuggestionField;
    semester?: ISuggestionField;
    academicYear?: ISuggestionField;
    examType?: ISuggestionField;
    maximumMarks?: ISuggestionField;
    duration?: ISuggestionField;
  };
  intelligence: {
    keywords: string[];
    topics: string[];
    learningAreas: string[];
    difficultyLevel: string;
  };
  overallConfidence: number;
  processingTimeMs?: number;
  errorMessage?: string;
  moderatorReviewed: boolean;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
}

const SuggestionFieldSchema = new Schema<ISuggestionField>({
  value: { type: Schema.Types.Mixed, required: true },
  confidence: { type: Number, required: true },
  isAccepted: { type: Boolean }
}, { _id: false });

const AIMetadataSchema = new Schema<IAIMetadata>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { 
      type: String, 
      enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'NEEDS_REVIEW'], 
      default: 'PENDING' 
    },
    suggestions: {
      title: SuggestionFieldSchema,
      subject: SuggestionFieldSchema,
      course: SuggestionFieldSchema,
      semester: SuggestionFieldSchema,
      academicYear: SuggestionFieldSchema,
      examType: SuggestionFieldSchema,
      maximumMarks: SuggestionFieldSchema,
      duration: SuggestionFieldSchema
    },
    intelligence: {
      keywords: [String],
      topics: [String],
      learningAreas: [String],
      difficultyLevel: { type: String, default: 'MEDIUM' }
    },
    overallConfidence: { type: Number, default: 0 },
    processingTimeMs: Number,
    errorMessage: String,
    moderatorReviewed: { type: Boolean, default: false },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date
  },
  { timestamps: true }
);

export const AIMetadata = mongoose.model<IAIMetadata>('AIMetadata', AIMetadataSchema);
