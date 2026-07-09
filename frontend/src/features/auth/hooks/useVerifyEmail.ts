import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../api/auth.api';
import type { VerifyEmailApiResponse } from '../types/emailVerification.types';
import type { AxiosError } from 'axios';

export const useVerifyEmail = () => {
  const mutation = useMutation<VerifyEmailApiResponse, AxiosError<any>, string>({
    mutationFn: AuthApi.verifyEmail,
  });

  return {
    verify: mutation.mutate,
    loading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
