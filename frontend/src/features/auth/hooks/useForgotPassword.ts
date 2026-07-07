import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { forgotPassword as forgotPasswordApi } from '../api/auth.api';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgot-password.constants';
import type { ForgotPasswordRequest, ForgotPasswordApiResponse } from '../types/forgot-password.types';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/auth.types';

export const useForgotPassword = () => {
  const mutation = useMutation<ForgotPasswordApiResponse, AxiosError<ApiErrorResponse>, ForgotPasswordRequest>({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_GENERIC);
    },
    onError: (error) => {
      if (!error.response) {
        toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.NETWORK_ERROR);
        return;
      }
      
      const status = error.response.status;
      const message = error.response.data?.message;

      switch (status) {
        case 500:
          toast.error(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SERVER_ERROR);
          break;
        default:
          toast.error(message || FORGOT_PASSWORD_CONSTANTS.MESSAGES.UNEXPECTED_ERROR);
      }
    },
  });

  return {
    forgotPassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
