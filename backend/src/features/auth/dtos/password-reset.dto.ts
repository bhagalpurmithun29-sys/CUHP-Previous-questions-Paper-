export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ForgotPasswordResponseDTO {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseDTO {
  success: boolean;
  message: string;
}
