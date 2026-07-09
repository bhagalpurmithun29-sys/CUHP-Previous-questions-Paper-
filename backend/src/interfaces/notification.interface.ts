import { Document, Types } from 'mongoose';

export enum NotificationType {
  // Account
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  LOGIN_ALERT = 'LOGIN_ALERT',
  SECURITY_ALERT = 'SECURITY_ALERT',
  
  // Academic
  PAPER_UPLOADED = 'PAPER_UPLOADED',
  PAPER_APPROVED = 'PAPER_APPROVED',
  PAPER_REJECTED = 'PAPER_REJECTED',
  PAPER_UPDATED = 'PAPER_UPDATED',
  PAPER_ARCHIVED = 'PAPER_ARCHIVED',
  
  // Moderator
  REVIEW_ASSIGNED = 'REVIEW_ASSIGNED',
  REVIEW_COMPLETED = 'REVIEW_COMPLETED',
  ESCALATION = 'ESCALATION',
  
  // Reports
  REPORT_SUBMITTED = 'REPORT_SUBMITTED',
  REPORT_RESOLVED = 'REPORT_RESOLVED',
  
  // General
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  MAINTENANCE = 'MAINTENANCE',
  NEW_FEATURE = 'NEW_FEATURE'
}

export enum DeliveryChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  SMS = 'SMS'
}

export interface INotification extends Document {
  recipientId: Types.ObjectId;
  senderId?: Types.ObjectId; // null if system
  
  type: NotificationType;
  title: string;
  message: string;
  
  link?: string;
  metadata?: any;
  
  isRead: boolean;
  readAt?: Date;
  isArchived: boolean;
  
  deliveryChannels: DeliveryChannel[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationPreference extends Document {
  userId: Types.ObjectId;
  
  emailEnabled: boolean;
  inAppEnabled: boolean;
  pushEnabled: boolean;
  
  optOutTypes: NotificationType[];
  
  createdAt: Date;
  updatedAt: Date;
}
