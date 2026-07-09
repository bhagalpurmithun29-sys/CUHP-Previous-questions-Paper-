import mongoose, { Schema, Document } from 'mongoose';

export enum HelpCategory {
  GETTING_STARTED = 'Getting Started',
  ACCOUNT_LOGIN = 'Account & Login',
  REGISTRATION = 'Registration',
  EMAIL_VERIFICATION = 'Email Verification',
  UPLOADING_PAPERS = 'Uploading Papers',
  DOWNLOADING_PAPERS = 'Downloading Papers',
  BOOKMARKS = 'Bookmarks',
  PERSONAL_LIBRARY = 'Personal Library',
  MODERATOR_GUIDE = 'Moderator Guide',
  ADMIN_GUIDE = 'Admin Guide',
  PRIVACY = 'Privacy',
  SECURITY = 'Security',
  TROUBLESHOOTING = 'Troubleshooting',
}

export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface IHelpArticle extends Document {
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  excerpt: string;
  category: HelpCategory;
  status: ArticleStatus;
  authorId: mongoose.Types.ObjectId;
  readTimeMinutes: number;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  isFaq: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HelpArticleSchema = new Schema<IHelpArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    category: { type: String, enum: Object.values(HelpCategory), required: true },
    status: { type: String, enum: Object.values(ArticleStatus), default: ArticleStatus.DRAFT },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readTimeMinutes: { type: Number, default: 1 },
    viewCount: { type: Number, default: 0 },
    helpfulCount: { type: Number, default: 0 },
    notHelpfulCount: { type: Number, default: 0 },
    isFaq: { type: Boolean, default: false },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

// Indexes
HelpArticleSchema.index({ title: 'text', content: 'text', tags: 'text' });
HelpArticleSchema.index({ category: 1, status: 1 });

export const HelpArticle = mongoose.model<IHelpArticle>('HelpArticle', HelpArticleSchema);
