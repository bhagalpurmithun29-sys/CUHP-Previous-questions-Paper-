import { DepartmentStatus } from '../interfaces/department.interface';

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

export interface DepartmentQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  status?: DepartmentStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
