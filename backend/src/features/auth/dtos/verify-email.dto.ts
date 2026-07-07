export interface VerifyEmailRequestDTO {
  token: string;
}

export interface ResendVerificationRequestDTO {
  email: string;
}

export interface VerifyEmailResponseDTO {
  message: string;
  success: boolean;
}
