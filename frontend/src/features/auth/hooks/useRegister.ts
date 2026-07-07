import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthApi } from '../api/auth.api';
import { RegisterFormValues } from '../schemas/register.schema';
import { isAxiosError } from 'axios';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => AuthApi.register(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration successful!');
      
      if (data.requiresEmailVerification) {
        navigate('/verify-email-pending', { 
          state: { email: data.user.email },
          replace: true 
        });
      } else {
        navigate('/login', { replace: true });
      }
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred during registration.';
      
      if (isAxiosError(error) && error.response) {
        // Backend returns standard API error format: { message: "...", errors: [...] }
        errorMessage = error.response.data?.message || errorMessage;
      }
      
      toast.error(errorMessage);
    }
  });
};
