import mongoose, { Schema } from 'mongoose';
import { IQuestionPaper, PaperStatus } from '../interfaces/models.interface';

const questionPaperSchema = new Schema<IQuestionPaper>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    semester: { type: Number, required: true, min: 1, max: 10 },
    academicYear: { type: String, required: true, match: /^\d{4}-\d{4}$/ }, // E.g. 2023-2024
    examType: { type: String, enum: ['MID_TERM', 'END_TERM', 'SUPPLEMENTARY'], required: true },
    session: { type: String, enum: ['WINTER', 'SUMMER'], required: true },
    
    pdfUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvalDate: { type: Date },
    
    status: { 
      type: String, 
      enum: Object.values(PaperStatus), 
      default: PaperStatus.PENDING 
    },
    
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    tags: [{ type: String, lowercase: true, trim: true }],

    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Indexes
// Search Index
questionPaperSchema.index({ title: 'text', tags: 'text' });
// Filtering Indexes
questionPaperSchema.index({ status: 1, isDeleted: 1 });
questionPaperSchema.index({ departmentId: 1, courseId: 1, semester: 1 });
questionPaperSchema.index({ academicYear: 1 });
// Sorting Indexes
questionPaperSchema.index({ downloads: -1 });
questionPaperSchema.index({ createdAt: -1 });

export const QuestionPaper = mongoose.model<IQuestionPaper>('QuestionPaper', questionPaperSchema);
