import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resendVerification as resendVerificationApi } from '../api/auth.api';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';
import type { ResendVerificationRequest, ResendVerificationApiResponse, ApiErrorResponse } from '../types/auth.types';
import type { AxiosError } from 'axios';

export const useResendVerification = () => {
  const mutation = useMutation<ResendVerificationApiResponse, AxiosError<ApiErrorResponse>, ResendVerificationRequest>({
    mutationFn: resendVerificationApi,
    onSuccess: () => {
      toast.success(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUCCESS);
    },
    onError: (error) => {
      if (!error.response) {
        toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.NETWORK_ERROR);
        return;
      }
      
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error(message || EMAIL_VERIFICATION_CONSTANTS.MESSAGES.UNEXPECTED_ERROR);
      }
    },
  });

  return {
    resendVerification: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
