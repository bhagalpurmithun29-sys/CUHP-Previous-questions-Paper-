import { Document, Types } from 'mongoose';

export enum EntityType {
  SCHOOL = 'school',
  DEPARTMENT = 'department',
  COURSE = 'course',
  SEMESTER = 'semester',
  SUBJECT = 'subject',
  PAPER = 'paper', // Future support
  FACULTY = 'faculty', // Future support
  ANNOUNCEMENT = 'announcement', // Future support
}

export interface ISearchResult {
  id: string;
  entityType: EntityType;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  score?: number;
  metadata?: Record<string, any>;
}

export interface ISavedSearch extends Document {
  userId: Types.ObjectId;
  query: string;
  filters?: Record<string, any>;
  isPinned: boolean;
  lastSearchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISearchAnalytics extends Document {
  userId?: Types.ObjectId;
  query: string;
  entityType?: EntityType;
  filters?: Record<string, any>;
  resultsCount: number;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface SearchQueryDto {
  query: string;
  type?: EntityType;
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
  sort?: string;
}
