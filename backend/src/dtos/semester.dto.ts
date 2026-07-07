import { SemesterType, SemesterStatus } from '../interfaces/semester.interface';

export interface CreateSemesterDto {
  semesterNumber: number;
  semesterName?: string;
  shortName?: string;
  courseId: string;
  academicSession?: string;
  academicYear?: string;
  semesterType?: SemesterType;
  isOdd?: boolean;
  displayOrder?: number;
  credits?: number;
  duration?: number;
  startDate?: Date | string;
  endDate?: Date | string;
  registrationStart?: Date | string;
  registrationEnd?: Date | string;
  resultDeclarationDate?: Date | string;
  status?: SemesterStatus;
  isCurrentSemester?: boolean;
}

export interface UpdateSemesterDto extends Partial<CreateSemesterDto> {}

export interface SemesterQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  academicSession?: string;
  academicYear?: string;
  semesterType?: SemesterType;
  isOdd?: boolean | string;
  status?: SemesterStatus;
  isCurrentSemester?: boolean | string;
  sort?: string;
  order?: 'asc' | 'desc';
}
