import { Document, Types } from 'mongoose';

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface IDepartment extends Document {
  departmentName: string;
  departmentCode: string;
  shortName?: string;
  description?: string;
  schoolId: Types.ObjectId;
  hodName?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  officeLocation?: string;
  displayOrder: number;
  status: DepartmentStatus;
  isDeleted: boolean;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
