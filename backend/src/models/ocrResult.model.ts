import mongoose, { Document, Schema } from 'mongoose';

export interface IOcrExtractedQuestion {
  questionNumber: string;
  text: string;
  marks?: number;
  subQuestions?: IOcrExtractedQuestion[];
}

export interface IOcrExtractedSection {
  sectionName: string; // e.g., "Section A"
  instructions?: string;
  questions: IOcrExtractedQuestion[];
}

export interface IOcrMetadata {
  subject?: string;
  course?: string;
  semester?: string;
  academicYear?: string;
  examType?: string;
  duration?: string;
  maximumMarks?: number;
}

export interface IOcrResult extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW';
  rawText: string;
  cleanedText: string;
  metadata: IOcrMetadata;
  sections: IOcrExtractedSection[];
  qualityScore: {
    ocrConfidence: number; // 0-100
    metadataConfidence: number;
    extractionCompleteness: number;
    overallQuality: number;
  };
  processingTimeMs?: number;
  errorMessage?: string;
  moderatorReviewed: boolean;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  jobId?: string; // For background worker tracking
}

const ExtractedQuestionSchema = new Schema<IOcrExtractedQuestion>({
  questionNumber: { type: String, required: true },
  text: { type: String, required: true },
  marks: { type: Number }
});
ExtractedQuestionSchema.add({ subQuestions: [ExtractedQuestionSchema] });

const ExtractedSectionSchema = new Schema<IOcrExtractedSection>({
  sectionName: { type: String, required: true },
  instructions: { type: String },
  questions: [ExtractedQuestionSchema]
});

const OcrResultSchema = new Schema<IOcrResult>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { 
      type: String, 
      enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'NEEDS_REVIEW'], 
      default: 'PENDING' 
    },
    rawText: { type: String, default: '' },
    cleanedText: { type: String, default: '' },
    metadata: {
      subject: String,
      course: String,
      semester: String,
      academicYear: String,
      examType: String,
      duration: String,
      maximumMarks: Number
    },
    sections: [ExtractedSectionSchema],
    qualityScore: {
      ocrConfidence: { type: Number, default: 0 },
      metadataConfidence: { type: Number, default: 0 },
      extractionCompleteness: { type: Number, default: 0 },
      overallQuality: { type: Number, default: 0 }
    },
    processingTimeMs: Number,
    errorMessage: String,
    moderatorReviewed: { type: Boolean, default: false },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
    jobId: String
  },
  { timestamps: true }
);

export const OcrResult = mongoose.model<IOcrResult>('OcrResult', OcrResultSchema);
