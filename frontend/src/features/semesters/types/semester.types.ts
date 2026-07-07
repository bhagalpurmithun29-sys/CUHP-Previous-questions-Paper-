export enum SemesterType {
  ODD = 'ODD',
  EVEN = 'EVEN',
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
  BRIDGE = 'BRIDGE',
  SPECIAL = 'SPECIAL'
}

export enum SemesterStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export interface ISemester {
  _id: string;
  semesterNumber: number;
  semesterName?: string;
  shortName?: string;
  courseId: any; // Populated Object or string
  academicSession?: string;
  academicYear?: string;
  semesterType?: SemesterType;
  isOdd?: boolean;
  displayOrder: number;
  credits?: number;
  duration?: number;
  startDate?: string;
  endDate?: string;
  registrationStart?: string;
  registrationEnd?: string;
  resultDeclarationDate?: string;
  status: SemesterStatus;
  isCurrentSemester: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SemesterQuery {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  academicSession?: string;
  academicYear?: string;
  semesterType?: string;
  isOdd?: boolean | string;
  status?: string;
  isCurrentSemester?: boolean | string;
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
