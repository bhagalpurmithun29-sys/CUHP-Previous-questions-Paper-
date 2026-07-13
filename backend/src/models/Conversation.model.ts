import mongoose, { Schema, Document } from 'mongoose';

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP'
}

export interface IConversation extends Document {
  type: ConversationType;
  name?: string; // Optional, only for groups
  participants: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[]; // For groups
  lastMessageAt: Date;
  lastMessagePreview?: string;
  departmentId?: mongoose.Types.ObjectId; // If it's a department group
  courseId?: mongoose.Types.ObjectId; // If it's a course group
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
  type: { type: String, enum: Object.values(ConversationType), required: true },
  name: { type: String },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessageAt: { type: Date, default: Date.now },
  lastMessagePreview: { type: String },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps: true });

ConversationSchema.index({ participants: 1, lastMessageAt: -1 });

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
