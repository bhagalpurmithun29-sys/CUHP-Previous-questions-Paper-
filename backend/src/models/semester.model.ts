import mongoose, { Schema } from 'mongoose';
import { ISemester, SemesterType, SemesterStatus } from '../interfaces/semester.interface';

const semesterSchema = new Schema<ISemester>(
  {
    semesterNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    semesterName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    shortName: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    academicSession: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    academicYear: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    semesterType: {
      type: String,
      enum: Object.values(SemesterType),
    },
    isOdd: {
      type: Boolean,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    credits: {
      type: Number,
      min: 0,
    },
    duration: {
      type: Number,
      min: 0,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    registrationStart: {
      type: Date,
    },
    registrationEnd: {
      type: Date,
    },
    resultDeclarationDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(SemesterStatus),
      default: SemesterStatus.UPCOMING,
    },
    isCurrentSemester: {
      type: Boolean,
      default: false,
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

// Indexes
semesterSchema.index({ semesterName: 'text', academicYear: 'text', academicSession: 'text' });
semesterSchema.index({ courseId: 1 });
semesterSchema.index({ status: 1 });
semesterSchema.index({ semesterType: 1 });
semesterSchema.index({ isCurrentSemester: 1 });
semesterSchema.index({ isDeleted: 1 });

// Ensure unique semester number within a course
semesterSchema.index({ semesterNumber: 1, courseId: 1 }, { unique: true });

// Pre-save validation
semesterSchema.pre('save', function (next) {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    return next(new Error('Start Date must be before End Date'));
  }
  if (this.registrationStart && this.registrationEnd && this.registrationStart > this.registrationEnd) {
    return next(new Error('Registration Start Date must be before Registration End Date'));
  }
  next();
});

export const Semester = mongoose.model<ISemester>('Semester', semesterSchema);
