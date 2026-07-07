import mongoose, { Schema } from 'mongoose';
import { ICourse, ProgramType, CourseStatus, DurationUnit } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 20,
    },
    shortName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
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
    programType: {
      type: String,
      enum: Object.values(ProgramType),
    },
    degree: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    durationUnit: {
      type: String,
      enum: Object.values(DurationUnit),
      default: DurationUnit.YEARS,
    },
    totalSemesters: {
      type: Number,
      required: true,
      min: 1,
    },
    credits: {
      type: Number,
      min: 0,
    },
    medium: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    admissionYear: {
      type: Number,
      min: 1900,
      max: 2100,
    },
    courseCoordinator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.ACTIVE,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
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

// Indexes for searching and filtering
courseSchema.index({ courseName: 'text', courseCode: 'text', degree: 'text' });
courseSchema.index({ status: 1 });
courseSchema.index({ isDeleted: 1 });
courseSchema.index({ departmentId: 1 });
courseSchema.index({ schoolId: 1 });
courseSchema.index({ programType: 1 });

// Ensure unique course name within a department
courseSchema.index({ courseName: 1, departmentId: 1 }, { unique: true });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
