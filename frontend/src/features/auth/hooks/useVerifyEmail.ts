import { useMutation } from '@tanstack/react-query';
import { verifyEmail as verifyEmailApi } from '../api/auth.api';
import type { VerifyEmailRequest, VerifyEmailApiResponse, ApiErrorResponse } from '../types/auth.types';
import type { AxiosError } from 'axios';

export const useVerifyEmail = () => {
  const mutation = useMutation<VerifyEmailApiResponse, AxiosError<ApiErrorResponse>, VerifyEmailRequest>({
    mutationFn: verifyEmailApi,
  });

  return {
    verifyEmail: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
