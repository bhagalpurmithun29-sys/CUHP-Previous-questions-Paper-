import mongoose, { Schema } from 'mongoose';
import { 
  IQuestionPaper, 
  IQuestionPaperModel,
  PaperApprovalStatus, 
  PaperVisibility,
  ExamType, 
  ExamSession, 
  Language,
  StorageProvider
} from '../interfaces/paper.interface';
import { AppError } from '../utils/AppError';

const questionPaperSchema = new Schema<IQuestionPaper, IQuestionPaperModel>(
  {
    // Core Fields
    paperId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true, minlength: 5, maxlength: 255 },
    description: { type: String, trim: true, maxlength: 1000 },
    academicYear: { 
      type: String, 
      required: true, 
      validate: {
        validator: function(v: string) {
          return /^\d{4}-\d{4}$/.test(v); // e.g. 2023-2024
        },
        message: 'Academic Year must be in format YYYY-YYYY'
      }
    },
    examYear: { type: Number, required: true, min: 2000, max: 2100 },
    examMonth: { type: String, required: true },
    examType: { type: String, enum: Object.values(ExamType), required: true },
    session: { type: String, enum: Object.values(ExamSession), required: true },
    language: { type: String, enum: Object.values(Language), required: true, default: Language.ENGLISH },
    maximumMarks: { type: Number, required: true, min: 1 },
    passingMarks: { type: Number, min: 1 },
    duration: { type: Number, min: 1 }, // in minutes
    
    // Academic Relationships
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    semesterId: { type: Schema.Types.ObjectId, ref: 'Semester', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    
    // Document Fields
    originalFileName: { type: String, required: true },
    storedFileName: { type: String, required: true },
    storageProvider: { type: String, enum: Object.values(StorageProvider), required: true },
    storagePath: { type: String, required: true },
    fileUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    previewImages: [{ type: String }],
    fileSize: { type: Number, required: true, max: 20 * 1024 * 1024 }, // Max 20MB
    fileType: { 
      type: String, 
      required: true,
      enum: ['application/pdf'],
      message: 'Only PDF files are allowed'
    },
    checksum: { type: String, required: true },
    sha256Hash: { type: String, required: true },
    pageCount: { type: Number },
    pdfVersion: { type: String },
    
    // Upload Information
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, default: Date.now, required: true },
    uploadSource: { type: String, default: 'WEB' },
    ipAddress: { type: String },
    deviceInformation: { type: String },
    
    // Approval
    approvalStatus: { 
      type: String, 
      enum: Object.values(PaperApprovalStatus), 
      default: PaperApprovalStatus.PENDING 
    },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    approverId: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },
    rejectedReason: { type: String },
    
    // Visibility
    visibility: { 
      type: String, 
      enum: Object.values(PaperVisibility), 
      default: PaperVisibility.PRIVATE 
    },
    
    // Analytics
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    
    // Search
    tags: [{ type: String, trim: true, lowercase: true }],
    keywords: [{ type: String, trim: true, lowercase: true }],
    searchTokens: [{ type: String, lowercase: true }],
    ocrTextPlaceholder: { type: String },
    
    // Versioning
    version: { type: Number, default: 1, required: true },
    isCurrentVersion: { type: Boolean, default: true },
    previousVersionId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper' },
    parentPaperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper' },
    
    // Base Auditing
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
questionPaperSchema.virtual('isApproved').get(function() {
  return this.approvalStatus === PaperApprovalStatus.APPROVED;
});

questionPaperSchema.virtual('fileSizeMb').get(function() {
  return this.fileSize ? +(this.fileSize / (1024 * 1024)).toFixed(2) : 0;
});

// Hooks (Pre-save)
questionPaperSchema.pre('save', async function(next) {
  // 1. Duplicate Paper Check Rule
  if (this.isNew) {
    const existingPaper = await mongoose.model('QuestionPaper').findOne({
      subjectId: this.subjectId,
      examYear: this.examYear,
      examType: this.examType,
      session: this.session,
      isDeleted: false,
      isCurrentVersion: true
    });
    
    if (existingPaper && existingPaper.paperId !== this.paperId && !this.parentPaperId) {
      return next(new AppError(409, 'A similar question paper already exists for this subject, year, type, and session.'));
    }
  }

  // 2. Generate searchTokens automatically
  if (this.isModified('title') || this.isModified('tags') || this.isModified('keywords')) {
    const tokens = new Set<string>();
    
    this.title.toLowerCase().split(/\s+/).forEach(t => tokens.add(t));
    this.tags.forEach(t => tokens.add(t));
    this.keywords.forEach(k => tokens.add(k));
    
    this.searchTokens = Array.from(tokens);
  }

  // 3. Prevent modification of approved papers without creating a new version
  if (!this.isNew && this.isModified() && this.approvalStatus === PaperApprovalStatus.APPROVED) {
    // If we aren't explicitly updating analytics/status fields
    const restrictedFieldsModified = this.modifiedPaths().some(path => 
      !['downloadCount', 'viewCount', 'bookmarkCount', 'likeCount', 'shareCount', 'reportCount', 'visibility'].includes(path)
    );
    
    if (restrictedFieldsModified) {
      return next(new AppError(400, 'Cannot modify an approved paper directly. Please create a new version.'));
    }
  }

  next();
});

// Hooks (Post-save)
questionPaperSchema.post('save', function(doc, next) {
  // Can trigger async indexing or emit events here (e.g. eventEmitter.emit('PAPER_CREATED', doc))
  next();
});

// Optimized Indexes

// 1. Core Filtering Indexes
questionPaperSchema.index({ subjectId: 1, examYear: -1, examType: 1 });
questionPaperSchema.index({ semesterId: 1, courseId: 1 });
questionPaperSchema.index({ departmentId: 1 });
questionPaperSchema.index({ academicYear: 1 });

// 2. State & Security Indexes
questionPaperSchema.index({ approvalStatus: 1, visibility: 1, isDeleted: 1 });
questionPaperSchema.index({ uploaderId: 1, createdAt: -1 });

// 3. Analytics Indexes
questionPaperSchema.index({ downloadCount: -1 });
questionPaperSchema.index({ viewCount: -1 });

// 4. Duplicate Check Index (Unique Partial Index)
questionPaperSchema.index(
  { subjectId: 1, examYear: 1, examType: 1, session: 1 }, 
  { unique: true, partialFilterExpression: { isDeleted: false, parentPaperId: { $exists: false } } }
);

// 5. Full Text Search Index
questionPaperSchema.index({
  title: 'text',
  searchTokens: 'text',
  ocrTextPlaceholder: 'text'
}, {
  weights: {
    title: 10,
    searchTokens: 8,
    ocrTextPlaceholder: 2
  },
  name: 'QuestionPaperTextIndex'
});

// Statics
questionPaperSchema.statics.findBySubject = async function(subjectId: string) {
  return this.find({ 
    subjectId, 
    visibility: PaperVisibility.PUBLIC,
    approvalStatus: PaperApprovalStatus.APPROVED,
    isDeleted: false,
    isCurrentVersion: true
  }).sort({ examYear: -1 });
};

questionPaperSchema.statics.findTrending = async function(limit = 10) {
  return this.find({
    visibility: PaperVisibility.PUBLIC,
    approvalStatus: PaperApprovalStatus.APPROVED,
    isDeleted: false
  })
  .sort({ downloadCount: -1, viewCount: -1 })
  .limit(limit);
};

export const QuestionPaper = mongoose.model<IQuestionPaper, IQuestionPaperModel>('QuestionPaper', questionPaperSchema);
