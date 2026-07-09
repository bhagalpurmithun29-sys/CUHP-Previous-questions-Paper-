import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthApi } from '../api/auth.api';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgotPassword.constants';
import type { ForgotPasswordFormValues } from '../schemas/forgotPassword.schema';
import type { ForgotPasswordApiResponse } from '../types/forgotPassword.types';
import type { AxiosError } from 'axios';

export const useForgotPassword = () => {
  const mutation = useMutation<ForgotPasswordApiResponse, AxiosError<any>, ForgotPasswordFormValues>({
    mutationFn: AuthApi.forgotPassword,
    onSuccess: () => {
      // The requirement says: Never reveal whether the email exists.
      // We toast a success generic message.
      // Success card will also be shown in the UI.
      toast.success(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_GENERIC);
    },
    onError: (error) => {
      if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.TIMEOUT);
        } else {
          toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.NETWORK_ERROR);
        }
        return;
      }
      
      const status = error.response.status;
      
      switch (status) {
        case 429:
          toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.TOO_MANY_REQUESTS);
          break;
        case 500:
          toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SERVER_ERROR);
          break;
        default:
          toast.error(error.response.data?.message || FORGOT_PASSWORD_CONSTANTS.MESSAGES.UNEXPECTED_ERROR);
      }
    },
  });

  return {
    submit: mutation.mutate,
    loading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
