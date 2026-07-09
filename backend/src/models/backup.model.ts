import mongoose, { Schema, Document } from 'mongoose';

export enum BackupType {
  FULL = 'FULL',
  INCREMENTAL = 'INCREMENTAL',
  DIFFERENTIAL = 'DIFFERENTIAL'
}

export enum BackupStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface IBackup extends Document {
  filename: string;
  sizeBytes: number;
  type: BackupType;
  status: BackupStatus;
  isAutomated: boolean;
  createdBy?: mongoose.Types.ObjectId; // Null if automated
  checksum?: string;
  storagePath: string;
  expiresAt?: Date; // For retention policy
  createdAt: Date;
  updatedAt: Date;
}

const backupSchema = new Schema<IBackup>(
  {
    filename: { type: String, required: true, unique: true },
    sizeBytes: { type: Number, default: 0 },
    type: { type: String, enum: Object.values(BackupType), default: BackupType.FULL },
    status: { type: String, enum: Object.values(BackupStatus), default: BackupStatus.PENDING },
    isAutomated: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    checksum: { type: String },
    storagePath: { type: String, required: true },
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

backupSchema.index({ createdAt: -1 });
backupSchema.index({ status: 1 });

export const Backup = mongoose.model<IBackup>('Backup', backupSchema);
