export enum EntityType {
  SCHOOL = 'school',
  DEPARTMENT = 'department',
  COURSE = 'course',
  SEMESTER = 'semester',
  SUBJECT = 'subject',
}

export interface ISearchResult {
  id: string;
  entityType: EntityType;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  score?: number;
}

export interface SearchFilters {
  type?: EntityType;
  school?: string;
  department?: string;
  course?: string;
  semester?: string;
  subject?: string;
}

export interface SearchQuery {
  query: string;
  page?: number;
  limit?: number;
  filters?: SearchFilters;
}

export interface SearchResponse {
  results: ISearchResult[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ISavedSearch {
  _id: string;
  query: string;
  filters?: SearchFilters;
  isPinned: boolean;
  lastSearchedAt: string;
}
