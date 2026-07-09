export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordApiResponse {
  success: boolean;
  message: string;
}
