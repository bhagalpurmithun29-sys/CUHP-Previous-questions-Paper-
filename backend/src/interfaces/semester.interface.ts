import { Types } from 'mongoose';
import { IBaseDocument } from './models.interface';

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

export interface ISemester extends IBaseDocument {
  semesterNumber: number;
  semesterName?: string;
  shortName?: string;
  courseId: Types.ObjectId;
  academicSession?: string;
  academicYear?: string;
  semesterType?: SemesterType;
  isOdd?: boolean;
  displayOrder: number;
  credits?: number;
  duration?: number;
  startDate?: Date;
  endDate?: Date;
  registrationStart?: Date;
  registrationEnd?: Date;
  resultDeclarationDate?: Date;
  status: SemesterStatus;
  isCurrentSemester: boolean;
}
