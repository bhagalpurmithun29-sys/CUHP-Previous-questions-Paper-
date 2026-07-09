export enum UserRole {
  STUDENT = 'STUDENT',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}

export enum AccountStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE'
}

export interface User {
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
  mfaEnabled?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  requiresEmailVerification: boolean;
  user: User;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface AuthContextType extends AuthState {
  login: (data: LoginResponse) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setLoading: (isLoading: boolean) => void;
}
