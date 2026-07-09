import mongoose, { Schema, Document } from 'mongoose';
import { IPermission } from './permission.model';

export interface IRole extends Document {
  name: string;
  description: string;
  isSystem: boolean; // System roles cannot be deleted
  permissions: mongoose.Types.ObjectId[] | IPermission[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    isSystem: { type: Boolean, default: false }, // TRUE for default roles like STUDENT, ADMIN
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
  },
  { timestamps: true }
);

export const Role = mongoose.model<IRole>('Role', roleSchema);
