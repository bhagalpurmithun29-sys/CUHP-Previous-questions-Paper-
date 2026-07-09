import mongoose, { Schema, Document } from 'mongoose';

export enum TicketCategory {
  GENERAL = 'General Inquiry',
  TECHNICAL = 'Technical Problem',
  ACCOUNT = 'Account Issue',
  LOGIN = 'Login Issue',
  REGISTRATION = 'Registration Issue',
  QUESTION_PAPER = 'Question Paper Issue',
  UPLOAD = 'Upload Issue',
  DOWNLOAD = 'Download Issue',
  FEATURE_REQUEST = 'Feature Request',
  BUG_REPORT = 'Bug Report',
  COPYRIGHT = 'Copyright Request',
  PRIVACY = 'Privacy Request',
  OTHER = 'Other',
}

export enum TicketPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export enum TicketStatus {
  OPEN = 'Open',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  WAITING_FOR_USER = 'Waiting for User',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  REOPENED = 'Reopened',
}

export interface ITicketReply {
  message: string;
  senderId?: mongoose.Types.ObjectId; // Null if system or guest email reply
  senderName: string;
  isAdmin: boolean;
  isInternalNote: boolean;
  attachments: string[];
  createdAt: Date;
}

export interface ISupportTicket extends Document {
  ticketNumber: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  userId?: mongoose.Types.ObjectId; // Nullable for guest tickets
  contactEmail: string; // Required for guests
  assignedTo?: mongoose.Types.ObjectId;
  relatedEntityId?: mongoose.Types.ObjectId; // e.g., QuestionPaper ID
  relatedEntityType?: string;
  attachments: string[];
  replies: ITicketReply[];
  resolvedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema = new Schema<ITicketReply>({
  message: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  senderName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isInternalNote: { type: Boolean, default: false },
  attachments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketNumber: { type: String, required: true, unique: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: Object.values(TicketCategory), required: true },
    priority: { type: String, enum: Object.values(TicketPriority), default: TicketPriority.MEDIUM },
    status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.OPEN },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    contactEmail: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    relatedEntityId: { type: Schema.Types.ObjectId },
    relatedEntityType: { type: String },
    attachments: [{ type: String }],
    replies: [ReplySchema],
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
SupportTicketSchema.index({ userId: 1 });
SupportTicketSchema.index({ assignedTo: 1 });
SupportTicketSchema.index({ status: 1, priority: 1 });
SupportTicketSchema.index({ subject: 'text', description: 'text' }); // Search

export const SupportTicket = mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
