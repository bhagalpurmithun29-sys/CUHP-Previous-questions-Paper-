import { Document, Types } from 'mongoose';

export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface ISchool extends Document {
  schoolName: string;
  shortName?: string;
  schoolCode: string;
  description?: string;
  deanName?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  status: SchoolStatus;
  displayOrder: number;
  isDeleted: boolean;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
