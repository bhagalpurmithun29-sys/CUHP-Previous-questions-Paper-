import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewComment extends Document {
  threadId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string; // Markdown text
  mentions: mongoose.Types.ObjectId[]; // Users tagged via @
  attachments: { url: string; name: string }[];
  isEdited: boolean;
  history: { content: string; editedAt: Date }[];
  reactions: { emoji: string; users: mongoose.Types.ObjectId[] }[];
  replyTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewCommentSchema = new Schema<IReviewComment>({
  threadId: { type: Schema.Types.ObjectId, ref: 'ReviewThread', required: true, index: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  attachments: [{ url: String, name: String }],
  isEdited: { type: Boolean, default: false },
  history: [{
    content: String,
    editedAt: Date
  }],
  reactions: [{
    emoji: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }],
  replyTo: { type: Schema.Types.ObjectId, ref: 'ReviewComment' }
}, { timestamps: true });

export const ReviewComment = mongoose.model<IReviewComment>('ReviewComment', ReviewCommentSchema);
