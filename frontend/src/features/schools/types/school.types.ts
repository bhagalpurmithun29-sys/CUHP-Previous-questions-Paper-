export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface School {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

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

export interface SchoolQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: SchoolStatus | '';
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedSchools {
  schools: School[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
