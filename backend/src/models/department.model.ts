import mongoose, { Schema } from 'mongoose';
import { IDepartment, DepartmentStatus } from '../interfaces/department.interface';

const departmentSchema = new Schema<IDepartment>(
  {
    departmentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    departmentCode: {
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
    hodName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    website: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    logo: {
      type: String,
      trim: true,
    },
    officeLocation: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: Object.values(DepartmentStatus),
      default: DepartmentStatus.ACTIVE,
    },
    displayOrder: {
      type: Number,
      default: 0,
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
departmentSchema.index({ departmentName: 'text', departmentCode: 'text', hodName: 'text' });
departmentSchema.index({ status: 1 });
departmentSchema.index({ isDeleted: 1 });
departmentSchema.index({ schoolId: 1 });

// Ensure unique department name within a school
departmentSchema.index({ departmentName: 1, schoolId: 1 }, { unique: true });

export const Department = mongoose.model<IDepartment>('Department', departmentSchema);
