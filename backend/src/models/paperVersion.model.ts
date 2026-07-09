import mongoose, { Schema, Document } from 'mongoose';
import { IPaperVersion } from '../interfaces/paper.interface';

const paperVersionSchema = new Schema<IPaperVersion>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    versionNumber: { type: Number, required: true },
    storageUrl: { type: String, required: true },
    checksum: { type: String, required: true },
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pdfMetadata: {
      originalName: { type: String, required: true },
      sizeBytes: { type: Number, required: true },
      mimeType: { type: String, required: true },
      pageCount: { type: Number },
      pdfVersion: { type: String },
      isEncrypted: { type: Boolean, default: false }
    },
    changeLog: { type: String }
  },
  { 
    timestamps: { createdAt: true, updatedAt: false } 
  }
);

// High-performance index for fetching version history of a paper
paperVersionSchema.index({ paperId: 1, versionNumber: -1 });

export const PaperVersion = mongoose.model<IPaperVersion & Document>('PaperVersion', paperVersionSchema);
