import { Document, Types } from 'mongoose';

export enum DownloadStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface IDownloadHistory extends Document {
  userId: Types.ObjectId;
  paperId: Types.ObjectId;
  
  status: DownloadStatus;
  
  // Tracking
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  countryPlaceholder?: string;
  
  // Metadata
  expiresAt?: Date;
  downloadUrl?: string; // Stored securely/temporarily
  
  createdAt: Date;
  updatedAt: Date;
}
