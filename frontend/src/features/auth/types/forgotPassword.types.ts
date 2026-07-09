export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordApiResponse {
  success: boolean;
  message: string;
}
