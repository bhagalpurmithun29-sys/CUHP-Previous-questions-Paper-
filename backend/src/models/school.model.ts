import mongoose, { Schema } from 'mongoose';
import { ISchool, SchoolStatus } from '../interfaces/school.interface';

const schoolSchema = new Schema<ISchool>(
  {
    schoolName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    shortName: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    schoolCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 10,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    deanName: {
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
    status: {
      type: String,
      enum: Object.values(SchoolStatus),
      default: SchoolStatus.ACTIVE,
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

// Indexes for searching and filtering
schoolSchema.index({ schoolName: 'text', schoolCode: 'text', deanName: 'text' });
schoolSchema.index({ status: 1 });
schoolSchema.index({ isDeleted: 1 });

export const School = mongoose.model<ISchool>('School', schoolSchema);
