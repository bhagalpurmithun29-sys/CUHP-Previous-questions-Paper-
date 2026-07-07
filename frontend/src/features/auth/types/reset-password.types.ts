export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
}
