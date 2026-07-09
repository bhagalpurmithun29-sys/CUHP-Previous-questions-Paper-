import mongoose, { Schema } from 'mongoose';
import { IDuplicateReport, DuplicateDetectionLevel, DuplicateResolutionAction } from '../interfaces/duplicate.interface';

const duplicateReportSchema = new Schema<IDuplicateReport>(
  {
    newPaperId: { type: String, required: true, index: true },
    matchedPaperId: { type: String, required: true, index: true },
    
    similarityScore: { type: Number, required: true },
    detectionLevel: { type: String, enum: Object.values(DuplicateDetectionLevel), required: true },
    
    hashMatch: { type: Boolean, required: true },
    filenameSimilarity: { type: Number, required: true },
    metadataSimilarity: { type: Number, required: true },
    academicSimilarity: { type: Number, required: true },
    pageCountMatch: { type: Boolean, required: true },
    
    suggestedAction: { type: String, enum: Object.values(DuplicateResolutionAction), required: true },
    
    resolved: { type: Boolean, default: false, index: true },
    resolvedAt: { type: Date },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    finalAction: { type: String, enum: Object.values(DuplicateResolutionAction) },
    resolutionNotes: { type: String }
  },
  { timestamps: true }
);

// High performance compound indexes
duplicateReportSchema.index({ newPaperId: 1, matchedPaperId: 1 }, { unique: true });
duplicateReportSchema.index({ resolved: 1, createdAt: -1 });

export const DuplicateReport = mongoose.model<IDuplicateReport>('DuplicateReport', duplicateReportSchema);
