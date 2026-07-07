export enum ProgramType {
  UG = 'UG',
  PG = 'PG',
  DIPLOMA = 'Diploma',
  CERTIFICATE = 'Certificate',
  PHD = 'PhD',
  INTEGRATED = 'Integrated'
}

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export enum DurationUnit {
  MONTHS = 'Months',
  YEARS = 'Years',
  SEMESTERS = 'Semesters'
}

export interface ICourse {
  _id: string;
  courseName: string;
  courseCode: string;
  shortName?: string;
  description?: string;
  schoolId: any; // Populated Object or string
  departmentId: any; // Populated Object or string
  programType?: ProgramType;
  degree?: string;
  duration: number;
  durationUnit: DurationUnit;
  totalSemesters: number;
  credits?: number;
  medium?: string;
  admissionYear?: number;
  courseCoordinator?: any;
  status: CourseStatus;
  displayOrder: number;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseQuery {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  programType?: string;
  degree?: string;
  status?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
