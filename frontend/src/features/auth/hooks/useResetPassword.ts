import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthApi } from '../api/auth.api';
import { RESET_PASSWORD_CONSTANTS } from '../constants/resetPassword.constants';
import type { ResetPasswordRequest, ResetPasswordApiResponse } from '../types/resetPassword.types';
import type { AxiosError } from 'axios';

export const useResetPassword = () => {
  const mutation = useMutation<ResetPasswordApiResponse, AxiosError<any>, ResetPasswordRequest>({
    mutationFn: AuthApi.resetPassword,
    onSuccess: () => {
      // Show success toast, the component will handle showing success UI
      toast.success(RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_TITLE);
    },
    onError: (error) => {
      if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          toast.error(RESET_PASSWORD_CONSTANTS.MESSAGES.TIMEOUT);
        } else {
          toast.error(RESET_PASSWORD_CONSTANTS.MESSAGES.NETWORK_ERROR);
        }
        return;
      }
      
      const status = error.response.status;
      const message = error.response.data?.message;

      switch (status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 410:
        case 422:
          toast.error(message || 'Invalid or expired token.');
          break;
        case 429:
          toast.error(RESET_PASSWORD_CONSTANTS.MESSAGES.TOO_MANY_REQUESTS);
          break;
        case 500:
          toast.error(RESET_PASSWORD_CONSTANTS.MESSAGES.SERVER_ERROR);
          break;
        default:
          toast.error(message || RESET_PASSWORD_CONSTANTS.MESSAGES.UNEXPECTED_ERROR);
      }
    },
  });

  return {
    resetPassword: mutation.mutate,
    loading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
