export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationFormData {
  email: string;
}

export interface VerifyEmailApiResponse {
  success: boolean;
  message: string;
}

export interface ResendVerificationApiResponse {
  success: boolean;
  message: string;
}
