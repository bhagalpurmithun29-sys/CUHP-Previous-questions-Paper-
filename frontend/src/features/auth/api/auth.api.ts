import { apiClient } from '../../../lib/axios';
import { 
  LoginFormValues, 
  RegisterFormValues, 
  ForgotPasswordFormValues, 
  ResetPasswordFormValues 
} from '../schemas';
import { 
  LoginResponse, 
  RegisterResponse, 
  VerifyEmailResponse, 
  User 
} from '../types';

export const AuthApi = {
  login: async (data: LoginFormValues) => {
    const response = await apiClient.post<{ data: LoginResponse }>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterFormValues) => {
    const response = await apiClient.post<{ data: RegisterResponse }>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  refreshToken: async () => {
    // This endpoint relies on the HTTP-only cookie automatically sent by the browser
    const response = await apiClient.post<{ data: { accessToken: string } }>('/auth/refresh');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<{ data: User }>('/auth/me');
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordFormValues) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordFormValues & { token: string }) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.get<{ data: VerifyEmailResponse }>(\`/auth/verify-email?token=\${token}\`);
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await apiClient.post('/auth/verify-email/resend', { email });
    return response.data;
  }
};
