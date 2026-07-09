import mongoose, { Schema, Document } from 'mongoose';

export interface IDocumentEmbedding extends Document {
  documentId: mongoose.Types.ObjectId;
  documentType: 'QuestionPaper' | 'Subject' | 'Article';
  title: string;
  content: string; // The chunk of text embedded
  metadata: Record<string, any>;
  embedding: number[]; // Vector embedding (e.g., 768 or 1536 dims)
  lastIndexedAt: Date;
}

const DocumentEmbeddingSchema = new Schema<IDocumentEmbedding>(
  {
    documentId: { type: Schema.Types.ObjectId, required: true },
    documentType: { type: String, enum: ['QuestionPaper', 'Subject', 'Article'], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    embedding: { type: [Number], required: true },
    lastIndexedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// In a real MongoDB Atlas environment, you would define an Atlas Vector Search index on the `embedding` field.
// For standard MongoDB, this is just a regular collection and we'd do brute force cosine similarity or use a placeholder.
DocumentEmbeddingSchema.index({ documentId: 1, documentType: 1 });

export const DocumentEmbedding = mongoose.model<IDocumentEmbedding>('DocumentEmbedding', DocumentEmbeddingSchema);
