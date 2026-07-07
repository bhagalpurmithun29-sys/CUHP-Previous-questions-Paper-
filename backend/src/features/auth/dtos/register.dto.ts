import { Types } from 'mongoose';
import { UserRole, AccountStatus } from '../../../enums/auth.enum';

export interface RegisterRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  department?: string;
  course?: string;
  semester?: number;
}

export interface UserResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  department?: string;
  course?: string;
  semester?: number;
  createdAt: Date;
}

export interface RegisterResponseDTO {
  user: UserResponseDTO;
  requiresEmailVerification: boolean;
  message: string;
}
