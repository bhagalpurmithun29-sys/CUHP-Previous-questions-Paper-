import { Document, Types } from 'mongoose';

export enum LibraryItemType {
  BOOKMARK = 'BOOKMARK',
  FAVORITE = 'FAVORITE',
  RECENTLY_VIEWED = 'RECENTLY_VIEWED',
  CONTINUE_READING = 'CONTINUE_READING'
}

export interface SmartRule {
  field: string; // e.g. 'subject', 'semester', 'downloads', 'favorites'
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'in';
  value: any;
}

export interface ICollection extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  isPinned: boolean;
  isSmart: boolean;
  parentId?: Types.ObjectId;
  color?: string;
  icon?: string;
  rules?: SmartRule[];
  paperIds: Types.ObjectId[];
  paperCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILibraryItem extends Document {
  userId: Types.ObjectId;
  paperId: Types.ObjectId;
  type: LibraryItemType;
  
  // Specific to Continue Reading / Recently Viewed
  lastPage?: number;
  timeSpent?: number;
  deviceInfo?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCollectionDTO {
  name: string;
  description?: string;
}

export interface AddToCollectionDTO {
  paperId: string;
}
