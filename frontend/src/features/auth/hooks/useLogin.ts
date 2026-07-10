import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { LoginFormValues } from '../schemas';
import { useAuth } from './useAuth';

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
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginFormValues): Promise<LoginResponse> => {
      const response = await axios.post(API_URL, credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (!data.mfaRequired && data.accessToken && data.user) {
        // Normal login success
        login({ accessToken: data.accessToken, user: data.user });
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        navigate('/dashboard');
      }
    }
  });
};
