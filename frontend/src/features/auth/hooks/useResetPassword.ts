import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetPassword as resetPasswordApi } from '../api/auth.api';
import type { ResetPasswordRequest, ResetPasswordApiResponse, ApiErrorResponse } from '../types/auth.types';
import type { AxiosError } from 'axios';

export const useResetPassword = () => {
  const mutation = useMutation<ResetPasswordApiResponse, AxiosError<ApiErrorResponse>, ResetPasswordRequest>({
    mutationFn: resetPasswordApi,
    onError: (error) => {
      if (!error.response) {
        toast.error('Network Error: Please check your connection.');
        return;
      }
      const message = error.response.data?.message;
      toast.error(message || 'An unexpected error occurred.');
    },
  });

  return {
    resetPassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
