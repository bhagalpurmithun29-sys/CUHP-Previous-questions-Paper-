import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IAiConversation extends Document {
  conversationId: string; // UUID
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  lastActiveAt: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['system', 'user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const AiConversationSchema = new Schema<IAiConversation>(
  {
    conversationId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Conversation' },
    messages: [MessageSchema],
    lastActiveAt: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

AiConversationSchema.index({ userId: 1, lastActiveAt: -1 });

export const AiConversation = mongoose.model<IAiConversation>('AiConversation', AiConversationSchema);
