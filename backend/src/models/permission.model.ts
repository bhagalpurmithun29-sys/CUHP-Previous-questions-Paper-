import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description: string;
  module: string;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema<IPermission>(
  {
    name: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    module: { type: String, required: true } // e.g., 'PAPERS', 'USERS', 'REPORTS'
  },
  { timestamps: true }
);

export const Permission = mongoose.model<IPermission>('Permission', permissionSchema);
