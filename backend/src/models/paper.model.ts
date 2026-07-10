import mongoose, { Schema, Document } from 'mongoose';

export interface IPaper extends Document {
  title: string;
  paperCode: string;
  schoolId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  semesterId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  academicYear: string;
  examSession: 'AUTUMN' | 'SPRING' | 'SUMMER' | 'WINTER';
  examType: 'MID_TERM' | 'END_TERM' | 'SUPPLEMENTARY' | 'PRACTICAL';
  maximumMarks: number;
  durationMinutes: number;
  language: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  pageCount: number;
  uploaderId: mongoose.Types.ObjectId;
  approverId?: mongoose.Types.ObjectId;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  isDeleted: boolean;
  ocrStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  aiAnalysisStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  tags: string[];
  version: number;
  parentPaperId?: mongoose.Types.ObjectId; // For versions
  createdAt: Date;
  updatedAt: Date;
}

const paperSchema = new Schema<IPaper>(
  {
    title: { type: String, required: true, trim: true },
    paperCode: { type: String, required: true, unique: true, trim: true, index: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true, index: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    semesterId: { type: Schema.Types.ObjectId, ref: 'Semester', required: true, index: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    academicYear: { type: String, required: true }, // e.g., '2023-2024'
    examSession: { type: String, enum: ['AUTUMN', 'SPRING', 'SUMMER', 'WINTER'], required: true },
    examType: { type: String, enum: ['MID_TERM', 'END_TERM', 'SUPPLEMENTARY', 'PRACTICAL'], required: true },
    maximumMarks: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    language: { type: String, default: 'English' },
    fileUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    fileSize: { type: Number, required: true },
    pageCount: { type: Number, required: true, default: 1 },
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approverId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'ARCHIVED'], default: 'PENDING_REVIEW', index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    ocrStatus: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
    aiAnalysisStatus: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
    tags: [{ type: String }],
    version: { type: Number, default: 1 },
    parentPaperId: { type: Schema.Types.ObjectId, ref: 'Paper' }
  },
  {
    timestamps: true,
  }
);

// Compound index for academic scoping
paperSchema.index({ subjectId: 1, academicYear: 1, examType: 1 });

export const Paper = mongoose.model<IPaper>('Paper', paperSchema);
export const QuestionPaper = Paper;
