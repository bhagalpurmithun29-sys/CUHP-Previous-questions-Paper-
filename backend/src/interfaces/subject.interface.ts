import { Types } from 'mongoose';
import { IBaseDocument } from './models.interface';

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

export interface ISubject extends IBaseDocument {
  subjectName: string;
  subjectCode: string;
  shortName?: string;
  description?: string;
  schoolId: Types.ObjectId;
  departmentId: Types.ObjectId;
  courseId: Types.ObjectId;
  semesterId: Types.ObjectId;
  credits: number;
  lectureHours?: number;
  tutorialHours?: number;
  practicalHours?: number;
  totalHours: number;
  subjectType: SubjectType;
  deliveryMode: DeliveryMode[];
  language?: string;
  prerequisiteSubjects?: Types.ObjectId[];
  status: SubjectStatus;
  displayOrder: number;
  syllabusPdf?: string;
  referenceBooks?: string[];
}
