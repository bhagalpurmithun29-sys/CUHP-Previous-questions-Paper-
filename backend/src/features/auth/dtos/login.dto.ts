import { UserRole, AccountStatus } from '../../../enums/auth.enum';
import { UserResponseDTO } from './register.dto';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthenticatedUserDTO extends UserResponseDTO {
  // Additional fields can be added if required
}

export interface LoginResponseDTO {
  user: AuthenticatedUserDTO;
  accessToken: string;
  refreshToken: string; // Used internally by controller to set cookie, not sent in JSON
  message: string;
}
