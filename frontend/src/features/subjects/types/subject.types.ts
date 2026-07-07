export enum SubjectType {
  CORE = 'Core',
  ELECTIVE = 'Elective',
  OPEN_ELECTIVE = 'Open Elective',
  FOUNDATION = 'Foundation',
  SKILL_ENHANCEMENT = 'Skill Enhancement',
  DISCIPLINE_SPECIFIC = 'Discipline Specific'
}

export enum DeliveryMode {
  THEORY = 'Theory',
  LAB = 'Lab',
  PRACTICAL = 'Practical',
  PROJECT = 'Project',
  SEMINAR = 'Seminar',
  INTERNSHIP = 'Internship'
}

export enum SubjectStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export interface ISubject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  shortName?: string;
  description?: string;
  schoolId: any;
  departmentId: any;
  courseId: any;
  semesterId: any;
  credits: number;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  totalHours: number;
  subjectType: SubjectType;
  deliveryMode: DeliveryMode[];
  language: string;
  prerequisiteSubjects?: ISubject[] | string[];
  status: SubjectStatus;
  displayOrder: number;
  syllabusPdf?: string;
  referenceBooks?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SubjectQuery {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  courseId?: string;
  semesterId?: string;
  credits?: number;
  subjectType?: SubjectType | string;
  deliveryMode?: DeliveryMode | string;
  status?: SubjectStatus | string;
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
