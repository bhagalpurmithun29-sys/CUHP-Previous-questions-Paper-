import { SubjectType, DeliveryMode, SubjectStatus } from '../interfaces/subject.interface';

export interface CreateSubjectDto {
  subjectName: string;
  subjectCode: string;
  shortName?: string;
  description?: string;
  schoolId: string;
  departmentId: string;
  courseId: string;
  semesterId: string;
  credits: number;
  lectureHours?: number;
  tutorialHours?: number;
  practicalHours?: number;
  totalHours: number;
  subjectType: SubjectType;
  deliveryMode: DeliveryMode[];
  language?: string;
  prerequisiteSubjects?: string[];
  status?: SubjectStatus;
  displayOrder?: number;
  syllabusPdf?: string;
  referenceBooks?: string[];
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {}

export interface SubjectQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  courseId?: string;
  semesterId?: string;
  credits?: number;
  subjectType?: SubjectType;
  deliveryMode?: DeliveryMode | DeliveryMode[];
  status?: SubjectStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
