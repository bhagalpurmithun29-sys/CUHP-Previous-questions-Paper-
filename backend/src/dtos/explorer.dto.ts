export interface GetPapersDto {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  courseId?: string;
  semesterId?: string;
  subjectId?: string;
  academicYear?: string;
  examType?: string;
  language?: string;
  sort?: string;
}

export interface SearchPapersDto {
  q: string;
  limit?: number;
}
