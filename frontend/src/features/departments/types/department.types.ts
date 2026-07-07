import { School } from '../../schools/types/school.types';

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface Department {
  _id: string;
  departmentName: string;
  departmentCode: string;
  shortName?: string;
  description?: string;
  schoolId: School | string;
  hodName?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  officeLocation?: string;
  status: DepartmentStatus;
  displayOrder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentDto {
  departmentName: string;
  departmentCode: string;
  shortName?: string;
  description?: string;
  schoolId: string;
  hodName?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  officeLocation?: string;
  status?: DepartmentStatus;
  displayOrder?: number;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}

export interface DepartmentQuery {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  status?: DepartmentStatus | '';
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedDepartments {
  departments: Department[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
