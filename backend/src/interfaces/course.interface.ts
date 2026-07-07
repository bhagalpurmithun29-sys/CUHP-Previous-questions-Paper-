import { Types } from 'mongoose';
import { IBaseDocument } from './models.interface';

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

export interface ICourse extends IBaseDocument {
  courseName: string;
  courseCode: string;
  shortName?: string;
  description?: string;
  schoolId: Types.ObjectId;
  departmentId: Types.ObjectId;
  programType?: ProgramType;
  degree?: string;
  duration: number;
  durationUnit?: DurationUnit;
  totalSemesters: number;
  credits?: number;
  medium?: string;
  admissionYear?: number;
  courseCoordinator?: Types.ObjectId;
  status: CourseStatus;
  displayOrder: number;
  thumbnail?: string;
}
