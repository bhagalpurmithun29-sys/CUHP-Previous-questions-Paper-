import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthApi } from '../api/auth.api';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import type { ResendVerificationFormValues } from '../schemas/resendVerification.schema';
import type { ResendVerificationApiResponse } from '../types/emailVerification.types';
import type { AxiosError } from 'axios';

export const useResendVerification = () => {
  const mutation = useMutation<ResendVerificationApiResponse, AxiosError<any>, ResendVerificationFormValues>({
    mutationFn: (data) => AuthApi.resendVerification(data.email),
    onSuccess: () => {
      toast.success(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUCCESS);
    },
    onError: (error) => {
      if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.TIMEOUT);
        } else {
          toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.NETWORK_ERROR);
        }
        return;
      }
      
      const status = error.response.status;
      const message = error.response.data?.message;

      switch (status) {
        case 400:
          if (message && message.toLowerCase().includes('already verified')) {
            toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.ALREADY_VERIFIED);
          } else {
            toast.error(message || 'Invalid request.');
          }
          break;
        case 404:
          toast.error('Email address not found.');
          break;
        case 429:
          toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.TOO_MANY_REQUESTS);
          break;
        case 500:
          toast.error(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SERVER_ERROR);
          break;
        default:
          toast.error(message || EMAIL_VERIFICATION_CONSTANTS.MESSAGES.UNEXPECTED_ERROR);
      }
    },
  });

  return {
    resend: mutation.mutate,
    loading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
