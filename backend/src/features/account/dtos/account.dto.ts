export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  bio?: string;
  contactNumber?: string;
}

export interface UpdateAcademicDto {
  school?: string;
  department?: string;
  course?: string;
  semester?: number;
  enrollmentYear?: number;
  graduationYear?: number;
}
