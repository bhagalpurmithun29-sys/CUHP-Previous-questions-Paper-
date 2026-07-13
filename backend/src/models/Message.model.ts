import mongoose, { Schema, Document } from 'mongoose';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  SYSTEM = 'SYSTEM'
}

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  type: MessageType;
  content: string; // Markdown supported
  attachments: {
    url: string;
    name: string;
    size: number;
    mimeType: string;
  }[];
  replyTo?: mongoose.Types.ObjectId;
  readBy: mongoose.Types.ObjectId[]; // Array of user IDs who have read this
  reactions: {
    emoji: string;
    users: mongoose.Types.ObjectId[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: Object.values(MessageType), default: MessageType.TEXT },
  content: { type: String, required: true },
  attachments: [{
    url: String,
    name: String,
    size: Number,
    mimeType: String
  }],
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
  readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  reactions: [{
    emoji: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }]
}, { timestamps: true });

MessageSchema.index({ conversationId: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
