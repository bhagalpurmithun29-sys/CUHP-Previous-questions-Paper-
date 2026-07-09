import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { LoginFormValues } from '../schemas';

const API_URL = '/api/v1/auth/login';

interface LoginResponse {
  message: string;
  mfaRequired?: boolean;
  mfaToken?: string;
  accessToken?: string;
  user?: any;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // We assume AuthContext has a login method to save token and user, or we use React Query caching.
  // We'll return the response data.

  return useMutation({
    mutationFn: async (credentials: LoginFormValues): Promise<LoginResponse> => {
      const response = await axios.post(API_URL, credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (!data.mfaRequired && data.accessToken) {
        // Normal login success
        // Usually you'd set the token in context or localStorage here
        localStorage.setItem('token', data.accessToken);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        navigate('/dashboard');
      }
      // If MFA is required, the component will handle it by checking the returned mutation data
    }
  });
};
