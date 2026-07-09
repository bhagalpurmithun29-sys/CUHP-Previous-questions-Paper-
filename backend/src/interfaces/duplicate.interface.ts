import { Document, Types, Model } from 'mongoose';

export enum DuplicateDetectionLevel {
  EXACT_DUPLICATE = 'EXACT_DUPLICATE',
  NEAR_DUPLICATE = 'NEAR_DUPLICATE',
  POSSIBLE_DUPLICATE = 'POSSIBLE_DUPLICATE',
  NO_DUPLICATE = 'NO_DUPLICATE'
}

export enum DuplicateResolutionAction {
  MERGE = 'MERGE',
  MARK_AS_VERSION = 'MARK_AS_VERSION',
  IGNORE = 'IGNORE',
  DELETE_NEW = 'DELETE_NEW',
  PENDING = 'PENDING'
}

export interface IDuplicateReport extends Document {
  newPaperId: string;
  matchedPaperId: string;
  
  similarityScore: number;
  detectionLevel: DuplicateDetectionLevel;
  
  // Breakdown
  hashMatch: boolean;
  filenameSimilarity: number;
  metadataSimilarity: number;
  academicSimilarity: number;
  pageCountMatch: boolean;
  
  // Moderator Suggestions
  suggestedAction: DuplicateResolutionAction;
  
  // Resolution
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: Types.ObjectId;
  finalAction?: DuplicateResolutionAction;
  resolutionNotes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
