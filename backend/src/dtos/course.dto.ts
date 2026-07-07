import { ProgramType, CourseStatus, DurationUnit } from '../interfaces/course.interface';

export interface CreateCourseDto {
  courseName: string;
  courseCode: string;
  shortName?: string;
  description?: string;
  schoolId: string;
  departmentId: string;
  programType?: ProgramType;
  degree?: string;
  duration: number;
  durationUnit?: DurationUnit;
  totalSemesters: number;
  credits?: number;
  medium?: string;
  admissionYear?: number;
  courseCoordinator?: string;
  status?: CourseStatus;
  displayOrder?: number;
  thumbnail?: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

export interface CourseQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  programType?: ProgramType;
  degree?: string;
  status?: CourseStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
