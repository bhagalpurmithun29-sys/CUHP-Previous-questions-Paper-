import { SchoolStatus } from '../interfaces/school.interface';

export interface CreateSchoolDto {
  schoolName: string;
  shortName?: string;
  schoolCode: string;
  description?: string;
  deanName?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  status?: SchoolStatus;
  displayOrder?: number;
}

export interface UpdateSchoolDto extends Partial<CreateSchoolDto> {}

export interface SchoolQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: SchoolStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
