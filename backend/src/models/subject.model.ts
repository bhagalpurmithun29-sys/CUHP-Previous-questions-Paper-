import mongoose, { Schema } from 'mongoose';
import { ISubject, SubjectType, DeliveryMode, SubjectStatus } from '../interfaces/subject.interface';

const subjectSchema = new Schema<ISubject>(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 30,
    },
    shortName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1500,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 0,
    },
    lectureHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    tutorialHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    practicalHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalHours: {
      type: Number,
      required: true,
      min: 0,
    },
    subjectType: {
      type: String,
      enum: Object.values(SubjectType),
      required: true,
      default: SubjectType.CORE,
    },
    deliveryMode: [{
      type: String,
      enum: Object.values(DeliveryMode),
    }],
    language: {
      type: String,
      trim: true,
      default: 'English',
    },
    prerequisiteSubjects: [{
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    }],
    status: {
      type: String,
      enum: Object.values(SubjectStatus),
      default: SubjectStatus.ACTIVE,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    syllabusPdf: {
      type: String,
      trim: true,
    },
    referenceBooks: [{
      type: String,
      trim: true,
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Search Indexes
subjectSchema.index({ subjectName: 'text', subjectCode: 'text' });

// Filtering Indexes
subjectSchema.index({ schoolId: 1 });
subjectSchema.index({ departmentId: 1 });
subjectSchema.index({ courseId: 1 });
subjectSchema.index({ semesterId: 1 });
subjectSchema.index({ status: 1 });
subjectSchema.index({ subjectType: 1 });
subjectSchema.index({ deliveryMode: 1 });
subjectSchema.index({ isDeleted: 1 });

// Ensure unique subject name within a course
subjectSchema.index({ subjectName: 1, courseId: 1 }, { unique: true });

export const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
